# Design System Tokens Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the neutral placeholder tokens in `app/globals.css` with the CRM V4 brand token set and swap the font from Geist Sans to Inter.

**Architecture:** Two-file change — globals.css gets all new token values (light + dark mode), layout.tsx gets the Inter font import. The `@theme inline` block and structural shell stay intact; only the CSS variable *values* inside `:root` and `.dark` change.

**Tech Stack:** Next.js 16, Tailwind CSS v4, shadcn/ui, `next/font/google`

## Global Constraints

- No blue anywhere in the system — not in tokens, not in comments
- No purple as a default semantic global token
- Primary 500 source of truth: `#00B393` (OKLCH approximation is acceptable)
- Info token: neutral/green-based surface — `oklch(0.97 0.012 164)` background, `oklch(0.42 0.02 240)` foreground
- Font: Inter replaces Geist Sans; Geist Mono stays for `--font-geist-mono`
- All values in OKLCH (current project convention)
- `@theme inline` block must not be structurally altered — only values inside `:root` / `.dark` change

---

### Task 1: Replace light-mode tokens in `app/globals.css`

**Files:**
- Modify: `app/globals.css` — the `:root { }` block only

**Interfaces:**
- Produces: all `--*` CSS variables with CRM V4 values, consumed by every component via Tailwind utility classes

- [ ] **Step 1: Open `app/globals.css` and locate the `:root` block (lines 57–96)**

