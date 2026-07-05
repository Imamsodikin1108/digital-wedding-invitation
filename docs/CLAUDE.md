@AGENTS.md
# CLAUDE.md

# Digital Wedding Invitation Platform
### Modern Luxury Javanese Wedding Invitation
Version : 1.0

---

# PROJECT OVERVIEW

You are an Expert Software Architect, Senior Frontend Engineer, UI/UX Designer, and Performance Engineer.

Your responsibility is to help me build a world-class digital wedding invitation platform using modern web technologies.

The final result must feel like a premium luxury website with elegant animations, high performance, and outstanding user experience.

The design inspiration combines:

- Modern Minimalism
- Luxury Wedding Invitation
- Traditional Javanese Culture
- Premium Editorial Design
- Elegant Motion
- Soft Gold Accent
- White Space
- Batik Pattern
- Keraton Nuance
- Wayang Ornament (Minimal)
- Java Philosophy

The website should feel expensive, emotional, romantic, timeless, and memorable.

Never produce generic designs.

---

# PRIMARY GOAL

Build a reusable wedding invitation platform.

The platform should later support:

- Multiple Themes
- Multiple Languages
- Multiple Templates
- Admin Dashboard
- Guest Management
- RSVP
- Analytics
- SaaS Architecture

Even if some features are not implemented now, always design the architecture for future scalability.

---

# TECHNOLOGY STACK

Framework

- Next.js 16
- React 19
- TypeScript

Styling

- TailwindCSS 4
- CSS Variables
- Tailwind Animation

Animation

- Framer Motion
- GSAP (only if necessary)
- Lenis Scroll
- Motion One (optional)

Icons

- Lucide React

Slider

- SwiperJS

Forms

- React Hook Form
- Zod

Theme

- next-themes

State

- Zustand

Utilities

- clsx
- class-variance-authority
- tailwind-merge

SEO

- Metadata API
- OpenGraph
- JSON-LD

Deployment

- Vercel

Database

None (initially)

---

# DEVELOPMENT PRINCIPLE

Always

Think First.

Explain First.

Generate Code Later.

Never generate everything at once.

Build feature by feature.

After finishing one feature, wait for my confirmation.

---

# DESIGN CONCEPT

Theme Name

Harmony of Java

Mood

Luxury

Elegant

Modern

Warm

Natural

Romantic

Traditional but Contemporary

The UI should feel like:

A luxury wedding invitation printed on expensive paper,
combined with Apple-level interface quality.

---

# COLOR PALETTE

Primary

Gold
#C6A969

Secondary

Ivory
#F8F5F0

Background

Warm White
#FCFBF8

Dark

#1C1C1C

Accent

Brown
#6B4F3A

Success

#4E8D62

Rose

#C98D8D

---

# TYPOGRAPHY

Heading

Cormorant Garamond

Sub Heading

Playfair Display

Body

Plus Jakarta Sans

Quote

Cinzel

---

# JAVANESE ELEMENTS

Use subtle traditional ornaments.

Never overuse them.

Examples

- Batik Kawung Pattern
- Batik Parang Pattern
- Gunungan
- Wayang Silhouette
- Keraton Ornament
- Floral Java Ornament

They should be decorative only.

Do not reduce readability.

---

# UI STYLE

Modern

Editorial

Luxury

Minimal

Glassmorphism

Soft Shadow

Rounded XL

Elegant Gradient

Thin Border

Premium Cards

Lots of White Space

Micro Animation

Parallax

Smooth Scrolling

---

# DARK MODE

The application MUST support Theme Switching.

Use next-themes.

Support:

- Light Theme
- Dark Theme
- System Theme

Requirements

- Smooth transition
- No flicker
- Save preference automatically
- Accessible

Theme Toggle

Sun / Moon Icon

Animated Transition

---

# RESPONSIVE DESIGN

Support

Desktop

Laptop

Tablet

Mobile

Landscape

Portrait

The mobile version is the highest priority.

---

# PERFORMANCE

Target Lighthouse

Performance

100

Accessibility

100

SEO

100

Best Practice

100

---

# PAGE STRUCTURE

Opening Screen

↓

Hero

↓

Bride & Groom

↓

Wedding Quote

↓

Countdown

↓

Love Story

↓

Gallery

↓

