# Design System: Academia Nova (Modern-Antique Claymorphic Learning Platform)
**Specification Standard:** Awesome DESIGN.md & Taste-Design Guidelines
**Version:** 1.0.0
**Art Direction:** Creative Modern-Antique Atelier — Glazed Porcelain & Terracotta Claymorphism

---

## 1. Visual Theme & Atmosphere

**Academia Nova** bridges the timeless curiosity of a Renaissance scholar's cabinet (*studiolo*) with the tactile delight of modern claymorphism and fluid spring mechanics. 

- **Atmosphere:** Warm, luminous, tactile, intellectually invigorating. The digital space feels like an illuminated manuscript brought to life as soft, touchable ceramic and terracotta artifacts.
- **Density:** 4/10 — Spacious and breathable with intentional white space reminiscent of fine press book design.
- **Variance:** 7/10 — Asymmetric split layouts, offset curiosity cards, botanical and celestial floating ornaments.
- **Motion:** 6/10 — Butter-smooth spring physics (`stiffness: 300, damping: 20`), tactile press squishes (`scale: 0.96`), floating ambient drift, and rewarding milestone reveals.

---

## 2. Color Palette & Roles

- **Canvas Alabaster** (`#FAF7F2`) — Primary background canvas, evoking warm handmade parchment and Italian alabaster.
- **Lapis Ink** (`#1E1B4B`) — Deepest text ink, Renaissance lapis lazuli depth, WCAG AAA compliant (14.2:1 contrast ratio).
- **Glazed Porcelain White** (`#FFFFFF`) — Card surface base with luminous inner highlights.
- **Terracotta Clay** (`#E05A47`) — Warm baked earth accent for primary hero CTAs, creative badges, and highlight tags.
- **Venetian Gilt** (`#D97706`) — Antique burnished gold for honor badges, rating stars, and mastery seals.
- **Sage Celadon** (`#0F766E`) — Naturalist botanical teal for progress bars, science paths, and completed milestones.
- **Soft Antique Border** (`rgba(217, 119, 6, 0.12)`) — 1.5px delicate hairline outline with a warm golden hue.
- **Deep Slate Muted** (`#64748B`) — Secondary descriptions, metadata, and lesson counters.

---

## 3. Typographic Architecture

- **Display & Headlines:** `Fraunces` (Google Fonts) — Variable serif font with soft rounded serifs, warm organic character, and exquisite editorial ligatures. Tracked slightly snug (`-0.02em`) with weight hierarchy (`600`–`800`).
- **Body & Interface:** `Plus Jakarta Sans` (Google Fonts) — Ultra-clean modern geometric sans with tall x-height and exceptional readability.
- **Honorifics & Monospace:** `JetBrains Mono` — For lesson numbers (`01/12`), timestamps, streak multipliers, and XP telemetry.
- **Banned:** Generic `Inter`, `Times New Roman`, `Comic Sans`, and oversaturated gradient text headers.

---

## 4. Component Stylings (Glazed Ceramic Claymorphism)

### Claymorphic Cards (`.clay-card-antique`)
- **Border Radius:** `28px` (`rounded-3xl`).
- **Exterior Depth:** Soft double drop shadow with warm lapis undertones:
  `box-shadow: 0 16px 36px -12px rgba(30, 27, 75, 0.09), 0 4px 12px rgba(217, 119, 6, 0.05)`
- **Interior Glaze:** Two-stage inner ambient bevel:
  `inset 2px 2px 4px rgba(255, 255, 255, 0.95), inset -2px -2px 6px rgba(217, 119, 6, 0.08)`
- **Border:** `1.5px solid rgba(255, 255, 255, 0.85)` + subtle outer glow ring `rgba(217, 119, 6, 0.1)`.

### Tactile Squish Buttons (`.clay-button-gilt` / `.clay-button-terracotta`)
- **Feel:** Chunky, pillow-like 3D button that visibly depresses on press (`whileTap={{ scale: 0.96 }}`).
- **Highlight:** Glossy upper edge highlight mimicking glazed pottery.
- **Active State:** Spring recovery with `type: "spring", stiffness: 450, damping: 18`.

### Wax Seal Badges (`.clay-wax-seal`)
- **Form:** Irregular circular embossed badge (`rounded-full`) stamped with classical iconography (`⚜`, `✦`, `☀`, `⚡`).
- **Texture:** Rich terracotta or burnished gold with deep bevel and raised emblem.

### Interactive Progress Astrolabe (`.progress-astrolabe`)
- **Structure:** Antique brass/sage progress track with animated fill, floating milestone nodules, and instant celebration particle burst upon reaching 100%.

---

## 5. Layout Principles

- **Curiosity Cabinet Architecture:** Bento-style modules with varied proportions (1:1, 1:2, 2:1) that invite exploration rather than predictable identical grids.
- **Editorial Inline Motifs:** Embedding miniature glazed icons and seals directly into headline sentences as visual punctuation.
- **Mobile Grace:** Strict single-column collapse under `768px` with touch-first `48px` minimum targets.

---

## 6. Motion & Micro-Interactions

- **Floating Antiquities:** Hero 3D clay objects (celestial globe, parchment scroll, brass telescope, crystal beaker) subtly hovering on gentle cosine sine trajectories (`y: [0, -10, 0]`, duration 4–6s).
- **Tactile Card Hover:** Gentle lift (`y: -6px`) with deepening soft shadow.
- **Gamified Celebration:** Confetti and gold shimmer burst upon completing progress quest steps.

---

## 7. Explicit Anti-Patterns & Bans

- ❌ No neon purple/cyan cyberpunk glows.
- ❌ No plastic childish toy clipart.
- ❌ No flat, un-elevated generic white boxes.
- ❌ No fake Unsplash broken images — curated bespoke SVG ceramic illustrations and high-fidelity art.
- ❌ No fabricated AI corporate jargon ("Seamlessly elevate your paradigm").
- ❌ No centered 3-column equal boxes.
