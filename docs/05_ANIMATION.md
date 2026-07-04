# ANIMATION.md

# Motion Design System

Version 1.0

---

# Overview

Animation is used to enhance storytelling and user experience.

Every animation should feel elegant, smooth, natural, and luxurious.

Avoid excessive or distracting effects.

The goal is to create a cinematic wedding invitation.

---

# Animation Library

Primary

- Framer Motion

Secondary

- CSS Animation

Use GSAP only when Framer Motion cannot achieve the desired effect.

---

# Motion Principles

Every animation should be

- Smooth
- Soft
- Elegant
- Purposeful
- Consistent

Never animate just for decoration.

---

# Timing

Fast

200ms

Normal

300ms

Slow

500ms

Hero

800ms

Page Transition

1000ms

---

# Easing

Use

easeInOut

easeOut

circOut

anticipate

Avoid linear animation.

---

# Section Animation

Each section should

Fade In

+

Move Up

20-40px

Animation starts when section enters viewport.

---

# Hero Animation

Animate

- Background Video
- Title
- Subtitle
- Date
- Button

Order

Background

↓

Title

↓

Subtitle

↓

Button

---

# Opening Screen

Animate

Logo

↓

Guest Name

↓

Couple Name

↓

Open Invitation Button

↓

Fade Out

↓

Unlock Scroll

↓

Start Music

---

# Scroll Animation

Use

whileInView

viewport once

Margin 20%

Avoid repeated animations.

---

# Stagger Animation

Use stagger for

Gallery

Cards

Timeline

Event Cards

Gift Cards

---

# Hover Animation

Buttons

Lift

Scale

1.02

Cards

Scale

1.02

Images

Zoom

1.05

Icons

Rotate slightly

---

# Floating Elements

Allowed

Flowers

Leaves

Particles

Glow

Keep movement subtle.

---

# Page Transition

Fade

+

Blur

+

Scale

Duration

600-1000ms

---

# Gallery

Images

Fade

Zoom

Videos

Fade

Scale

---

# Modal

Fade

Scale

Backdrop Blur

---

# Theme Switch

Animate

Color

Background

Icon Rotation

Duration

300ms

---

# Loading Screen

Fade In

Logo Reveal

Glow

Fade Out

---

# Music Button

Rotate

Scale

Pulse when playing

---

# Countdown

Animate numbers smoothly.

Avoid flipping animations.

---

# Timeline

Reveal each item while scrolling.

Alternate left and right on desktop.

Stack vertically on mobile.

---

# Background Video

Fade only.

Never zoom continuously.

---

# Reduced Motion

Respect

prefers-reduced-motion

Disable

Parallax

Floating

Heavy Motion

---

# Performance

Prefer transform

Use opacity

Avoid layout shifts

Avoid animating width/height

Use GPU-friendly properties

---

# Accessibility

Animations should never block interaction.

Users should always be able to navigate while animations are running.

---

# Motion Components

Reusable

- FadeIn
- FadeUp
- FadeDown
- ScaleIn
- SlideLeft
- SlideRight
- RevealText
- StaggerContainer
- FloatingElement
- PageTransition

---

# Animation Checklist

✓ Smooth

✓ Responsive

✓ Accessible

✓ Reusable

✓ Lightweight

✓ Theme Compatible

✓ Mobile Friendly

✓ Performance Optimized

---

# Final Principle

Animation should support the story,
not distract from it.

Every transition should feel calm,
romantic,
and premium.