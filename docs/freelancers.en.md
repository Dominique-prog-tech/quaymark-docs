---
description: "Freelance surveyors: their record with hourly rate and VAT scheme, the Freelancer role, and the statement per period with self-billing."
---

# Freelancers

A freelance surveyor works for the company on files assigned to them and is paid per period. The company draws up that invoice on their behalf (**self-billing**): Quaymark settles their hours and their own expenses at their rate, with a number and a PDF.

What the company invoices the **principal** does not change: that remains the rate on the [Rates](tarieven.md) screen.

## Opening the screen

At the bottom of the menu, click **Administration**, then the **Freelancers** tile. Only the administrator of the company sees this screen.

![Freelancers with Code, Company name, Hourly rate (purchase), VAT scheme and Role](images/freelancers-en.png "The freelancers")

The **Freelancer role** column shows a tick if the freelancer already has that role, and *Not yet* otherwise.

**Still to settle** is what their next statement would amount to, excluding VAT: their time entries and own expenses up to today that are not yet on a statement. If the **Settlement** column shows something (*No agreement*, *Details missing*, *No hourly rate* or *Inactive*), Quaymark issues no statement for them. Point at it: the explanation says what to fill in on their record.

## Adding a freelancer

A freelancer is a user of the company. New users are created by ADM Concept: ask ADM Concept. Then click **New freelancer** here.

- **User**: the user of the company. Quaymark suggests a **Company name** and a **Code** from their name.
- **Code**: 2 to 6 capital letters or digits, unique within the company. It appears in the number of every statement: *SB-CODE-YEAR-001*. After the first statement it is fixed, so that the numbers remain one series.
- **Company name**, **Company / VAT number**, **Street and number**, **Postcode**, **City**, **Country** and **IBAN**: this is how the freelancer appears as supplier on the statement. You choose the country from the list. Quaymark checks the check digits of a Belgian company number and of the IBAN; a foreign company number cannot be checked. Street, city and IBAN are required to settle.
- **Hourly rate (purchase)**: what the company pays them per hour.
- **VAT scheme**: *Standard (21 %)*, *Exempt (small business)* or *Reverse charge*. For exempt and reverse charge, the legal statement appears on the statement.
- **Self-billing agreement on**: the date on which the freelancer agreed in writing that the company draws up their invoices. Without this date, or with a date after the period, Quaymark issues no statement.
- **Active**: set a freelancer who no longer works for the company to inactive. Their statements are kept.

![The record of a freelancer with Supplier and Arrangements](images/freelancer-fiche-en.png "A freelancer")

## The Freelancer role

The top of the record shows whether the freelancer already has the role. Click **Give Freelancer role** and confirm.

With this role they only see **My work** in the web app, and in the field app the files assigned to them. There they record findings, photos and their time, like any surveyor. Their other roles are removed, and on the **Roles** screen they are not among the users you can give a role. Without this role they see everything a member of staff sees. To undo this, ask ADM Concept. → [My work](mijn-werk.md)

## Statements

Open the **Statements** tab on the record and choose a period with **From** and **Until** (by default the previous month). Quaymark shows the proposal: their time entries and own expenses in that period that are not yet on a statement. Hours at their hourly rate, expenses at their amount, with VAT according to their scheme.

![The Statements tab with the proposal and the totals](images/freelancer-afrekening-en.png "A statement")

Click **Issue statement** and confirm. The statement gets a number and a PDF with a fingerprint (SHA-256). Its content is fixed: these time entries and expenses can no longer be changed or deleted, and never appear on a second statement. Quaymark does not open a PDF that no longer matches its fingerprint.

If something is missing (the agreement, the details, an hourly rate), the screen says what, and the button stays disabled.

The issued statements are listed below, with the total excluding and including VAT, who issued them and their **PDF**. You can search, sort and export them. The freelancer sees the same PDF on My work.

## On the file

On the **Time and expenses** tab of a file, the **Entered by** column shows who entered an expense. A time entry or expense on a statement gets the status *Settled* and can no longer be edited. Invoiced to the principal and settled with the freelancer are independent of each other. → [Files](dossiers.md)

## See also

- [My work](mijn-werk.md)
- [How do I settle a freelancer?](hoe/freelancer-afrekenen.md)
- [Rates](tarieven.md)
