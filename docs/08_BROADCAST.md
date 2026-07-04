# BROADCAST.md

# Guest Broadcast System

Version 1.0

---

# Overview

The invitation platform must support broadcasting invitations
to thousands of guests without requiring a database.

Guest names are dynamically rendered from URL parameters.

The system should be lightweight, scalable, and privacy-friendly.

---

# Goals

- No database required
- Fast link generation
- Easy WhatsApp sharing
- Excel compatible
- CSV compatible
- QR Code ready
- Future SaaS ready

---

# URL Structure

Default

https://domain.com/?to=John%20Doe

Alternative

https://domain.com/invitation/john-doe

Future

https://domain.com/i/ABC123XYZ

---

# Guest Name

Read guest name from URL.

Example

?to=John Doe

Display

Dear

John Doe

If no parameter exists

Display

Our Beloved Guest

---

# URL Encoding

Always encode guest names.

Example

John Doe

↓

John%20Doe

Never manually concatenate URLs.

Always use URL encoding.

---

# Guest Data

Initially

Guest names are cosmetic only.

No guest information is stored.

No tracking required.

---

# Excel Import

Support Excel file.

Columns

Guest Name

Category

Phone Number

Notes

---

# CSV Import

Support UTF-8 CSV.

Automatically generate invitation links.

---

# Generated Output

Guest

John Doe

↓

Invitation

https://domain.com/?to=John%20Doe

---

# Bulk Link Generator

Generate invitation links automatically.

Output

- Excel
- CSV
- TXT

---

# QR Code

Generate QR Code for every guest.

QR should contain

Invitation URL

Example

https://domain.com/?to=John%20Doe

---

# WhatsApp Broadcast

Message Template

Hello {{guest}}

You are invited to our wedding.

Open your invitation here:

{{link}}

Thank you.

---

# Personalization

Support placeholders

{{guest}}

{{link}}

{{date}}

{{location}}

{{couple}}

---

# Broadcast Flow

Import Excel

↓

Generate Links

↓

Generate QR

↓

Preview

↓

Export

↓

Broadcast

---

# Validation

Remove empty names.

Trim spaces.

Prevent duplicate URLs.

Encode all parameters.

---

# Link Format

Readable

https://domain.com/?to=John%20Doe

Future Short Link

https://domain.com/i/a8Gk2P

---

# Security

Guest names are display-only.

Never expose sensitive data.

Do not include

- Phone number
- Address
- Email
- Internal notes

inside URL.

---

# Future Features

Support encrypted invitation IDs.

Support signed URLs.

Support expiration dates.

Support invitation tokens.

---

# Analytics (Future)

Track

- Open Count
- Device
- Browser
- Country
- RSVP Conversion

Analytics must be optional.

---

# Performance

Generate thousands of links within seconds.

Avoid unnecessary server requests.

Perform generation on the client when possible.

---

# File Export

Support

Excel (.xlsx)

CSV

TXT

JSON

---

# QR Export

PNG

SVG

PDF (Future)

---

# Broadcast Checklist

✓ URL Encoded

✓ Guest Name Displayed

✓ No Database

✓ Mobile Friendly

✓ WhatsApp Ready

✓ QR Ready

✓ Excel Ready

✓ CSV Ready

✓ Privacy Friendly

---

# Final Principle

Broadcasting invitations should be simple, fast,
and require no backend infrastructure.

The platform should allow users to prepare,
generate, and distribute invitations efficiently,
while keeping guest data private and secure.