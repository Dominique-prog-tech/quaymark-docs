#!/usr/bin/env python3
"""De verzonnen gegevens van de proefklant qm-demo ("Noordkaai Surveys (demo)"), waaruit de handleidingbeelden komen (tools/beelden.mjs).

Draai: python3 tools/proefklant-vullen.py  — op de dag van de beelden: de planning staat relatief tegenover vandaag.

Naar het voorbeeld van credimatch-docs/tools/proefklant-vullen.py: rechtstreeks in de LOKALE databank (container quaymark-db), niet via de app.
- Herkenbaar en herhaalbaar: elke rij die dit script maakt, krijgt een vaste id (uuid5 van een sleutel). Opnieuw draaien verwijdert precies die
  rijen en zet ze opnieuw. Wat er al stond (de twee demodossiers uit de proeven), blijft staan.
- Alles is VERZONNEN, en deze repo is publiek: geen echte klant, geen echt schip. IMO-nummers beginnen met een 1: ze halen het controlecijfer van
  de app, maar zo'n nummer is nooit aan een schip toegekend (echte beginnen met 5 tot 9). De namen zijn verzonnen samenstellingen. NIETS van de
  oorspronkelijke klant (ADR-57, punt 10).
- De foto's zijn vrije foto's (CC0) uit tools/demofotos (bronnen: BRONNEN.md). Ze worden als bewijsstuk opgeslagen zoals de app dat doet: het
  bestand op <opslag>/bureau-<tenant>/bewijs/<dossier>/<id>_<sha256>.jpg, de SHA-256 in de rij en in de bewijstekst. Zo klopt ook het
  bewijspakket voor de demo.
- De teksten in de dossiers zijn Engels, de gangbare taal van surveyrapporten: zo passen ze bij de beelden in de vier talen.

⚠️ Dit omzeilt de app: geen historiek, geen auditregel, en de grendel "enkel toevoegen" van de DbContext speelt hier niet. Enkel voor de demo.
"""
import datetime as dt, hashlib, json, os, pathlib, shutil, subprocess, sys, uuid

KLANT_DB = 'tenant_quaymark_qm_demo'
CONTAINER = 'quaymark-db'
APP = pathlib.Path(os.environ.get('QUAYMARK_REPO', pathlib.Path.home() / 'projects' / 'adm-quaymark'))
OPSLAG = APP / 'src/Host/Quaymark.Host.Web/bin/Debug/net10.0/App_Data/files'   # Storage:LocalBase, t.o.v. de map waaruit de app draait
FOTOS = pathlib.Path(__file__).resolve().parent / 'demofotos'
NS = uuid.UUID('6b1f0c55-2d7e-4c35-9a52-6b6f6d2d0d51')
TOESTEL = 'Demo-toestel'
VANDAAG = dt.date.today()
NU = dt.datetime.now(dt.timezone.utc).replace(second=0, microsecond=0)


def vid(sleutel):
    return str(uuid.uuid5(NS, f'qm-demo/{sleutel}'))


class Tekstlijst(list):
    """Een Postgres-array van tekst (relaties.rollen), geen jsonb."""


def lit(v):
    if isinstance(v, Tekstlijst):
        return 'ARRAY[' + ', '.join(lit(x) for x in v) + ']::varchar[]'
    if v is None:
        return 'NULL'
    if isinstance(v, bool):
        return 'true' if v else 'false'
    if isinstance(v, (int, float)):
        return str(v)
    if isinstance(v, (dict, list)):
        return lit(json.dumps(v, ensure_ascii=False)) + '::jsonb'
    if isinstance(v, (dt.datetime, dt.date)):
        return lit(v.isoformat())
    return "'" + str(v).replace("'", "''") + "'"


def q(sql, db=KLANT_DB):
    r = subprocess.run(['docker', 'exec', '-i', CONTAINER, 'psql', '-U', 'postgres', '-d', db, '-At', '-v', 'ON_ERROR_STOP=1'],
                       input=sql, capture_output=True, text=True)
    if r.returncode:
        raise SystemExit(f'⛔ psql: {r.stderr.strip()}')
    return r.stdout.strip()


def rij(tabel, waarden):
    kol = ', '.join(waarden)
    return f'insert into {tabel} ({kol}) values ({", ".join(lit(v) for v in waarden.values())});'


# ── De grendels: enkel lokaal, enkel de proefklant. ──
tenant = q("select id, name from control.tenants where database = 'tenant_quaymark_qm_demo'", db='quaymark_control')
if not tenant or '(demo)' not in tenant:
    raise SystemExit(f'⛔ Geen bureau met "(demo)" in de naam op {KLANT_DB} (gevonden: {tenant or "niets"}). Gestopt; niets geschreven.')
