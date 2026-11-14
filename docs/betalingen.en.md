---
description: "Receipts from the bank feed matched to the invoices, automatically where the reference and the amount match, and reminders in three steps."
---

# Payments

This screen shows which invoices are paid and what is still outstanding. The transactions on the office's bank account come from the ADM One bank feed.

## Opening the screen

In the menu, click **Payments**. Viewing needs the right to view invoices; matching, recording and reminding need the right to edit invoices.

## Linking the bank

The administrator links the office's bank account in the ADM One portal (Bank). Quaymark has nothing to do for this. The linked account is shown at the top of the screen. If the bank asks to link again (after about 180 days), that is shown too; until then nothing new comes in.

Quaymark fetches the transactions when the screen opens, at most every five minutes. **Fetch now** does it immediately.

## Automatic matching

If the structured reference of an invoice is in the transaction and the amount is exactly what is outstanding on that invoice, the invoice is paid immediately. The invoice then shows **Fully paid**, with the payment underneath.

## To process

The receipts that Quaymark did not match itself, with a **Suggestion** where possible:

- the reference matches, but the amount does not (a partial payment, or paid too much);
- the invoice number is in the text of the transfer;
- the amount is exactly the balance of one invoice of a customer with that name.

**Match** allocates the transaction to the chosen invoice. You can also allocate part of the amount and the rest to another invoice. **Set aside** removes a transaction that is not a customer payment, for example a refund or a transfer between your own accounts.

## Outstanding

The issued invoices with a balance, oldest due date first, with the days overdue. A credit note on an invoice counts in the balance.

**Record payment** is for a payment not in the bank feed: cash, another account or set off. Say under **Note** how it was paid.

## Reminders

After the number of days in [Company details](bureaugegevens.md) (by default 7, 21 and 35 after the due date), the invoice shows **Send Reminder**, then **Send Second reminder** and **Send Final notice**. Between two steps there is at least the difference between their periods (14 days by default), even if you start reminding late. A reminder is never sent by itself: only with a click, after a confirmation.

The email goes through ADM One to the address on the invoice (otherwise that of the relation), in the language of the invoice, with the invoice as a PDF, the amount outstanding, the account and the structured reference. It also appears in the relation's journal. Each step can be done once per invoice.

## Processed

The matched payments, with who matched them. **Undo** reverses a wrong match: the payment no longer counts and the transaction returns under To process. The payment stays on record, with who undid it.

## See also

- [Invoices](facturen.md)
- [Company details](bureaugegevens.md)
- [Relations](relaties.md)
