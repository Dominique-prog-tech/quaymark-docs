---
description: "The office's measuring instruments with their calibrations: what is valid, what expires soon, and how to correct a mistake."
---

# Measuring instruments

The office's measuring instruments, such as ultrasonic thickness gauges, hydrometers, thermometers and sounding tapes, with their calibrations. A measurement is only as reliable as the instrument it was taken with. Here the office shows which instruments it has and until when they are calibrated.

## Opening the screen

At the bottom of the menu, click **Administration**, then the **Measuring instruments** tile. Only the office administrator sees this screen.

![Measuring instruments with the status of each instrument and Instrument types](images/meetapparatuur-en.png "Measuring instruments")

## The list

- Each row is an instrument: the office's own name (for example *H-03*), the type, the make and model, the serial number and the office.
- **Calibrated on** and **Valid until** come from the calibration that applies: the latest calibration that was not corrected.
- The **Status** says whether the instrument is **Valid**, expires within 30 days (**Expires soon**), has **Expired** or was **Never calibrated**. A calibration without an end date stays valid until the next one.
- Tick **Only what needs attention** to see only what expires, has expired or was never calibrated. An inactive instrument does not count: it is out of service.
- The export button downloads the list as a file.

## Adding an instrument

1. Click **Add instrument**.
2. Choose the **Type** and enter the **Name**: the office's own name, which is also on the instrument.
3. Fill in the **Office**, **Make**, **Model**, **Serial number** and a **Note** if needed.
4. Click **Save**. The record opens on the **Calibrations** tab.

Double-clicking a row opens the instrument's record. What you change on the **General** tab appears in the **History**. **Delete** moves the instrument and its calibrations to the recycle bin.

## Calibrations

![An instrument's record on the Calibrations tab, with a corrected calibration struck through](images/meetapparatuur-kalibraties-en.png "Calibrations")

1. On the **Calibrations** tab, click **Add calibration**.
2. Enter the date under **Calibrated on**, and **Valid until**. If you leave Valid until empty, the calibration applies until the next one.
3. Enter the **Laboratory**, the **Certificate number** and the **Result or deviation**.
4. Choose the certificate under **Certificate (pdf)**: a pdf of 20 MB at most.
5. Click **Save**.

A calibration is only ever **added**: you do not edit or delete it. That way you can always show what applied on a given day. The **Recorded** column says who entered it and when. **PDF** shows the certificate. Quaymark first checks it against its fingerprint (SHA-256): if the file no longer matches, it shows nothing.

### Correcting a mistake

1. Click **⋯** on the row of the wrong calibration, then **Correct**.
2. Enter the **Reason for the correction** and correct the details.
3. Choose a new certificate if needed. If you choose none, the certificate of the replaced calibration is kept.
4. Click **Save**.

The new calibration replaces the wrong one. The wrong one stays in the list, struck through, with **Corrected**, and the reason appears under the new one.

## During a measurement

For the draft survey (under each measurement) and on the **Bunkers** tab (for the soundings before and after) there is a **Measuring instruments** block. There you record which instrument you measured with.

1. Choose the instrument in the list. The types that fit the measurement are at the top (the hydrometer for the draft survey, the thermometer and the sounding tape for the bunkers), each with its status on the day of measurement.
2. Click **Choose instrument**.

Quaymark saves the instrument as it was, with the calibration that applied on the day of measurement: for the bunkers the day of the soundings, for the draft survey the planned day of the file (otherwise the day of choosing). A later calibration or correction does not change that. To refresh it, click **Remove** and choose the instrument again. While the file is open you can remove an instrument; after that it is fixed.

If the calibration had expired, or the instrument had none on that day, a warning appears. Quaymark refuses nothing: on board you must always be able to measure, and the report says honestly how things were.

- **In the report**, under the draft survey or the bunker survey, there is one line per instrument: the type, the name, the make, the model and the serial number, and the calibration with its validity and certificate number, or that it had expired. The line comes with the markers `{{draftsurvey}}` and `{{bunker}}`: if your template does not show them yet, add them (see [Templates](sjablonen.md)).
- **In the evidence package**, the folder `meetapparatuur/` holds the certificate (pdf) of each calibration used, with an overview in `meetapparatuur.json` and `meetapparatuur.csv`.

## The bell

Whoever manages the measuring instruments gets a notification on the bell at the top right for each active instrument that needs attention: the calibration expires within 30 days, has expired, or the instrument was never calibrated. A click opens the instrument on the **Calibrations** tab. A notification you have seen stays hidden until something changes: a new calibration, or a calibration that has expired in the meantime. An inactive instrument reports nothing. → [Messages](berichten.md#the-bell)

## Instrument types

Next to the list you manage the office's **types**: a code (lowercase letters, digits and _), the name in four languages, active and the order. The code is fixed once the type is saved, because instruments refer to it. You fix a typo with a new type and set the wrong one to inactive. A new office starts with five types: ultrasonic thickness gauge, hydrometer/densimeter, thermometer, sounding/ullage tape and other instrument.

## See also

- [Qualifications](bevoegdheden.md)
- [Survey types](soorten-survey.md)