TENANT_ID = tenant.split('|')[0]
TENANT_N = TENANT_ID.replace('-', '')
SURVEYOR = q("select id || '|' || coalesce(display_name, user_name) from control.\"AspNetUsers\" where user_name = 'surveyor.demo'", db='quaymark_control')
if not SURVEYOR:
    raise SystemExit('⛔ De proefsurveyor surveyor.demo bestaat niet. Gestopt; niets geschreven.')
SURVEYOR_ID, SURVEYOR_NAAM = SURVEYOR.split('|')
if not OPSLAG.is_dir():
    raise SystemExit(f'⛔ De opslagmap {OPSLAG} bestaat niet: draait de app al eens lokaal? Gestopt; niets geschreven.')

HQ = q("select id from dossiers.vestigingen where code = 'HQ'")
SOORT = dict(r.split('|') for r in q('select code, id from dossiers.survey_types').splitlines())
CHECKLIST = {c: json.loads(j) for c, j in (r.split('|', 1) for r in q('select code, checklist::text from dossiers.survey_types').splitlines())}
SCHELDEMOND = q("select id from relaties.relaties where naam = 'Scheldemond Bevrachting NV'") or None
PIONEER = q("select id from dossiers.schepen where naam = 'NOORDKAAI PIONEER'") or None

sql = ['begin;']
# Eerst opruimen wat dit script vroeger maakte (kinderen eerst). De ids zijn vast, dus dit raakt niets anders.
eigen_dossiers = [vid(f'dossier/{i}') for i in range(3, 11)] + [vid('dossier/zb1')]
lijst = ', '.join(lit(i) for i in eigen_dossiers)
for t in ['dossiers.vergelijking_oordelen', 'dossiers.bewijs_zichtbaarheid', 'dossiers.bewijsstukken', 'dossiers.checklist_antwoorden',
          'dossiers.vaststellingen', 'dossiers.dossier_partijen', 'rapporten.rubriek_teksten']:
    sql.append(f'delete from {t} where dossier_id in ({lijst});')
sql.append(f'delete from dossiers.dossiers where id in ({lijst});')
eigen_relaties = ', '.join(lit(vid(f'relatie/{k}')) for k in range(1, 9))
sql.append(f'delete from relaties.contactpersonen where relatie_id in ({eigen_relaties});')
sql.append(f'delete from relaties.relaties where id in ({eigen_relaties});')
sql.append(f"delete from dossiers.schepen where id in ({', '.join(lit(vid(f'schip/{k}')) for k in range(1, 7))});")
sql.append(f"delete from rapporten.standaardteksten where id in ({', '.join(lit(vid(f'standaardtekst/{k}')) for k in range(1, 4))});")

# ── Een tweede vestiging. ──
ZB = vid('vestiging/zb')
sql.append(f'delete from dossiers.vestigingen where id = {lit(ZB)} and not exists (select 1 from dossiers.dossiers where vestiging_id = {lit(ZB)});')
sql.append(f"insert into dossiers.vestigingen (id, code, naam, land, tijdzone, actief) values ({lit(ZB)}, 'ZB', 'Zeebrugge', 'BE', 'Europe/Brussels', true) "
           'on conflict (id) do nothing;')

