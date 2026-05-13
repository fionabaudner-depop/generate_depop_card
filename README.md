# Generate Depop Card — Interactive Prototype

An interactive Next.js + TypeScript prototype based on the Figma design
[Payments 2026 / Generate card](https://www.figma.com/design/rmaitBqoYuLO9GMLo93Aek/Payments-2026?node-id=13660-41245).

## Flow

1. **Vibe picker** — pick your Depop vibe (or "Help me choose").
2. **Generating** — short loading state with playful copy.
3. **Generated card** — personalised card visual, tagline, and unlocked perks.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- CSS Modules (mobile-first, no design-system dependency)

## Get started

```bash
npm install
npm run dev
```

Open http://localhost:3000 — the prototype is framed inside an iPhone shape on
desktop and goes full-bleed on mobile widths.

## Project structure

```
app/
├── page.tsx                # State machine: picker → generating → result
├── layout.tsx
├── globals.css             # Design tokens (subset of Thrift)
├── lib/vibes.ts            # Vibe definitions: image, gradient, perks
└── components/
    ├── PhoneFrame.tsx      # iPhone-shaped stage
    ├── StatusBar.tsx       # 09:41 + signal / wifi / battery
    ├── HomeIndicator.tsx
    ├── VibePicker.tsx      # 1:1 with the Figma frame
    ├── Generating.tsx      # Spinner + rotating microcopy
    └── ResultCard.tsx      # Animated, vibe-themed card + perks
```

## Notes on design fidelity

- Spacing, radii, and font weights map to the Thrift tokens visible in the
  selected Figma frame (`spacing/medium`, `radius/small`, `font/size/xLarge`, …).
- Card images are exported from the Figma file and live under `public/images/`.
- The CTA matches the Thrift primary button: `--colour-surface-button-primary-enabled` on a 22px pill radius.
