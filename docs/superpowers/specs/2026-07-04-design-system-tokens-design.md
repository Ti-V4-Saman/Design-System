# Design System Tokens — CRM V4

**Date:** 2026-07-04
**Status:** Approved

---

## Context

Replacing the neutral placeholder tokens in `app/globals.css` with the CRM V4 brand token set. The design reference was extracted from a working prototype (CRM V4). The text spec is the source of truth; the screenshot was a visual reference only.

---

## Brand direction

- **Fully green-centric.** No blue anywhere in the system.
- **Primary action color:** teal-green `#00B393` (Primary 500).
- **Info states:** neutral/green-based surface — not blue, not purple.
- **Purple:** reserved only for a specific "Review" badge status if needed. Not a semantic global token.
- **Font:** Inter (replacing Geist Sans). Geist Mono stays for code/labels.

---

## Color tokens

### Primary scale

| Step | Hex | OKLCH (approx) |
|------|-----|----------------|
| 50 | `#E6F7F1` | `oklch(0.97 0.025 164)` |
| 100 | `#C2ECDD` | `oklch(0.92 0.055 164)` |
| 200 | `#99E0C7` | `oklch(0.87 0.09 163)` |
| 300 | `#66D2AC` | `oklch(0.80 0.12 165)` |
| 400 | `#33C494` | `oklch(0.74 0.14 163)` |
| **500** | **`#00B393`** | **`oklch(0.68 0.14 168)`** ← primary |
| 600 | `#009A80` | `oklch(0.60 0.12 168)` |
| 700 | `#007A66` | `oklch(0.49 0.10 168)` |
| 800 | `#005C4D` | `oklch(0.38 0.08 168)` |
| 900 | `#003D33` | `oklch(0.26 0.055 168)` |

### Neutral scale

| Step | Hex |
|------|-----|
| 0 | `#FFFFFF` |
| 50 | `#F9F9F9` |
| 100 | `#F5F5F5` |
| 200 | `#F2F2F2` |
| 300 | `#E9ECEF` |
| 500 | `#7B8190` |
| 700 | `#4E5E6A` |
| 900 | `#202124` |

### Semantic colors

| Name | Hex | Purpose |
|------|-----|---------|
| success | `#01B393` | Completed / positive states |
| warning | `#FFB822` | Amber — pending/attention |
| warning-alt | `#FAC108` | Chart / alt warning use |
| destructive | `#F5325C` | Error / danger |
| info | neutral-50 tinted | Informational surface (see below) |

### Info token approach

Info uses a neutral/green-based surface. No bold new accent color.

```
--info:            neutral-50 with green undertone  (#F9F9F9 tinted)
--info-foreground: neutral-700 text  (#4E5E6A)
icon color:        text-primary (brand green #00B393)
border:            primary-200 (#99E0C7)
```

---

## shadcn token mapping

### `:root` (light mode)

```
--background:             #FFFFFF
--foreground:             #202124
--card:                   #FFFFFF
--card-foreground:        #202124
--popover:                #FFFFFF
--popover-foreground:     #202124
--primary:                #00B393  →  oklch(0.68 0.14 168)
--primary-foreground:     #FFFFFF
--secondary:              #F5F5F5  →  neutral-100
--secondary-foreground:   #202124
--muted:                  #F5F5F5
--muted-foreground:       #7B8190  →  neutral-500
--accent:                 subtle green-tinted grey
--accent-foreground:      #202124
--destructive:            #F5325C  →  oklch(0.56 0.22 15)
--success:                #01B393  →  oklch(0.68 0.14 168)
--success-foreground:     #FFFFFF
--warning:                #FFB822  →  oklch(0.81 0.16 75)
--warning-foreground:     dark amber text
--info:                   oklch(0.97 0.012 164)  ← neutral-50 green-tinted
--info-foreground:        oklch(0.38 0 0)         ← neutral-700
--border:                 #E9ECEF  →  neutral-300
--input:                  #E9ECEF
--ring:                   #00B393  (primary green for focus rings)
--radius:                 0.35rem  (≈5px, matching spec md=5px)
```

### Chart colors

Visually distinct, no blue:
1. primary green (`#00B393`)
2. primary-300 (`#66D2AC`)
3. warning amber (`#FFB822`)
4. danger red (`#F5325C`)
5. neutral grey

### Sidebar tokens

```
--sidebar:                   neutral-50 (#F9F9F9)
--sidebar-primary:           primary green
--sidebar-accent:            subtle green-tinted grey
```

### Dark mode (`.dark`)

- Background: `#202124` (neutral-900)
- Cards: slightly lighter dark surface
- Primary: brightened slightly (~L 0.73) for contrast on dark backgrounds
- Semantic colors: lightened for visibility
- Info: dark neutral surface with green-tinted undertone

---

## Shadows

Added as CSS custom properties (not Tailwind tokens):

```css
--shadow-card:     0 0 15px rgb(0 0 0 / 0.10);
--shadow-dropdown: 0 5px 15px rgb(0 0 0 / 0.20);
--shadow-modal:    0 0 30px rgb(0 0 0 / 0.30);
```

---

## Radius scale

Base: `--radius: 0.35rem`

| Token | Calc | Approx |
|-------|------|--------|
| `radius-sm` | `0.6 × base` | ~3px |
| `radius-md` | `0.8 × base` | ~4.5px |
| `radius-lg` | `1.0 × base` | ~5.6px |
| `radius-xl` | `1.4 × base` | ~7px |
| `radius-2xl` | `1.8 × base` | ~10px |

Pill (25px) is applied directly in badge components via `rounded-full` or a fixed class.

---

## Typography

- **Font:** Inter (via `next/font/google`) → replaces Geist Sans
- **Mono:** Geist Mono → stays (code, labels)
- **Variable:** `--font-sans` (unchanged name)

---

## What is NOT changing

- `@theme inline` block structure in `globals.css`
- All `--color-*` Tailwind variable mappings
- Styleguide pages, layout, navigation (already wired)
- Installed shadcn components (button, card, badge, alert, radio-group)

---

## Constraints

- No blue anywhere in the system
- No purple as a default semantic token
- Purple (`#AD159E`) available only as a named status value for "Review" badges, not in globals.css