# ── Relaties: verzonnen bedrijven. (sleutel, naam, rollen, land, gemeente, contactpersonen) ──
RELATIES = [
    (1, 'Kaaimeeuw Rederij NV', ['reder'], 'BE', '8400', 'Oostende', 'Zeedijk 12', 'nl', [('An Verhaegen', 'Technical superintendent'), ('Pieter Claeys', 'Fleet manager')]),
    (2, 'Polderwacht Verzekeringen NV', ['verzekeraar', 'opdrachtgever'], 'BE', '9000', 'Gent', 'Kouter 4', 'nl', [('Sofie De Wilde', 'Claims handler')]),
    (3, 'Hanzekring P&I (demo)', ['pi_club'], 'NL', '3011', 'Rotterdam', 'Boompjes 40', 'en', [('Mark Jansen', 'Claims executive')]),
    (4, 'Brakwater Terminals NV', ['terminal'], 'BE', '2030', 'Antwerpen', 'Kaai 730', 'nl', [('Koen Mertens', 'Operations')]),
    (5, 'Duinroos Agencies BV', ['agent'], 'NL', '4381', 'Vlissingen', 'Boulevard 9', 'nl', []),
    (6, 'Estuaire Expertises SARL', ['tegenexpert'], 'FR', '76600', 'Le Havre', 'Quai de Southampton 3', 'fr', [('Claire Morel', 'Expert maritime')]),
    (7, 'Nordlicht Schiffsmakler GmbH', ['makelaar'], 'DE', '20457', 'Hamburg', 'Am Sandtorkai 7', 'de', []),
    (8, 'Scheldester Chartering BV', ['bevrachter', 'opdrachtgever'], 'NL', '3072', 'Rotterdam', 'Wilhelminakade 50', 'en', [('Eva de Vries', 'Chartering manager')]),
]
REL = {}
for k, naam, rollen, land, pc, gem, straat, taal, contacten in RELATIES:
    REL[k] = vid(f'relatie/{k}')
    dom = naam.split()[0].lower()
    sql.append(rij('relaties.relaties', dict(id=REL[k], soort='bedrijf', naam=naam, ondernemingsnummer=None, land=land, straat=straat, postcode=pc,
               gemeente=gem, email=f'info@{dom}.example', telefoon=None, taal=taal, rollen=Tekstlijst(rollen), opmerking=None, actief=True,
               created_at=NU - dt.timedelta(days=60 - k), archived_on_utc=None)))
    for i, (cn, functie) in enumerate(contacten):
        sql.append(rij('relaties.contactpersonen', dict(id=vid(f'contact/{k}/{i}'), relatie_id=REL[k], naam=cn, functie=functie,
                   email=f"{cn.split()[0].lower()}@{dom}.example", telefoon=None, taal=taal)))
REL['scheldemond'] = SCHELDEMOND or REL[8]

# ── Schepen. IMO met een 1 vooraan (zie boven). ──
SCHEPEN = [
    (1, 'zeevaart', 'KAAIMEEUW', '1020306', None, 'BE', 'Bulk carrier', 2011, 32400, 56800, 'BV', 5, None),
    (2, 'zeevaart', 'SCHELDESTER', '1040502', None, 'NL', 'General cargo', 2016, 8900, 12500, 'DNV', 3, None),
    (3, 'zeevaart', 'POLDERWIND', '1060708', None, 'MT', 'Bulk carrier', 2009, 43000, 81500, 'LR', 7, None),
    (4, 'zeevaart', 'BRAKWATER TRADER', '1080904', None, 'CY', 'Multipurpose', 2013, 11200, 14900, 'BV', 2, None),
    (5, 'zeevaart', 'DUINROOS', '1112135', None, 'PT', 'Product tanker', 2018, 29700, 49900, 'ABS', None, 12),
    (6, 'binnenvaart', 'JOHANNA-W', None, '06099991', 'BE', 'Motorvrachtschip', 2004, None, 3200, None, 2, None),
]
SCHIP = {}
for k, soort, naam, imo, eni, vlag, typ, bj, gt, dwt, klasse, ruimen, tanks in SCHEPEN:
    SCHIP[k] = vid(f'schip/{k}')
    sql.append(rij('dossiers.schepen', dict(id=SCHIP[k], soort=soort, naam=naam, imo=imo, eni=eni, vlag=vlag, type=typ, bouwjaar=bj, gt=gt, dwt=dwt,
               klasse=klasse, actief=True, archived_on_utc=None, aantal_ruimen=ruimen, aantal_tanks=tanks)))
SCHIP['pioneer'] = PIONEER or SCHIP[1]


def om(dagen, uur=8, minuut=0):
    """Een moment t.o.v. vandaag, in Brusselse tijd (UTC+1 in november), als UTC."""
    d = VANDAAG + dt.timedelta(days=dagen)
    return dt.datetime(d.year, d.month, d.day, uur - 1, minuut, tzinfo=dt.timezone.utc)


