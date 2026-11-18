---
description: "The survey types the office offers. A new office starts with a catalogue that you adapt or extend."
---

# Survey types

The survey types the office offers. A new office starts with a catalogue that you adapt or extend.

## Opening the screen

At the bottom of the menu, click **Administration**, then the **Survey types** tile.

## The list

- For each type you see the code, the name, the number of **fields** and **checklist items**, the **navigation**, the default report language and whether the type is active.
- Double-click a row to open the type. **New survey type** creates one.
- A type cannot be deleted, because older files refer to it. Set a type you no longer offer to **inactive**.
- **Add inland survey types** only appears when one is missing, with the number in brackets. The button adds the survey types for inland vessels that do not exist yet: barge gauging, valuation, damage, on-hire and off-hire. What is already there stays as it is. A new office has them from the start. To show the barge gauging in the report, add `{{ijkmeting}}` to your report template (see [Templates](sjablonen.md)).

![The Survey types list with the New survey type button](images/soorten-survey-en.png "The survey types")

## Survey type

One survey type: what is entered in the file and what the surveyor goes through on site.

- **General**: code, default report language, order in the lists, active, and the name in the four languages. The code is fixed once files use this type.
- **Four-eyes review**: when ticked, a report of this type is only issued after a second surveyor has approved it. See [Files](dossiers.md#four-eyes-review).
- **Required qualifications**: the qualifications the surveyor must hold validly (for example IIMS or ADR). The schedule and the file warn if not. See [Qualifications](bevoegdheden.md).
- **Retention period (years)**: how long a closed file of this type is kept. Empty = the period of the office's country. See [Retention periods](bewaartermijnen.md).
- **Draft survey**: when ticked, files of this type get the Draft survey tab with initial and final survey. See [Files](dossiers.md#draft-survey).
- **Bunker survey**: when ticked, files of this type get the Bunkers tab with soundings before and after, the delivery note and the calculation to tonnes. See [Files](dossiers.md#bunker-survey).
- **Barge gauging**: when ticked, files of this type get the Gauging tab with the gauge scales before and after and the inland vessel's gauging certificate. See [Files](dossiers.md#barge-gauging).
- **Navigation**: sea-going, inland or both. In a file, the types that match the vessel are listed first, and the file warns for a type meant for the other navigation. It does not refuse.
- **Checklist scale**: **OK / not OK / n/a** for an inspection, or a **condition** (good / fair / poor / bad / n/a) for a condition survey. Existing answers stay as they were given.
- **Fields**: the data a file of this type gets on top of the fixed fields. A field has a **key** (lower-case letters, digits and _, fixed because the field app and reports refer to it), a type (text, number, date, yes/no, choice or table), a label in four languages, a unit and whether it is required. A **table** has columns and optionally fixed rows, for example one row per hold.
- **Checklist**: the items the surveyor answers on site, each with a key, a label, and whether an answer or a photo is required. The link **Standard findings** opens, per saved item, the common deficiencies, each with a finding, a recommendation and a priority, in four languages. The surveyor inserts one into the answer with a tap; an answer already given does not change when you edit them later. New items get the link after **Save**.
- **Sections**: the text blocks of the report (introduction, observations, conclusion …). The surveyor writes them on the Report tab of the file; a report template shows them with the marker in the next column. A new survey type starts with the five standard sections.
- **Work instructions** (own tab): what the surveyor does for this type of assignment, one step per line, in four languages. Every file of this type shows them at the top, in the user's language, with the same placeholders as the [standard texts](standaardteksten.md) filled in.
- **Tabs** (own tab): which tabs a file of this type shows. Findings, checklist, damage, joint survey, signatures, board documents, codes, timeline and laytime can be switched off; laytime is calculated from the timeline and disappears with it. What was already there stays saved (also in the report and the evidence package) and returns as soon as you switch it back on.
- The arrow **↑** moves a field or item up one place. Changes to fields and checklist only count after **Save**.

![The Standard findings page with the columns Finding, Recommendation and Priority](images/standaardbevindingen-en.png "Standard findings")

The **History** tab shows who changed what.

## See also

- [Templates](sjablonen.md)
- [Categories and locations](categorieen-en-plaatsen.md)
