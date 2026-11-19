#!/usr/bin/env python3
"""Ruimt op wat een filmronde in de proefklant qm-demo achterlaat en proefklant-vullen.py niet kent (19/11/2026).

Draai:  python3 tools/film-opruimen.py --sinds "2026-11-19 09:00"          toont enkel wat er weg zou gaan
        python3 tools/film-opruimen.py --sinds "2026-11-19 09:00" --echt   wist het

`--sinds` is een tijdstip in UTC: het begin van de ronde. Een film die schrijft (rapport-uitgeven), noteert het vóór de eerste taal:
    sinds=$(date -u '+%Y-%m-%d %H:%M:%S')
en draait na de laatste taal eerst proefklant-vullen.py en dan dit.

WAAROM DIT BESTAAT. proefklant-vullen.py zet zijn EIGEN rijen terug (vaste ids), en dat is genoeg voor wat een scherm als gegeven
toont. Maar een film die bewaart, laat ook sporen na die het vulscript niet kent: de HISTORIEK van elke wijziging, de MELDINGEN aan
het opdrachtgeversportaal en de MAILS in het journaal. Na de proeffilm (19/11/2026, zestien rondes) stonden er zeventien regels
"Status In uitvoering → Rapportage" in de historiek van HQ-2026-0003, en twaalf mails "Nieuw rapport" in zijn journaal. Ik had ze
"enkel logboek" genoemd; ze staan zichtbaar op het tabblad Historiek, en de film Aan de slag zou ze in beeld brengen.

⚠️ Niets van dit alles was VERSTUURD: in Development zet de app een portaalmelding en haar mail op niet-verstuurd-ontwikkeling,
zonder hub. Dit script wist daarom enkel mails en meldingen met die status: een echte verzending raakt het nooit aan.
⚠️ Het auditlogboek (quaymark_control.audit) en de historiek van de gebruiker in het register (de taalwissels van surveyor.demo)
blijven bewust staan: aan een audit kom je niet, en de taalwissel hoort bij de motor.
⚠️ Enkel de lokale databank van qm-demo (container quaymark-db). Rondt niemand anders in die tijd in qm-demo? Kijk dan eerst naar de
telling: ze toont per tabel en per soort wat er zou weggaan.
"""
import argparse, datetime as dt, subprocess, sys

KLANT_DB = 'tenant_quaymark_qm_demo'
CONTAINER = 'quaymark-db'

ap = argparse.ArgumentParser()
ap.add_argument('--sinds', required=True, help='begin van de ronde, in UTC: "JJJJ-MM-DD UU:MM[:SS]"')
ap.add_argument('--echt', action='store_true', help='werkelijk wissen (zonder: enkel tonen)')
a = ap.parse_args()
try:
    sinds = dt.datetime.fromisoformat(a.sinds)
except ValueError:
    sys.exit(f'⛔ --sinds "{a.sinds}" is geen tijdstip (JJJJ-MM-DD UU:MM).')
if sinds < dt.datetime.now() - dt.timedelta(days=2):
    sys.exit(f'⛔ --sinds {sinds} ligt meer dan twee dagen terug: dat is geen filmronde meer. Gestopt; niets gewist.')
S = sinds.isoformat(sep=' ')


def q(sql):
    r = subprocess.run(['docker', 'exec', '-i', CONTAINER, 'psql', '-U', 'postgres', '-d', KLANT_DB, '-At', '-F', '|',
                        '-v', 'ON_ERROR_STOP=1', '-c', sql], capture_output=True, text=True)
    if r.returncode:
        sys.exit(f'⛔ {r.stderr.strip()}')
    return r.stdout.strip()


# (tabel, voorwaarde, wat de telling per regel toont)
DOELEN = [
    ('dossiers.record_history', f"occurred_at_utc >= '{S}'", 'entity_type'),
    ('rapporten.record_history', f"occurred_at_utc >= '{S}'", 'entity_type'),
    ('dossiers.portaal_meldingen', f"op >= '{S}' and status = 'niet-verstuurd-ontwikkeling' and hub_id is null", 'soort'),
    ('journaal.adm_mails', f"created_at_utc >= '{S}' and owner_type = 'dossier' and delivery_status = 'niet-verstuurd-ontwikkeling' "
                           f"and adm_one_mail_id is null", 'subject'),
]

totaal = 0
for tabel, waar, groep in DOELEN:
    rijen = q(f'select {groep}, count(*) from {tabel} where {waar} group by 1 order by 2 desc')
    n = sum(int(r.rsplit('|', 1)[1]) for r in rijen.splitlines()) if rijen else 0
    totaal += n
    print(f'{tabel}: {n}')
    for r in rijen.splitlines():
        print(f'    {r.rsplit("|", 1)[1]:>4} × {r.rsplit("|", 1)[0][:90]}')
    if a.echt and n:
        q(f'delete from {tabel} where {waar}')

if not a.echt:
    print(f'\n◐ {totaal} rij(en) sinds {S} UTC. Niets gewist: voeg --echt toe.')
else:
    print(f'\n✅ {totaal} rij(en) sinds {S} UTC gewist.')