# ── Dossiers. (sleutel, vestiging, nummer, soort, schip, opdrachtgever, haven, terminal, status, dagen t.o.v. vandaag, velden, omschrijving) ──
DOSSIERS = [
    ('3', HQ, 'HQ-2026-0003', 'damage', 1, 2, 'BEANR', 'Kaai 730', 'in_uitvoering', -1,
     {'datum_schade': (VANDAAG - dt.timedelta(days=3)).isoformat(), 'oorzaak': 'Contact with grab during discharge', 'geraamde_kost': '18500', 'lading': 'Steel coils'},
     'Damage to tank top and hatch coaming in hold 3 after discharge'),
    ('4', ZB, 'ZB-2026-0001', 'on_hire', 2, 8, 'BEZEE', 'Albert II-dok', 'afgesloten', -41,
     {'bunker_hfo': '312.5', 'bunker_mgo': '48.2', 'weer': 'Overcast, wind SW 4'}, 'Delivery into time charter'),
    ('5', ZB, 'ZB-2026-0002', 'off_hire', 2, 8, 'BEZEE', 'Albert II-dok', 'rapportage', -2,
     {'bunker_hfo': '187.0', 'bunker_mgo': '31.6', 'weer': 'Clear, wind W 3'}, 'Redelivery from time charter'),
    ('6', HQ, 'HQ-2026-0004', 'draft', 3, 'scheldemond', 'NLRTM', 'EMO terminal', 'gepland', 1,
     {'lading': 'Coal', 'soort_meting': 'initieel', 'densiteit': '1.025'}, None),
    ('7', HQ, 'HQ-2026-0005', 'hatch_cover', 4, 1, 'BEGNE', 'Kluizendok', 'nieuw', 3, {'methode': 'ultrasoon', 'aantal_luiken': '4'}, None),
    ('8', HQ, 'HQ-2026-0006', 'condition', 5, 3, 'FRDKK', None, 'gepland', 2, {'doel': 'P&I', 'weer': None}, 'P&I condition survey before entry'),
    ('9', HQ, 'HQ-2026-0007', 'bunker', 'pioneer', 'scheldemond', 'BEANR', 'Kaai 526', 'afgesloten', -12,
     {'product': 'VLSFO', 'hoeveelheid': '640', 'temperatuur': '41'}, None),
    ('10', ZB, 'ZB-2026-0003', 'sampling', 6, 2, 'BEGNE', 'Rodenhuizedok', 'in_uitvoering', 0,
     {'lading': 'Wheat', 'aantal_stalen': '6', 'labo': 'Demo Lab Gent'}, None),
]
# ⚠️ Een ongeldige code geeft in de app GEEN fout, enkel een leeg keuzevak (gezien op het eerste beeld, 13/11/2026: "Calm" in plaats van
# "kalm"). Daarom de codes uit de app zelf (Omstandigheden in Dossiers.cs, de keuzes per veld in de databank) en weigeren wat er niet in staat.
import re
_bron = (APP / 'src/Core/Quaymark.Core.Contracts/Dossiers/Dossiers.cs').read_text()
CODES = {n: re.findall(r'"([a-z_]+)"', re.search(rf'{n}Codes = \[([^\]]*)\]', _bron).group(1)) for n in ('Weer', 'Zee', 'Zicht')}
KEUZES = {}
for r in q("select code || '|' || (e->>'sleutel') || '|' || (e->'keuzes')::text from dossiers.survey_types, jsonb_array_elements(velden) e "
           "where e->>'soort' = 'keuze'").splitlines():
    c, k, j = r.split('|', 2)
    KEUZES[(c, k)] = json.loads(j)


def toets(k, soort, velden, omst):
    for veld, codes in (('weer', CODES['Weer']), ('zee', CODES['Zee']), ('zicht', CODES['Zicht'])):
        if omst.get(veld) is not None and omst[veld] not in codes:
            raise SystemExit(f'⛔ dossier {k}: {veld} = "{omst[veld]}" is geen code van de app ({", ".join(codes)}). Gestopt; niets geschreven.')
    for veld, waarde in velden.items():
        if (soort, veld) in KEUZES and waarde not in KEUZES[(soort, veld)]:
            raise SystemExit(f'⛔ dossier {k}: {veld} = "{waarde}" staat niet in de keuzes van {soort} ({KEUZES[(soort, veld)]}). Gestopt; niets geschreven.')


