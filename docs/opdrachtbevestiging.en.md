---
description: "The principal confirms the assignment and the office's general terms and conditions, through a link or in the client portal; with proof of who, when and which version."
---

# Order confirmation

With an order confirmation you record that the principal accepts the assignment, the rate and the office's general terms and conditions. The principal confirms through a link in an email, or in the client portal.

## Setting up the terms and conditions

In the menu, click **Settings**, **Terms and conditions**. This screen needs the right to manage the general terms and conditions (by default only the administrator).

1. Click **New version**. The text of the current version is already filled in, in four languages.
2. Adjust the text. The Dutch text is required; a language left empty shows the Dutch text.
3. Click **Save version**.

The new version applies to every confirmation you send afterwards. A version is never changed or deleted: the principal always accepts one specific version. Click a version to see its text and its fingerprint (SHA-256).

Without terms and conditions, no order confirmation can be sent.

## Sending a confirmation

At the top of the file record is the **Order confirmation** box, with the status of the file.

1. Save the file with a principal.
2. Click **Send confirmation**.
3. Choose the principal's **Contact person**, or choose **Other address** and fill in the **Email**.
4. Click **Send**.

The principal receives an email with a link. The link is valid for 14 days. **Send again** creates a new link and withdraws the previous one; **Withdraw** invalidates the link without sending a new one.

The confirmation describes the assignment: the file number, the survey type, the vessel, the port, the date, the principal's reference, the rate and the description. The rate comes from the accepted quotation, otherwise from the framework agreement with the principal, otherwise from the office's rates. → [Rates](tarieven.md)

## What the principal sees

The link opens a page with the assignment and the general terms and conditions, in four languages. The principal types their full name, ticks that they agree, and clicks **Confirm the assignment**. They can also choose **I do not confirm this assignment**. After that, the link no longer works.

If the principal has access to the client portal, they see the same confirmation with the file and can also confirm or decline there. → [How do I give a principal access to the client portal?](hoe/klantenportaal.md)

## The status of the file

- **Not sent**: no confirmation has been sent yet.
- **Sent**: the principal has not replied yet.
- **Accepted**: with the name the principal typed, the time, the channel (via the link or in the client portal) and the version of the terms.
- **Declined**: the principal does not confirm this assignment. Get in touch and, if needed, send a new confirmation.
- **Expired**: the link expired after 14 days without a reply.
- **Withdrawn**: the office withdrew the link.
- **Confirmed by quotation** or **Confirmed by request**: the file was created from a quotation the principal accepted, or from a request in the client portal. A separate confirmation is then not needed. → [Quotations](offertes.md), [Requests](aanvragen.md)

Every acceptance or refusal also appears as a note in the file's journal.

## What is kept

Quaymark keeps what the principal was shown (the assignment and the version of the terms, with a fingerprint), and for a reply through the link the name, the time, the IP address, the browser and the fingerprint of the page shown. In the client portal, it is the principal's account. All of this is only added, never changed. If a file is deleted after its retention period, its confirmation goes with it. → [Retention periods](bewaartermijnen.md)

## Issuing a report without a confirmation

If the file has no accepted confirmation, the **Report** tab shows a warning. When issuing, Quaymark asks for a **Justification**: why are you issuing the report anyway? It is kept with your name and the time, and then appears in the **Order confirmation** box. Click **Continue issuing** to go on. → [Files](dossiers.md)

## See also

- [Files](dossiers.md)
- [Quotations](offertes.md)
- [Rates](tarieven.md)
