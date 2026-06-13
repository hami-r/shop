---
name: Al Miaraj Luxury Boutique
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#404944'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#707974'
  outline-variant: '#bfc9c3'
  surface-tint: '#2b6954'
  primary: '#003527'
  on-primary: '#ffffff'
  primary-container: '#064e3b'
  on-primary-container: '#80bea6'
  inverse-primary: '#95d3ba'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#2e2f27'
  on-tertiary: '#ffffff'
  tertiary-container: '#44453d'
  on-tertiary-container: '#b2b2a8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f0d6'
  primary-fixed-dim: '#95d3ba'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#0b513d'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e4e3d7'
  tertiary-fixed-dim: '#c7c7bc'
  on-tertiary-fixed: '#1b1c15'
  on-tertiary-fixed-variant: '#46473f'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md-mobile:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.5'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
---

## Brand & Style
The design system is anchored in the concept of "Modern Heritage." It targets a discerning clientele in Sharjah and the wider UAE who value both traditional Arabian scents (Bukhoor and Oud) and contemporary cosmetic standards. 

The aesthetic is **Luxurious Minimalism**. It avoids the clutter of traditional e-commerce in favor of a curated, gallery-like experience. The UI should evoke a sense of calm, hospitality, and premium quality. By utilizing generous whitespace (cream/ivory) and high-contrast accents (emerald and gold), the design system bridges the gap between ancient ritual and modern beauty. 

Key visual principles:
- **Refined Opulence:** Gold is used sparingly as a "light" source, not a primary fill.
- **Bilingual Fluidity:** The layout is architected to be perfectly symmetrical when flipped from LTR (English) to RTL (Arabic).
- **Tactile Grace:** Interactions should feel smooth and deliberate, mimicking the physical experience of a boutique.

## Colors
The palette is inspired by the landscapes and materials of the Emirates.

- **Primary (Deep Emerald):** `#064E3B`. Represents luxury, growth, and the depth of traditional perfume oils. Used for primary buttons, headers, and active states.
- **Secondary (Gold):** `#D4AF37`. A muted, sophisticated metallic gold. Used for icons, borders, call-to-actions, and accents to signify premium quality.
- **Base (Cream/Ivory):** `#FDFCF0`. The primary background color. It is warmer and softer than pure white, reducing eye strain and feeling more "organic."
- **Neutral (Carbon):** `#1A1A1A`. Used for high-legibility body text and deep shadows to provide grounding for the lighter elements.

## Typography
The typography strategy employs a "High-Low" pairing. 

**Headlines (Playfair Display):** This serif font provides the editorial, "vogue" feel necessary for cosmetics and perfumes. It scales beautifully in both English and supports the dramatic flair required for high-end boutique branding.

**Body & UI (Plus Jakarta Sans):** A modern, clean sans-serif with excellent legibility at small sizes. Its slightly rounded terminals complement the "Soft" shape language of the design system.

**Bilingual Handling:** 
- For Arabic text, ensure the line-height is increased by 20% compared to English to accommodate the taller ascenders and descenders of the script.
- Maintain optical alignment; serif headlines in Arabic should use a high-contrast Naskh-style typeface if Playfair is not available for the specific character set.

## Layout & Spacing
The layout follows a **Fluid-Fixed Hybrid** model. On desktop, content is contained within a 1200px max-width to maintain the "boutique" editorial feel. On mobile, a 2-column grid is the standard for product listings to maximize visual discovery.

**Grid Philosophy:**
- Use an 8px base unit for all spacing.
- **Mobile (0-768px):** 4-column grid, 20px side margins. Product cards typically span 2 columns.
- **Desktop (1024px+):** 12-column grid, 64px side margins. 

**Bilingual Logic:**
- All layouts must support `dir="rtl"`. 
- Padding-left becomes padding-right. 
- Icons indicating direction (like "next" arrows) must be mirrored.

## Elevation & Depth
This design system uses **Tonal Layering and Soft Ambient Shadows** to create depth without appearing "heavy."

1.  **Level 0 (Base):** The Cream background (`#FDFCF0`).
2.  **Level 1 (Cards/Surface):** White surfaces with a very soft, diffused shadow (15% opacity of the Primary Emerald color, blurred 20px). This gives the impression that items are floating slightly above a silk surface.
3.  **Glassmorphism:** Navigation bars and "Quick Buy" drawers should use a backdrop blur (12px) with a 70% transparent Cream fill to maintain context of the products behind them.

## Shapes
The shape language is organic and welcoming.
- **Containers & Product Cards:** Utilize `rounded-2xl` (1.5rem / 24px) to create a soft, premium feel.
- **Buttons:** Fully pill-shaped for "Add to Cart" or "WhatsApp" actions to invite touch.
- **Inputs:** `rounded-lg` (1rem / 16px) for a structured yet soft form appearance.
- **Images:** Always clipped with the container radius to ensure a consistent silhouette.

## Components

### Product Cards
The centerpiece of the boutique. High-aspect ratio images (4:5) with the product centered. Typography is stacked below: Label (Category) in Gold, Title in Primary Emerald, and Price in a subtle neutral. A "Quick Purchase" floating button (Gold) appears on hover/tap.

### Purchase Flow (WhatsApp/Instagram)
Since Al Miaraj operates as a boutique, the primary CTA is not a traditional checkout but a "Purchase via WhatsApp" or "Inquire on Instagram" button.
- **WhatsApp Button:** Primary Emerald background, white text, featuring the WhatsApp icon.
- **Instagram Button:** Secondary Gold outline (ghost button style).

### Buttons
- **Primary:** Deep Emerald background, White text, Pill-shaped. High-density shadow on hover.
- **Secondary:** Gold border, Emerald text, no fill.
- **Tertiary:** Pure text with a Secondary Gold underline (2px).

### Input Fields
Soft Cream background, slightly darker than the page base. On focus, the border transitions to a 1px Gold stroke.

### Bilingual Toggle
A minimalist text switch (EN | AR) located in the top right (LTR) or top left (RTL), using the `label-sm` typography style.