DOS = {}
for k, vest, nr, soort, schip, opdr, haven, terminal, status, dagen, velden, omschr in DOSSIERS:
    DOS[k] = vid(f'dossier/{k}')
    velden = {a: b for a, b in velden.items() if b is not None}
    omst = ({'zee': 'kalm', 'weer': 'bewolkt', 'zicht': 'goed', 'ligplaats': f'{terminal}, port side alongside'} if k in ('3', '5')
            else {'zee': None, 'weer': None, 'zicht': None, 'ligplaats': None})
    toets(k, soort, velden, omst)   # dezelfde waarden als die hieronder geschreven worden
    sql.append(rij('dossiers.dossiers', dict(
        id=DOS[k], nummer=nr, vestiging_id=vest, survey_type_id=SOORT[soort], schip_id=SCHIP[schip], opdrachtgever_id=REL[opdr],
        referentie_opdrachtgever=f'CL-{2026}-{400 + int(k)}', haven_locode=haven, terminal=terminal,
        datum_opdracht=VANDAAG + dt.timedelta(days=min(dagen, 0) - 2), gepland_op=om(dagen, 9 if int(k) % 2 else 14),
        status=status, taal='en', munt='EUR', omschrijving=omschr, velden=velden, created_at=NU - dt.timedelta(days=max(2 - dagen, 1)),
        archived_on_utc=None, surveyor_id=SURVEYOR_ID,
        aanwezigen=[{'naam': 'Capt. R. Lindqvist', 'functie': 'Master', 'partij': None}, {'naam': 'K. Mertens', 'functie': 'Terminal operations', 'partij': None}]
        if k in ('3', '5') else [],
        gekoppeld_dossier_id=DOS.get('4') if k == '5' else None,
        omstandigheden=omst)))

# Partijen bij het hoofddossier en de off-hire.
for k, rel, rol, ref in [('3', 1, 'reder', 'KM-OPS-2211'), ('3', 4, 'terminal', None), ('3', 3, 'pi_club', 'HK/26/0912'), ('3', 6, 'tegenexpert', None),
                         ('5', 8, 'bevrachter', 'TC-118'), ('5', 1, 'reder', None), ('4', 8, 'bevrachter', 'TC-118'), ('4', 1, 'reder', None)]:
    sql.append(rij('dossiers.dossier_partijen', dict(id=vid(f'partij/{k}/{rel}'), dossier_id=DOS[k], relatie_id=REL[rel], rol=rol, referentie=ref)))

# ── Vaststellingen met een foto. (dossier, sleutel, plaats, nummer, categorie, ernst, omschrijving, foto, uren t.o.v. de dag, lat, lon) ──
VASTSTELLINGEN = [
    ('3', 'a', 'ruim', '3', 'deuk', 'matig', 'Tank top plating indented over approx. 1.2 x 0.8 m, forward part of hold 3.', 'laadruim.jpg', 9.2, 51.2723, 4.3389),
    ('3', 'b', 'ruim', '3', 'corrosie', 'gering', 'Coating damage and light corrosion on the hold side plating, port side.', 'roestige-plaat.jpg', 9.5, 51.2723, 4.3390),
    ('3', 'c', 'luik', '3', 'deuk', 'ernstig', 'Hatch coaming top plate bent; rubber packing torn over approx. 2 m.', 'dek-met-luiken.jpg', 10.1, 51.2724, 4.3391),
    ('3', 'd', 'dek', None, 'vervuiling', 'geen', 'Cargo residues in the passage alongside the holds, removed during attendance.', 'gang-langs-ruimen.jpg', 10.6, 51.2724, 4.3392),
    ('4', 'a', 'luik', '2', 'deuk', 'gering', 'Minor indent on hatch cover 2, starboard side.', 'dek-met-luiken.jpg', 8.4, 51.3330, 3.2050),
    ('4', 'b', 'dek', None, 'corrosie', 'gering', 'Light corrosion on main deck around the forward mooring area.', 'dek-op-zee.jpg', 8.9, 51.3331, 3.2052),
    ('5', 'a', 'luik', '2', 'deuk', 'gering', 'Indent on hatch cover 2, starboard side, as before.', 'dek-met-luiken.jpg', 8.3, 51.3330, 3.2051),
    ('5', 'b', 'ruim', '1', 'scheur', 'matig', 'Crack in the hold ladder lower platform, hold 1.', 'gang-langs-ruimen.jpg', 8.8, 51.3332, 3.2049),
    ('5', 'c', 'dek', None, 'corrosie', 'matig', 'Corrosion on main deck around the forward mooring area, increased.', 'dek-op-zee.jpg', 9.2, 51.3331, 3.2052),
    ('5', 'd', 'ruim', '2', 'corrosie', 'gering', 'Coating breakdown on the hold side plating, hold 2.', 'roestige-plaat.jpg', 9.6, 51.3333, 3.2050),
]
DAG = {'3': -1, '4': -41, '5': -2}
VS = {}
for k, s, plaats, nummer, cat, ernst, omschr, foto, uur, lat, lon in VASTSTELLINGEN:
    vs = VS[(k, s)] = vid(f'vaststelling/{k}/{s}')
    op = om(DAG[k], int(uur), int(uur % 1 * 60))
    sql.append(rij('dossiers.vaststellingen', dict(id=vs, klant_id=vid(f'klant/vaststelling/{k}/{s}'), dossier_id=DOS[k], plaats=plaats,
               plaats_nummer=nummer, categorie=cat, ernst=ernst, omschrijving=omschr, checklist_sleutel=None, vervangt_id=None, vervang_reden=None,
               gebruiker_id=SURVEYOR_ID, gebruiker_naam=SURVEYOR_NAAM, opgenomen_op=op, ontvangen_op=op + dt.timedelta(minutes=2), toestel=TOESTEL)))
    data = (FOTOS / foto).read_bytes()
    sha = hashlib.sha256(data).hexdigest()
    bid = vid(f'bewijs/{k}/{s}')
    sleutel = f"bureau-{TENANT_N}/bewijs/{DOS[k].replace('-', '')}/{bid.replace('-', '')}_{sha}.jpg"
    doel = OPSLAG / sleutel
    doel.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(FOTOS / foto, doel)
    late, lone = round(lat * 1e7), round(lon * 1e7)
    sql.append(rij('dossiers.bewijsstukken', dict(id=bid, klant_id=vid(f'klant/bewijs/{k}/{s}'), dossier_id=DOS[k], vaststelling_id=vs,
               checklist_antwoord_id=None, sha256=sha, bewijstekst=f"qm1|{sha}|{op.strftime('%Y-%m-%dT%H:%M:%SZ')}|{late}|{lone}|450",
               opgenomen_op=op, lat_e7=late, lon_e7=lone, nauwkeurigheid_cm=450, storage_key=sleutel, bestandsnaam=f'IMG_{4100 + len(VS)}.jpg',
               content_type='image/jpeg', grootte=len(data), gebruiker_id=SURVEYOR_ID, gebruiker_naam=SURVEYOR_NAAM,
               ontvangen_op=op + dt.timedelta(minutes=3), toestel=TOESTEL)))

