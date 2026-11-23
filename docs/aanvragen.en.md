---
description: "Assignments from the principal portal and the web form on your website: view, accept or decline."
---

# Requests

The assignments that principals submitted in the principal portal, or that someone sent through the request form on the office's website. A request only becomes a file once the office accepts it.

## Opening the screen

Click **Requests** in the menu on the left. If requests are waiting, the home screen shows how many.

## The list

- By default you only see the requests awaiting a decision. Tick **Also accepted or declined** for the rest. This choice stays when you open a request and come back to the list.
- Double-click a row to open the request.
- The **Source** column shows where the request comes from: **Portal** or **Website**. A web request has no principal yet: the **Principal** column then shows who sent it.

## Request

On the left is what the principal filled in: who submitted the request, the survey type, the vessel, the port and terminal, the requested date, the reference, the description and the attachments (for example the letter of instruction or the stowage plan). A PDF opens in a window, another file is downloaded.

- **Accept**: choose the office, the vessel, the surveyor, the time and the report language. For the vessel, Quaymark suggests an existing vessel if the IMO number, ENI number or name matches; otherwise a new vessel from the request's details. If the request had no IMO or ENI number (the principal does not have to fill it in), enter the **Kind** and the **IMO number** or **ENI number** for a new vessel; without a number Quaymark does not create a vessel. If the number already belongs to a vessel, the field says so and Quaymark uses that vessel. The requested time is already filled in. With a surveyor and a time the file becomes **Scheduled**, otherwise **New**. Quaymark then creates the file, copies the attachments to the **Documents** tab and sends the principal an email. If something is still missing (the office, or for a web request the principal or the survey type), a message at the top of the form says what; Quaymark then creates nothing yet.
- If the office works with this vessel for another principal, and this principal is a party there, a warning appears above **Accept**. → [Conflicts of interest](dossiers.md#conflicts-of-interest)
- **Decline** asks for a reason. The principal sees it in the portal and in the email.
- Deciding requires the right to edit files. A request is decided only once: if two colleagues click at the same time, the second is told it has already been decided.

## Web form

The company can put a request form on its own website. Whoever fills it in needs no account. The form sends the details to Quaymark, and half a minute later the request appears on this screen, with the **Website** badge and a notification on the bell at the top right.

- **Setting up**: ask ADM-Concept for a website key for your company, and give it to your web developer with the technical explanation at <https://platform.digitalcloud.be/docs/leads-contactformulier>. → [How do I put a request form on our website?](hoe/aanvraagformulier.md)
- **The fields**: name, email, phone, company, subject and message always come through. If you want Quaymark to fill in the vessel, port or survey type as well, give the fields one of the names below (capitals, accents and spaces do not matter). Everything else, and a value that is not right (a wrong IMO number, a port that is not a UN/LOCODE), goes into the description. Nothing is lost.

| Field | Field name (one of) | Value |
|---|---|---|
| Vessel | ship, vessel, schip, navire, Schiff | the name |
| IMO | imo, IMO number | 7 digits, checked |
| ENI | eni, ENI number | 8 digits |
| Port | port, haven, Hafen, locode | UN/LOCODE, e.g. BEANR |
| Terminal | terminal, quay, berth, kaai, quai | free text |
| Survey type | survey type, soort survey, type d'expertise, Besichtigungsart | the code or name of a survey type |
| Preferred date | preferred date, gewenste datum, date souhaitée, Wunschtermin | 20/11/2026 or 2026-11-20 14:30, in the company's time |
| Reference | reference, referentie, référence, Referenz | the requester's reference |

- **The principal**: when you click **Accept**, you choose the principal. If a relation or contact has the same email address as the requester, that relation is suggested. You can choose another, or **New relation** creates one from the requester's details (a company with the requester as contact, or a person). If the survey type was not recognised, you choose it here as well.
- **The requester** receives an email when the request is accepted or declined, in the language of the form. That email has no link: they have no access to the portal.

## Notifications to the principal

The principal's portal users receive an email when their request is accepted or declined, when a file is scheduled or moved, when the office sends a quotation or a message, and when a report, letter, certificate or invoice is issued. The email has no attachment, only a link to the portal. You turn it off per relation on the Principal portal tab; each user can also turn it off (if it is off for the relation, the Notifications page in the portal says so). Every notification sent appears in the file's journal.

## See also

- [Relations](relaties.md#principal-portal)
- [Files](dossiers.md)
