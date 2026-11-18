---
description: "Invoices and credit notes: propose an invoice from a file, adjust the draft, issue it with a number and payment QR code, and correct it with a credit note."
---

# Invoices

All invoices and credit notes of the office. An invoice is usually made from the file, from the time and expenses recorded on it.

## Opening the screen

Click **Invoices** in the menu on the left. The list shows the newest first. The status appears as a coloured label:

- **Draft**: no number yet, free to change;
- **Open**: issued and not yet fully paid;
- **Overdue**: the due date has passed and something is still outstanding;
- **Paid**: fully paid (see [Payments](betalingen.md));
- **Credited**: corrected with a credit note.

A credit note itself is **Issued**, with a minus sign before the amount: that way an export adds up to what was actually invoiced. The **Outstanding** column shows what is still to be paid on an invoice. Choose **Unpaid** under **Status** to see only the open and overdue invoices. The same status appears on the invoice itself and on the **Time and expenses** tab of the file.

Every user of the office sees the invoices; drafting and issuing them requires a separate permission.

![Invoices with New invoice and a Draft for HQ-2026-0007](images/facturen-en.png "The invoices")

## Proposing an invoice from a file

1. Open the file and choose the **Time and expenses** tab.
2. Click **Propose invoice**.

Quaymark creates a draft for the principal of the file:

- if the survey type has a **fixed fee**, one line with that amount;
- otherwise one line per surveyor with their hours times their hourly rate, and a separate line for the surcharge (weekend, public holiday or night) where it applies;
- then the expenses marked **Recharge**.

Anything already on another invoice is left out. The rates come from [Rates](tarieven.md). If an hourly rate is missing, the line is at 0.00 and Quaymark says so.

## Adjusting the draft

A draft has no number yet and can be changed freely: customer, office, date, language, reference and lines. **Add line** adds a line. You choose the **currency** from the same list as on the file. A draft you do not need is discarded with **Delete**, on the right in red.

![A Draft with Customer, Office, Lines and Add line](images/factuur-en.png "A draft invoice")

**VAT** is proposed according to the customer:

- the same country as the office: the normal rate;
- another EU country, with a VAT number: **reverse charge** (the customer pays the VAT);
- another EU country, without a VAT number: the normal rate;
- a country outside the EU: **outside scope**.

If needed, adjust it per line. The legal statement for reverse charge or outside scope appears on the invoice.

**Preview (PDF)** shows the invoice as it will be sent, marked PREVIEW. Nothing is saved.

## Issuing

Click **Issue** and confirm. The invoice then gets:

- its **number**, per office and per year (F-HQ-2026-0001);
- its **due date** according to the office's payment term;
- a **structured payment reference** and a **payment QR code** a banking app can scan.

The PDF is recorded with its fingerprint (SHA-256). After that the invoice can no longer be changed or deleted. An invoice cannot be dated in the future, nor earlier than the last issued invoice of the same office.

## Sending via Peppol

An issued invoice or credit note can be sent electronically to the customer's accounting with **Send via Peppol**. Quaymark first checks that the customer is on the Peppol network. Their VAT number is needed for that: fill it in on their [relation record](relaties.md).

Every attempt is listed in the **Peppol** block of the invoice:

- **Accepted**: the invoice has been sent. **Check status** shows whether it was delivered.
- **Refused**: the reason is shown. Correct it and send again.
- **Unknown**: no clear answer came back. The invoice may have been sent. Check the status, or simply send again: the same invoice is never sent twice.

If the customer is not on Peppol, deliver the PDF another way.

## Foreign currencies

An invoice takes the currency of the [file](dossiers.md). If that is not the euro:

- the **proposal** converts the [rates](tarieven.md), which are in euros, into the currency of the file, at the reference rate of the European Central Bank (ECB). Quaymark tells you which rate it used. Costs are entered in the currency of the file: they are not converted;
- on **issuing**, Quaymark fixes the rate of the invoice date: the last one the ECB published on or before that day. The invoice states the **equivalent in euros**: excluding VAT, the VAT and including VAT, with the rate and its date. The rate and the equivalent also appear on the invoice in Quaymark;
- the **revenue** on the home page counts in euros, at the rate of each invoice;
- **Peppol** cannot send the invoice yet: the **Peppol** block says so straight away, without a button. Deliver the PDF another way.

Without a rate (the ECB rate is temporarily unavailable), Quaymark does not issue the invoice and says so. Try again later: Quaymark never calculates with an estimated or old rate. An invoice in euros is not affected.

## Correcting with a credit note

An error on an issued invoice is corrected with **Create credit note**. A draft credit note is created for the full amount. Only once it is issued is the invoice credited, and are its time entries and expenses released for a new invoice.

## A separate invoice

**New invoice** in the list creates an invoice without time or expenses, for example for an advance.

## To invoice

The work of each file that is not yet on any invoice: the open time entries, the rechargeable expenses and the fixed fee of completed files, as an estimate excluding VAT, in the currency of the file. The estimate calculates like the invoice proposal, with the surcharges for weekend, night and the public holidays of the office's country. Open the list with **To invoice** on this page, or with the **Uninvoiced work** card on the dashboard.

- The largest estimate is at the top.
- A click on a row opens the file's **Time and expenses** tab: that is where you propose the invoice. → [Proposing an invoice from a file](#proposing-an-invoice-from-a-file)

## See also

- [Company details](bureaugegevens.md)
- [Rates](tarieven.md)
- [Templates](sjablonen.md)