# De vergelijking off-hire ↔ on-hire: twee oordelen, de andere twee open (zo toont het beeld beide standen).
for s, bestond in [('a', True), ('c', False)]:
    sql.append(rij('dossiers.vergelijking_oordelen', dict(id=vid(f'oordeel/5/{s}'), dossier_id=DOS['5'], vaststelling_id=VS[('5', s)], bestond_al=bestond,
               gebruiker_id=SURVEYOR_ID, gebruiker_naam=SURVEYOR_NAAM, op=om(-1, 15))))

# ── Checklist: het hoofddossier volledig, de off-hire gedeeltelijk. ──
UITSLAG = {'3': ['in_orde', 'in_orde', 'in_orde', 'niet_in_orde', 'nvt', 'in_orde'], '5': ['in_orde', 'in_orde', 'niet_in_orde']}
SOORT_VAN = {k: s for k, _, _, s, *_ in DOSSIERS}
for k, uitslagen in UITSLAG.items():
    for i, (punt, uitslag) in enumerate(zip(CHECKLIST[SOORT_VAN[k]], uitslagen)):
        op = om(DAG[k], 11, 5 * i)
        sql.append(rij('dossiers.checklist_antwoorden', dict(id=vid(f'antwoord/{k}/{punt["sleutel"]}'), klant_id=vid(f'klant/antwoord/{k}/{punt["sleutel"]}'),
                   dossier_id=DOS[k], sleutel=punt['sleutel'], label=punt['label'], verplicht=punt.get('verplicht', False),
                   foto_verplicht=punt.get('fotoVerplicht', False), uitslag=uitslag,
                   opmerking='Packing torn, see findings' if uitslag == 'niet_in_orde' else None,
                   gebruiker_id=SURVEYOR_ID, gebruiker_naam=SURVEYOR_NAAM, opgenomen_op=op, ontvangen_op=op + dt.timedelta(minutes=1), toestel=TOESTEL)))

# ── Rubriekteksten van het hoofddossier (tabblad Rapport) en standaardteksten van het bureau. ──
for sleutel, html in [
    ('inleiding', '<p>At the request of <strong>Polderwacht Verzekeringen NV</strong>, the undersigned surveyor attended on board the '
                  'm.v. KAAIMEEUW at Antwerp, Kaai 730, to ascertain the nature and extent of damage reported in hold 3.</p>'),
    ('werkwijze', '<p>The hold was inspected after completion of discharge, in the presence of the master and the terminal representative.</p>'
                  '<ul><li>Visual inspection of tank top, hold sides and hatch coaming</li><li>Measurements of the indentations</li>'
                  '<li>Photographs taken with the Quaymark field app</li></ul>')]:
    sql.append(rij('rapporten.rubriek_teksten', dict(id=vid(f'rubriek/3/{sleutel}'), dossier_id=DOS['3'], sleutel=sleutel, html=html,
               gewijzigd_op=om(-1, 16), gewijzigd_door=SURVEYOR_NAAM)))
