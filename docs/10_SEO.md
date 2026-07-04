# PERFORMANCE.md

# Performance Guidelines

Version 1.0

---

# Overview

Performance is a core feature.

A beautiful wedding invitation should also be fast.

Every implementation must prioritize loading speed,
smooth interaction, and efficient resource usage.

---

# Performance Target

Lighthouse Score

Performance

100

Accessibility

100

SEO

100

Best Practices

100

---

# Core Web Vitals

Target

LCP < 2.5s

CLS < 0.1

INP < 200ms

TTFB < 800ms

---

# Rendering Strategy

Use Server Components by default.

Use Client Components only when interaction is required.

Avoid unnecessary hydration.

---

# Code Splitting

Always split

Gallery

Video

Maps

Music

Comments

RSVP

Admin

Heavy animations

---

# Lazy Loading

Lazy load

Images

Videos

Gallery

Maps

YouTube

Music

Comments

Below-the-fold sections

---

# Dynamic Import

Use dynamic imports for

Swiper

Lightbox

Video Player

Maps

QR Generator

Music Player

Heavy libraries

---

# Image Optimization

Always use

next/image

Formats

AVIF

WebP

Fallback

JPEG

Rules

- Responsive sizes
- Lazy loading
- Blur placeholder
- Proper aspect ratio
- Avoid oversized images

---

# Video Optimization

Formats

MP4 (H.264)

WebM

Rules

- Poster image
- preload="metadata"
- autoplay muted
- playsInline
- loop
- Lazy load below the fold

Maximum size

Opening Video

3 MB

Hero Video

5 MB

Story Video

5 MB

Closing Video

3 MB

---

# Font Optimization

Use

next/font

Self-host fonts

Avoid loading unused font weights.

Use

font-display: swap

---

# CSS Optimization

Use Tailwind CSS only.

Avoid unused CSS.

Avoid inline styles.

Use CSS Variables.

---

# JavaScript Optimization

Avoid unnecessary state.

Avoid prop drilling.

Memoize expensive calculations.

Use React hooks correctly.

Prefer simple logic.

---

# Animation Performance

Animate only

transform

opacity

Avoid animating

width

height

top

left

margin

Use GPU-friendly animations.

---

# Framer Motion

Use only where it improves UX.

Do not animate every element.

Respect prefers-reduced-motion.

---

# Background Video

Only one autoplay video at a time.

Pause hidden videos.

Unload videos outside the viewport if possible.

---

# Audio

Do not autoplay audio.

Start music only after user interaction.

Pause music when requested.

---

# Network Optimization

Compress assets.

Minify code.

Enable caching.

Use CDN.

Reduce HTTP requests.

---

# Bundle Optimization

Analyze bundle regularly.

Remove unused dependencies.

Import only required modules.

Avoid large libraries.

---

# Third-party Libraries

Use only when necessary.

Review package size before installation.

Avoid duplicate functionality.

---

# SEO Performance

Generate metadata on the server.

Use static rendering whenever possible.

Avoid blocking scripts.

---

# Accessibility

Fast interfaces must also be accessible.

Support keyboard navigation.

Support screen readers.

Respect reduced motion.

---

# Mobile Optimization

Mobile-first design.

Optimize for slow networks.

Test on mid-range devices.

Keep scrolling smooth.

---

# Caching

Use browser caching.

Use immutable assets.

Version static assets when updated.

---

# Error Handling

Gracefully handle

Missing images

Missing videos

Slow network

Offline state (future PWA)

---

# Monitoring

Future support

Vercel Analytics

Core Web Vitals

Performance Dashboard

Error Tracking

---

# Checklist

✓ Server Components first

✓ Client Components only when required

✓ Dynamic imports

✓ Lazy loading

✓ Optimized images

✓ Optimized videos

✓ next/font

✓ Tailwind only

✓ Small bundle size

✓ GPU-friendly animations

✓ Mobile optimized

✓ Lighthouse 95+

---

# Final Principle

Performance is part of the user experience.

Every animation,
every image,
every video,
and every interaction
must be optimized without sacrificing elegance.

A premium invitation should feel both luxurious and effortless.