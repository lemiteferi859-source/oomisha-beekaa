---
name: AgriVision Ethiopia
colors:
  surface: '#f8f9ff'
  surface-dim: '#d0dbed'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fc'
  surface-container-highest: '#d9e3f6'
  on-surface: '#121c2a'
  on-surface-variant: '#404940'
  inverse-surface: '#27313f'
  inverse-on-surface: '#eaf1ff'
  outline: '#707a6f'
  outline-variant: '#bfc9bd'
  surface-tint: '#1f6c3a'
  primary: '#004c22'
  on-primary: '#ffffff'
  primary-container: '#166534'
  on-primary-container: '#93e0a2'
  inverse-primary: '#8bd79b'
  secondary: '#006e2f'
  on-secondary: '#ffffff'
  secondary-container: '#6bff8f'
  on-secondary-container: '#007432'
  tertiary: '#533e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#705400'
  on-tertiary-container: '#ffc731'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a6f4b5'
  primary-fixed-dim: '#8bd79b'
  on-primary-fixed: '#00210b'
  on-primary-fixed-variant: '#005226'
  secondary-fixed: '#6bff8f'
  secondary-fixed-dim: '#4ae176'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005321'
  tertiary-fixed: '#ffdf9a'
  tertiary-fixed-dim: '#f7be1d'
  on-tertiary-fixed: '#251a00'
  on-tertiary-fixed-variant: '#5a4300'
  background: '#f8f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f6'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
  numeric-data-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  numeric-data-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system is tailored for an AI-driven agricultural ecosystem serving Ethiopian smallholders, cooperative managers, agronomists, and regional ministry administrators. 

### Brand Personality & Core Mood
- **Grounded Authority & Technological Optimism:** Marries field-level reliability with predictive agricultural intelligence. It conveys data clarity without feeling detached from the soil.
- **Resilient & High-Legibility First:** Engineered for extreme outdoor environments—direct Ethiopian highland sun, low-spec mobile chipsets, and sporadic 3G/EDGE connectivity.
- **Regional Authenticity:** Thoughtfully accommodates local agricultural contexts, integrating Birr (ETB) transactions, local staple crop metrics (Teff, Maize, Coffee, Wheat), and regional administrative boundaries (Oromia, Amhara, Tigray, Sidama, Central Ethiopia, Addis Ababa).

### Design Style Movement
- **Modern Agritech SaaS with Utilitarian Precision:** Combines crisp, structured card containers, unambiguous line borders, high-contrast typography, and purposeful tactile feedback. Skeuomorphic clutter is stripped away in favor of high-yield data visualization, instant-scan diagnostic badges, and ergonomic bottom-anchored mobile controls built for thumb-reach in the field.

## Colors

The color architecture balances botanical depth with field-tested contrast standards (WCAG AAA for primary reading surfaces).

### Palette Strategy
- **Primary Green (`#166534`):** Deep highland green. Signifies established growth, institutional reliability, and primary navigation landmarks.
- **Secondary Vivid Green (`#22C55E`):** Emergent vegetative growth. Used for active health states, high-yield projections, AI diagnostic confirmations, and positive trend vectors.
- **Tertiary Harvest Gold (`#EAB308`):** Golden crop readiness. Dedicated to harvest maturity indices, impending weather warnings, storage moisture thresholds, and high-priority field actions.
- **Neutral Dark Charcoal (`#1F2937`):** Primary text and high-priority data points. Ensures maximum luminance contrast against bright outdoor glare.
- **Neutral Supporting Palette:**
  - Secondary Text: `#4B5563` (Granular metadata, metric units, timestamp labels).
  - Surface Background: `#F8FAF7` (Organic off-white that reduces glare and prevents eye fatigue in sunlight).
  - Elevated Container: `#FFFFFF` (Pure white for cards, sheets, and dialogs).
  - Perimeter Outlines: `#E2E8F0` (Crisp separation lines preventing optical bleeding between densely packed metrics).
  - Critical Alert: `#DC2626` (Pest infestation, crop blight detection, frost warnings).

## Typography

Typography relies entirely on **Inter** to ensure maximum cross-platform rendering efficiency, robust tabular numeric alignment, and exceptional legibility across screen sizes and outdoor lighting variations.

### Typographic Principles
- **Tabular Numerics for Agro-Finances:** Financial balances in Ethiopian Birr (`ETB`) and yield metrics (e.g., `Quintals/Hectare`, `kg/ha`) require proportional lining and tabular figures (`font-variant-numeric: tabular-nums`) to preserve scannability across telemetry tables.
- **High Contrast Scale:** Pure charcoal (`#1F2937`) replaces off-black to preserve edge sharpness without blinding contrast against `#FFFFFF` containers.
- **Mobile Responsive Scale:** Headings automatically scale down below the 640px threshold to prevent awkward wrapping of composite agricultural terms or regional names.

## Layout & Spacing

The layout system adapts across high-density desktop monitoring dashboards (used by cooperative analysts) down to one-handed field mobile viewports (used by smallholder farmers).

### Layout Model
- **Mobile Handheld (360px – 639px):** 4-column fluid layout with an edge margin of `1rem` (`16px`) and gutters of `0.75rem` (`12px`). Interface layout prioritizes a bottom-pinned navigation bar (`64px` height) with thumb-zone ergonomics for field scanning.
- **Tablet & Field Slates (640px – 1023px):** 8-column layout with `1.5rem` margins and `1rem` gutters. Incorporates a collapsible regional side-drawer for switching zones (e.g., Oromia, Amhara, Sidama).
- **Desktop Command (1024px+):** 12-column layout max-width bounded at `1440px` with `2rem` margins and `1rem` gutters. Houses persistent multi-tier navigation and modular diagnostic grids.