for i, (naam, rubriek, html) in enumerate([
    ('Attendance on board', 'inleiding', '<p>The undersigned surveyor attended on board in the presence of the master.</p>'),
    ('Method — visual inspection', 'werkwijze', '<p>The areas concerned were visually inspected and photographed.</p>'),
    ('Conclusion — further survey', 'conclusie', '<p>A further survey is recommended once the repairs have been completed.</p>')], 1):
    sql.append(rij('rapporten.standaardteksten', dict(id=vid(f'standaardtekst/{i}'), naam=naam, taal='en', rubriek=rubriek, html=html, actief=True)))

# ── Een afwezigheid voor de planning (P1, 13/11/2026): een opleidingsdag op de maandag van deze week, zodat de werkweek op het beeld ze toont. ──
maandag = VANDAAG - dt.timedelta(days=VANDAAG.weekday())
sql.append(f"delete from planning.afwezigheden where id = {lit(vid('afwezigheid/1'))};")
sql.append(rij('planning.afwezigheden', dict(id=vid('afwezigheid/1'), gebruiker_id=SURVEYOR_ID, van=maandag, tot=maandag, soort='opleiding',
           opmerking='IIMS refresher', created_at=om(-7), archived_on_utc=None)))

# ── Facturatie (8a tot 8c, 13/11/2026): de gegevens van het bureau, de tarieven, tijd en kosten op ZB-2026-0003 (nog niet gefactureerd: zo kan
#    "Factuur voorstellen" op het beeld), en een KLAD-factuur voor HQ-2026-0007. Een uitgegeven factuur maakt dit script NIET: die heeft een PDF met
#    haar SHA-256 nodig, en die komt enkel uit de app. ──
sql.append("""insert into financieel.bureaugegevens (id, naam, btwnummer, straat, postcode, gemeente, land, email, telefoon, iban, bic, betaaltermijn, factuurvoet)
values (1, NULL, 'BE 0123.456.749', 'Noordkaai 12', '2000', 'Antwerpen', 'BE', 'facturatie@noordkaai.example', NULL, 'BE68 5390 0754 7034', NULL, 30, NULL)
on conflict (id) do update set btwnummer = excluded.btwnummer, straat = excluded.straat, postcode = excluded.postcode, gemeente = excluded.gemeente,
  land = excluded.land, email = excluded.email, iban = excluded.iban, betaaltermijn = excluded.betaaltermijn;""")
# Per soort survey een forfait OF een uurtarief (verzonnen bedragen, zonder btw).
TARIEVEN = {'damage': (None, 110), 'condition': (None, 110), 'sampling': (None, 95), 'lashing': (None, 95), 'draft': (650, None),
            'bunker': (450, None), 'hatch_cover': (850, None), 'on_hire': (520, None), 'off_hire': (520, None), 'pre_loading': (480, None)}
for code, (forfait, uur) in TARIEVEN.items():
    if code not in SOORT:
        raise SystemExit(f'⛔ De soort survey {code} bestaat niet in de app. Gestopt; niets geschreven.')
    sql.append(f"insert into financieel.tarieven_soort (survey_type_id, forfait, uurtarief) values ({lit(SOORT[code])}, {lit(forfait)}, {lit(uur)}) "
               "on conflict (survey_type_id) do update set forfait = excluded.forfait, uurtarief = excluded.uurtarief;")
sql.append(f"insert into financieel.tarieven_surveyor (gebruiker_id, uurtarief) values ({lit(SURVEYOR_ID)}, 125) on conflict (gebruiker_id) do update set uurtarief = 125;")
sql.append("insert into financieel.toeslagen (id, weekend, feestdag, nacht, nacht_van, nacht_tot) values (1, 50, 100, 25, '20:00', '06:00') "
           "on conflict (id) do update set weekend = 50, feestdag = 100, nacht = 25, nacht_van = '20:00', nacht_tot = '06:00';")