The current block contains neutral placeholder values (all `oklch(... 0 0)`). Replace the entire `:root { }` block with:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.19 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.19 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.19 0 0);
  --primary: oklch(0.68 0.14 168);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.19 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.54 0.01 260);
  --accent: oklch(0.95 0.008 164);
  --accent-foreground: oklch(0.19 0 0);
  --destructive: oklch(0.56 0.22 15);
  --success: oklch(0.68 0.14 168);
  --success-foreground: oklch(1 0 0);
  --warning: oklch(0.81 0.16 75);
  --warning-foreground: oklch(0.25 0.05 75);
  --info: oklch(0.97 0.012 164);
  --info-foreground: oklch(0.42 0.02 240);
  --border: oklch(0.94 0.005 260);
  --input: oklch(0.94 0.005 260);
  --ring: oklch(0.68 0.14 168);
  --chart-1: oklch(0.68 0.14 168);
  --chart-2: oklch(0.80 0.12 165);
  --chart-3: oklch(0.81 0.16 75);
  --chart-4: oklch(0.56 0.22 15);
  --chart-5: oklch(0.54 0 0);
  --radius: 0.35rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.19 0 0);
  --sidebar-primary: oklch(0.68 0.14 168);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.95 0.008 164);
  --sidebar-accent-foreground: oklch(0.19 0 0);
  --sidebar-border: oklch(0.94 0.005 260);
  --sidebar-ring: oklch(0.68 0.14 168);
  --shadow-card: 0 0 15px rgb(0 0 0 / 0.10);
  --shadow-dropdown: 0 5px 15px rgb(0 0 0 / 0.20);
  --shadow-modal: 0 0 30px rgb(0 0 0 / 0.30);
}
```

- [ ] **Step 2: Verify the build compiles**

```bash
npm --prefix /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 run build
```

Expected: build succeeds, no CSS errors. If it fails due to unrecognised CSS (e.g. `--shadow-*` not in `@theme inline`), that is fine — shadow variables are custom properties, not Tailwind tokens; they are used as `var(--shadow-card)` in component styles, not as utility classes.

- [ ] **Step 3: Commit**

```bash
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 add app/globals.css
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 commit -m "feat: apply CRM V4 light-mode tokens to globals.css"
```

---

### Task 2: Replace dark-mode tokens in `app/globals.css`

**Files:**
- Modify: `app/globals.css` — the `.dark { }` block only

**Interfaces:**
- Consumes: `:root` block from Task 1 (same file)
- Produces: complete dark-mode override for every token

- [ ] **Step 1: Locate the `.dark { }` block (lines 98–136) and replace it**

```css
.dark {
  --background: oklch(0.19 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.24 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.24 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.73 0.14 168);
  --primary-foreground: oklch(0.10 0 0);
  --secondary: oklch(0.28 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.28 0 0);
  --muted-foreground: oklch(0.65 0.01 260);
  --accent: oklch(0.30 0.008 164);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.65 0.20 15);
  --success: oklch(0.73 0.14 168);
  --success-foreground: oklch(0.10 0 0);
  --warning: oklch(0.85 0.16 75);
  --warning-foreground: oklch(0.25 0.05 75);
  --info: oklch(0.28 0.008 164);
  --info-foreground: oklch(0.85 0 0);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.73 0.14 168);
  --chart-1: oklch(0.73 0.14 168);
  --chart-2: oklch(0.80 0.12 165);
  --chart-3: oklch(0.85 0.16 75);
  --chart-4: oklch(0.65 0.20 15);
  --chart-5: oklch(0.60 0 0);
  --sidebar: oklch(0.24 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.73 0.14 168);
  --sidebar-primary-foreground: oklch(0.10 0 0);
  --sidebar-accent: oklch(0.30 0.008 164);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.73 0.14 168);
  --shadow-card: 0 0 15px rgb(0 0 0 / 0.30);
  --shadow-dropdown: 0 5px 15px rgb(0 0 0 / 0.40);
  --shadow-modal: 0 0 30px rgb(0 0 0 / 0.50);
}
```

- [ ] **Step 2: Verify the build**

```bash
npm --prefix /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 add app/globals.css
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 commit -m "feat: apply CRM V4 dark-mode tokens to globals.css"
```

---

### Task 3: Swap font from Geist Sans to Inter

**Files:**
- Modify: `app/layout.tsx` — import block and font variable only

**Interfaces:**
- Consumes: `--font-sans` CSS variable declared in `@theme inline` (globals.css line 10 — unchanged)
- Produces: Inter font loaded via `next/font/google`, assigned to `--font-sans`

- [ ] **Step 1: Replace the Geist Sans import with Inter in `app/layout.tsx`**

Find:
```tsx
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
```

Replace with:
```tsx
import { Inter, Geist_Mono } from "next/font/google";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
```

- [ ] **Step 2: Update the className reference in the `<html>` tag**

Find:
```tsx
className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
```

Replace with:
```tsx
className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
```

- [ ] **Step 3: Verify the build**

```bash
npm --prefix /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 run build
```

Expected: build succeeds. Next.js fetches Inter from Google Fonts at build time (or uses cached version).

- [ ] **Step 4: Commit**

```bash
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 add app/layout.tsx
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 commit -m "feat: swap font from Geist Sans to Inter"
```

---

### Task 4: Visual verification in the styleguide

**Files:**
- No code changes — this is a verification task only

**Interfaces:**
- Consumes: running dev server at `http://localhost:3000/styleguide`

- [ ] **Step 1: Start the dev server**

```bash
npm --prefix /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 run dev
```

- [ ] **Step 2: Open `http://localhost:3000/styleguide` and verify**

Check each of the following:

| Item | Expected |
|------|----------|
| Primary color swatches | Teal-green, not black/grey |
| Body font | Inter (clean, humanist sans) — not Geist |
| Primary button | Green fill, white text |
| Secondary button | Green border, green text, transparent fill |
| Border radius on cards | Slightly rounded (~5px), not sharp |
| Focus ring on interactive elements | Green ring, not black |
| Success badge/alert | Green |
| Warning badge/alert | Amber |
| Destructive / error | Red |
| Info alert | Neutral-grey surface, green icon |
| Dark mode toggle | Switch to dark — background goes dark, primary stays vivid green |
| No blue anywhere | Scan the entire page |

- [ ] **Step 3: If anything looks wrong, identify which token is incorrect**

Reference the spec at `docs/superpowers/specs/2026-07-04-design-system-tokens-design.md` and correct the value in `app/globals.css`. Run build again to confirm.

- [ ] **Step 4: Commit any corrections**

```bash
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 add app/globals.css
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 commit -m "fix: correct token values after visual review"
```