### Spacing Cadence
A base unit of `4px` governs all internal paddings and margins. Interactive tap targets (buttons, inputs, bottom navigation actions) maintain a strict minimum bounding box of `48px × 48px` to facilitate error-free input in agricultural environments.

## Elevation & Depth

To maximize usability under sunlight and on low-gamut screens, depth is established using **crisp structural borders (`#E2E8F0`) reinforced by ultra-subtle ambient drop shadows**.

### Elevation Hierarchy
- **Level 0 (Canvas Base):** Flat `#F8FAF7`. Houses inactive backgrounds and structural dividers.
- **Level 1 (Card & Module Layer):** `#FFFFFF` surface with a `1px` solid `#E2E8F0` border and an ambient shadow of `0 1px 3px 0 rgba(31, 41, 55, 0.05)`. Used for telemetry metrics, crop health reports, and yield trackers.
- **Level 2 (Interactive Floating / Active State):** `#FFFFFF` surface with a `1px` solid `#CBD5E1` border and a soft ambient shadow of `0 4px 6px -1px rgba(31, 41, 55, 0.08), 0 2px 4px -2px rgba(31, 41, 55, 0.05)`. Used for dropdown menus, active tooltips, regional filtering drawers, and elevated filter chips.
- **Level 3 (Modal Sheets & Bottom Nav):** `#FFFFFF` surface with an elevated shadow of `0 -4px 12px 0 rgba(31, 41, 55, 0.08)` for mobile bottom bars, and `0 10px 25px -5px rgba(31, 41, 55, 0.1)` for diagnostic image capture sheets and diagnostic overlays.

## Shapes

The geometric identity relies on **Balanced Roundedness (Level 2)**. This strikes an intentional middle ground between modern SaaS software and a reassuring, approachable consumer interface.

### Application Rules
- **Standard UI Controls (`8px` / `rounded`):** Default for primary buttons, form inputs, metric display cards, contextual menus, and regional dropdown triggers.
- **Composite Enclosures (`16px` / `rounded-lg`):** Reserved for primary summary cards, AI diagnosis viewports, interactive satellite map containers, and modal dialogs.
- **Pill Badges (`9999px` / `rounded-full`):** Applied exclusively to status chips (e.g., "Ready for Harvest", "Moisture Optimal"), currency indicators (`ETB`), and image scan indicators.

## Components

### Buttons
- **Primary:** Background `#166534`, text `#FFFFFF`, radius `8px`, min-height `48px`. Hover state shifts to `#14532D`. Pressed state activates `#0F3D21`. Focus rings present a `2px` offset outline in `#22C55E`.
- **Secondary / Action Affirmative:** Background `#22C55E`, text `#FFFFFF`, radius `8px`. Used for high-intent affirmative actions such as "Confirm Planting Schedule" or "Analyze Leaf Sample".
- **Tertiary / Outlined:** Background transparent, border `1.5px` solid `#166534`, text `#166534`.
- **Destructive:** Background `#FEE2E2`, border `1px` solid `#FCA5A5`, text `#991B1B`.

### Status Badges & Chips
- **Harvest Alert / Readiness:** Background `#FEF9C3`, border `1px` solid `#FDE047`, text `#854D0E`, icon indicator tinted in `#EAB308`.
- **Optimal Vitality / Healthy Crop:** Background `#DCFCE7`, border `1px` solid `#86EFAC`, text `#166534`.
- **Critical Alert / Infestation Risk:** Background `#FEE2E2`, border `1px` solid `#FCA5A5`, text `#991B1B`.
- **Filter Chips (Regional / Crop Type):** Radius `9999px`, background `#FFFFFF`, border `1px` solid `#E2E8F0`. When active: background `#166534`, text `#FFFFFF`, border `#166534`.

### Input Fields & Selectors
- **Form Controls:** Height `48px`, background `#FFFFFF`, border `1px` solid `#CBD5E1`, text `#1F2937`, placeholder `#9CA3AF`, radius `8px`. Focus state triggers a `2px` ring in `#166534` with zero layout shift.
- **Regional Administrative Selector:** Top-tier dropdown supporting quick-filtering between Oromia, Amhara, Tigray, Sidama, Central Ethiopia, Addis Ababa, and South Ethiopia Regional States with pre-fixed geographic indicator pins.
- **Currency & Yield Input:** Prefix locked to `ETB` (Ethiopian Birr) or `Qt` (Quintals) in muted bold typography (`#4B5563`), right-aligned numeric entry.

### Cards & Telemetry Displays
- Built using `#FFFFFF` background, `1px` border in `#E2E8F0`, and `16px` padding.
- Metric cards showcase crop icon identifiers (Teff sheaf, Maize cob, Coffee cherry, Wheat spikelet) in a subtle tinted circle (`#F0FDF4`), paired with `numeric-data-lg` numbers and delta indicators.

### Navigation Systems
- **Mobile Bottom App Bar:** Fixed `64px` height at screen bottom, `#FFFFFF` surface with `1px` top border in `#E2E8F0` and Level 3 elevation. Distributes 4 to 5 touch anchors: *Dashboard*, *Diagnostics (AI Camera)*, *Market (ETB)*, *Weather*, and *Regional Hub*. Diagnostic center action features an elevated green badge.
- **Regional Navigation Drawer:** Slides smoothly from left on mobile/tablet viewports, permitting quick switching between farm cooperatives, woreda zones, and kebele clusters.