STAALNAME = vid('dossier/10')
gisteren, vandaag = VANDAAG - dt.timedelta(days=1), VANDAAG
PRESTATIES = [(1, gisteren, '08:00', '12:30', 'Sampling during loading, holds 1 to 3'), (2, vandaag, '07:00', '10:15', 'Sampling holds 4 to 6, sealing of samples')]
KOSTEN = [(1, 'reis', 'Mileage Antwerp to Ghent return, 112 km', 47.04, True), (2, 'labo', 'Laboratory analysis, 6 samples', 390.00, True),
          (3, 'andere', 'Parking at the terminal', 12.00, False)]
sql.append(f"delete from financieel.prestaties where id in ({', '.join(lit(vid(f'prestatie/{k}')) for k, *_ in PRESTATIES)});")
sql.append(f"delete from financieel.kosten where id in ({', '.join(lit(vid(f'kost/{k}')) for k, *_ in KOSTEN)});")
for k, dag, van, tot, oms in PRESTATIES:
    sql.append(rij('financieel.prestaties', dict(id=vid(f'prestatie/{k}'), dossier_id=STAALNAME, gebruiker_id=SURVEYOR_ID, van=f'{dag}T{van}:00',
               tot=f'{dag}T{tot}:00', omschrijving=oms, factuur_id=None, created_at=om(-1))))
for k, soort, oms, bedrag, door in KOSTEN:
    sql.append(rij('financieel.kosten', dict(id=vid(f'kost/{k}'), dossier_id=STAALNAME, datum=VANDAAG, soort=soort, omschrijving=oms, bedrag=bedrag,
               doorrekenen=door, bijlage_id=None, factuur_id=None, created_at=om(-1))))
if not SCHELDEMOND:
    raise SystemExit('⛔ De relatie Scheldemond Bevrachting NV bestaat niet (de opdrachtgever van HQ-2026-0007). Gestopt; niets geschreven.')
KLAD = vid('factuur/klad-1')
# De regels zoals de app ze bewaart (JSON, camelCase). Forfait bunker survey + een kost; 21 %: 488,50 + 102,59 = 591,09 (één afronding per tarief).
REGELS = [dict(omschrijving='Fixed fee: Bunker survey', aantal=1, eenheid='C62', eenheidsprijs=450.00, btwCategorie='S', btwProcent=21),
          dict(omschrijving='Travel: Mileage Antwerp port, 26 km', aantal=1, eenheid='C62', eenheidsprijs=38.50, btwCategorie='S', btwProcent=21)]
sql.append(f"delete from financieel.facturen where id = {lit(KLAD)} and status = 'klad';")
sql.append(rij('financieel.facturen', dict(id=KLAD, soort='factuur', status='klad', nummer=None, vestiging_id=HQ, dossier_id=vid('dossier/9'),
           klant_id=SCHELDEMOND, datum=VANDAAG, vervaldatum=None, taal='en', munt='EUR', referentie='SB-2026-118', opmerking=None,
           gecorrigeerde_factuur_id=None, forfait=True, regels=REGELS, totaal_excl=488.50, btw=102.59, totaal_incl=591.09, mededeling=None, verkoper=None, koper=None,
           iban=None, bic=None, pdf_storage_key=None, pdf_sha256=None, pdf_grootte=None, momentopname=None, momentopname_sha256=None,
           uitgegeven_op=None, uitgegeven_door=None, created_at=om(0))))

# ── De nummerteller: het volgende dossier dat de app maakt, mag niet botsen met deze nummers. ──
for vest, laatste in [(HQ, 7), (ZB, 3)]:
    reeks = f"dossier:{vest.replace('-', '')}"
    sql.append(f"update dossiers.adm_nummer_tellers set laatste_nummer = greatest(laatste_nummer, {laatste}) where reeks = {lit(reeks)} and jaar = {VANDAAG.year};")
    sql.append(f"insert into dossiers.adm_nummer_tellers (id, reeks, jaar, laatste_nummer) select {lit(vid('teller/' + reeks))}, {lit(reeks)}, {VANDAAG.year}, {laatste} "
               f"where not exists (select 1 from dossiers.adm_nummer_tellers where reeks = {lit(reeks)} and jaar = {VANDAAG.year});")

sql.append('commit;')
q('\n'.join(sql))
tel = q("select (select count(*) from dossiers.dossiers) || ' dossiers, ' || (select count(*) from relaties.relaties) || ' relaties, ' || "
        "(select count(*) from dossiers.schepen) || ' schepen, ' || (select count(*) from dossiers.vaststellingen) || ' vaststellingen, ' || "
        "(select count(*) from dossiers.bewijsstukken) || ' bewijsstukken, ' || (select count(*) from financieel.facturen) || ' facturen'")
print(f'✅ qm-demo gevuld ({VANDAAG}): {tel}.')