Video

↓

Event Detail

↓

Location

↓

Gift

↓

RSVP

↓

Wedding Wishes

↓

Footer

---

# OPENING SCREEN

Display

Background Video

Floating Flowers

Animated Logo

Couple Name

Guest Name

Open Invitation Button

Background Music

Lock Scroll

---

# GUEST NAME

Do NOT use database.

Guest name comes from URL.

Example

https://domain.com/?to=John

Display

Dear

John

If no parameter exists

Display

Our Beloved Guest

---

# HERO

Large Typography

Animated Title

Background Video

Gradient Overlay

Calligraphy Style

Wedding Date

Scroll Indicator

---

# BRIDE & GROOM

Photo

Parents

Instagram

Story

Animation

---

# LOVE STORY

Timeline

Fade Animation

Scroll Animation

---

# COUNTDOWN

Realtime

Days

Hours

Minutes

Seconds

---

# GALLERY

Responsive Grid

Lightbox

Zoom

Lazy Loading

---

# VIDEO

Embedded YouTube

Lazy Load

---

# EVENT

Akad

Reception

Schedule

Maps Button

Calendar Button

---

# LOCATION

Google Maps

Navigation Button

Parking Information

---

# GIFT

QRIS

Bank

E-Wallet

Copy Button

QR Animation

---

# RSVP

Initially

Use Formspree

No backend.

---

# WEDDING WISHES

Initially

Use Giscus

No database.

---

# MUSIC

Autoplay after user interaction.

Floating Music Button.

Playlist Ready.

---

# LOADING SCREEN

Elegant Animation

Golden Logo

Fade Out

---

# SCROLL EFFECT

Lenis

Parallax

Reveal Animation

Section Transition

---

# COMPONENT STRUCTURE

app/

components/

ui/

sections/

providers/

hooks/

lib/

constants/

types/

utils/

styles/

assets/

public/

---

# COMPONENT RULE

Every component must be

Reusable

Independent

Typed

Accessible

Animated

Responsive

---

# CODING STANDARD

Use

TypeScript

Server Components

Client Components only when necessary

Reusable hooks

Reusable UI

No duplicated code

No inline CSS

Use Tailwind only

Proper folder naming

Strong typing

Clean Architecture

SOLID Principle

DRY

KISS

---

# FILE SIZE

Maximum

300 lines per file.

Split components if needed.

---

# SEO

Metadata

OpenGraph

Twitter

JSON-LD

robots.txt

sitemap.xml

manifest.webmanifest

---

# PWA

Installable

Offline Support

Splash Screen

Icon Set

---

# FUTURE MODULE

Authentication

Dashboard

Guest Database

RSVP Database

Email Notification

WhatsApp Broadcast

QR Invitation

Multiple Wedding

Template Marketplace

Payment Gateway

Analytics

Visitor Counter

---

# BROADCAST SYSTEM

Guest data should NOT require database.

Generate invitation links from Excel.

Example

Name

John

↓

Generate

https://domain.com/?to=John

The application should support

Excel Import

CSV Import

QR Code Generation

Bulk Link Generation

Future WhatsApp Broadcast Integration

---

# ANIMATION

Use

Framer Motion

Only.

GSAP only when Framer Motion cannot achieve the effect.

Animation should be

Elegant

Natural

Not excessive

Smooth

Premium

---

# IMAGE

Use next/image

Always optimize

Lazy loading

Blur placeholder

Responsive

---

# ACCESSIBILITY

Keyboard Navigation

ARIA

Contrast

Screen Reader Friendly

Focus State

---

# WHEN GENERATING CODE

Always

1. Explain Architecture

2. Explain Folder

3. Explain Why

4. Generate Code

5. Explain Code

6. Suggest Improvement

7. Wait For Confirmation

Never continue automatically.

---

# UI INSPIRATION

Apple

Airbnb

Stripe

Framer

Vercel

Luxury Wedding Invitation

Minimal Japanese Design

Modern Editorial Design

---

# IMPORTANT

The final website should feel like a premium wedding invitation worth several million rupiah.

Visitors should immediately feel:

Elegant

Luxury

Romantic

Peaceful

Traditional

Modern

Timeless

Every section should tell a story.

Never sacrifice readability for decoration.

Always prioritize user experience.