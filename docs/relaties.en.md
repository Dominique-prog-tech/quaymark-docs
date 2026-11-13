---
description: "All parties the office works with, in one list: principals, shipowners, charterers, insurers, P&I clubs, terminals, agents, opposing surveyors, brokers and correspondents."
---

# Relations

All parties the office works with, in one list: principals, shipowners, charterers, insurers, P&I clubs, terminals, agents, opposing surveyors, brokers and correspondents.

## Opening the screen

In the menu on the left, click **Relations**.

## The list

- The **Roles** column shows in which capacity a relation appears in your files; one relation can have several roles.
- The **search box** searches name, role, city, country, company number and email.
- Double-click a row to open the **record**; the arrow at the start of the row opens it in a new tab. **New relation** creates one.

![The Relations list with their Roles and the New relation button](images/relaties-lijst-en.png "The Relations list")

## Relation

The details of one relation.

![The relation Kaaimeeuw Rederij NV: Identity, Address and contact, and the Contacts tab](images/relatie-en.png "A relation")

- **Identity**: kind (company or person), name, company or VAT number, roles, language and active. A company number occurs only once per country.
- **Look up in the CBE** fills in the name and address from the Belgian Crossroads Bank for Enterprises. This only works for Belgian companies.
- **Address and contact**: street, postcode, city, country, email, phone and a note.
- Set a relation you no longer use to **inactive**: it then disappears from the choice lists of new files, while older files keep showing it.

A saved relation has the **Contacts** tab (name, position, email, phone, language) and the journal with notes, tasks, attachments and history. **Delete** moves the relation to the recycle bin.

## Client portal

A principal can follow their own files in the client portal. To allow this, you give a contact person of the relation access. You only see the **Client portal** tab on the record with the right to manage the client portal; by default only the administrator has that right.

- **Who**: a contact person with one email address. If the person is not listed yet, first add them on the **Contacts** tab.
- **Invite**: choose the contact person and click **Invite**. The contact person receives an email, in their own language or otherwise that of the relation, with a link to choose a password. The link is valid for 7 days. At the first sign-in the contact person sets up two-step verification: without it, nobody gets into the portal.
- **Status**: *Invited* (no password yet), *Active* or *Disabled*, and whether two-step verification is on. **Invite again** sends a new link; the previous one expires.
- **Revoke access** is always possible. If the contact person is signed in at that moment, that session ends within five minutes.
- **Email notifications to the portal users** is on by default: an email on a decision about a request, when scheduling or moving, and when a report, letter, certificate or invoice is issued. Turn it off here for this relation; each user can also turn it off. → [Requests](aanvragen.md#notifications-to-the-principal)

What the contact person sees in the portal:

- **My files**: the files in which this relation is the principal, with survey type, vessel, port, their own reference, the status and when the work is scheduled. Not a file in the recycle bin.
- For each file, the **issued** report versions and the issued letters and certificates, as PDF. Never a preview or a draft. Every file is first checked against its fingerprint.
- **New assignment**: submit an assignment, with attachments. It reaches the office as a request and appears under **My requests** until the office decides. → [Requests](aanvragen.md)
- **My invoices**: the issued invoices and credit notes with this relation as customer, with their PDF. Not a draft. The portal does not show whether an invoice has been paid.
- No surveyor, hours, costs, findings or photos: those are in the report.

## Framework agreements

With a regular principal, an office often agrees its own rates. You record them on the **Framework agreements** tab (visible with the right to view invoices).

- **New framework agreement**: choose **Valid from** and optionally **Valid until**, and fill in a **flat fee** or an **hourly rate** per survey type. Next to each field is what the office charges without an agreement. An empty line follows the office's rate card.
- Anything not in the agreement follows the [office's rate card](tarieven.md), as do the weekend, public holiday and night surcharges.
- The **agreement's hourly rate takes precedence** over a surveyor's own hourly rate: the principal pays what was agreed, whichever surveyor goes.
- A file follows the agreement that applied on the **date of the assignment**. So the rate of an ongoing file does not change when a new agreement starts.
- Two agreements of the same principal may not overlap.
- The invoice proposal, the estimate on the **Time and expenses** tab and the home screen calculate with the agreement. The invoice proposal also says so.
- Whoever manages the rates can change or delete an agreement.

## See also

- [Files](dossiers.md)
