# Design System: Modern Antique Claymorphism

## Aesthetic Philosophy

PrepAura fuses the timeless tactile warmth of classical academic architecture (marble, parchment, glazed porcelain, gilded brass) with the precision and cleanliness of modern high-performance SaaS interfaces.

The result is **Modern Antique Claymorphism**: tactile, soft, deeply beveled surfaces paired with sharp classical serif headings and geometric sans-serif data displays.

---

## Color Palette Tokens

| Token Name | Hex Code | Semantic Role | Tailwind Utility |
| :--- | :--- | :--- | :--- |
| **Alabaster Canvas** | `#FAF7F2` | Base background for all application views | `bg-[#FAF7F2]` / `bg-antique-alabaster` |
| **Glazed Porcelain** | `#FFFFFF` | Primary surface for cards, panels, and modals | `bg-white` / `bg-antique-porcelain` |
| **Deep Lapis** | `#1E1B4B` | Primary text, brand authority, high-contrast badges | `text-[#1E1B4B]` / `text-antique-lapis` |
| **Terracotta** | `#E05A47` | Primary action button, urgent alert, CTAs | `bg-[#E05A47]` / `text-antique-terracotta` |
| **Venetian Gilt** | `#D97706` | Secondary accent, mastery meters, gold badges | `text-[#D97706]` / `text-antique-gilt` |
| **Celadon Emerald** | `#0F766E` | Verification badges, success states, completed tasks | `text-[#0F766E]` / `text-antique-celadon` |
| **Stone Parchment** | `#E0D8CC` | Border lines, divider rules, subtle card outlines | `border-[#E0D8CC]` / `border-stone-200` |
| **Muted Slate** | `#64748B` | Secondary explanatory text, timestamp labels | `text-slate-500` |

---

## Typography Hierarchy

### 1. Serif Display Typography: `Fraunces`

- **Source**: Google Fonts (`Fraunces:opsz,wght@9..144,500;600;700;800`)
- **Usage**: Primary page headers (`h1`, `h2`), section titles, score counter digits, hero taglines.
- **Character**: Antique editorial craftsmanship, optical size variations, authoritative warmth.

### 2. Geometric Sans-Serif Body: `Plus Jakarta Sans`

- **Source**: Google Fonts (`Plus+Jakarta+Sans:wght@400;500;600;700`)
- **Usage**: Body text, button labels, data tables, code snippets, form input fields.
- **Character**: High legibility on retina screens, clean geometric proportions.

---

## Surface Elevation & Clay Token Details

### Multi-Layer Glazed Clay Card

```css
.clay-card {
  background: #FFFFFF;
  border-radius: 20px;
  border: 1px solid rgba(224, 216, 204, 0.7);
  box-shadow:
    0 12px 28px -4px rgba(30, 27, 75, 0.07),
    0 4px 10px -2px rgba(30, 27, 75, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.95),
    inset 0 -2px 0 rgba(30, 27, 75, 0.04);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.clay-card:hover {
  transform: translateY(-2px);
  box-shadow:
    0 16px 36px -4px rgba(30, 27, 75, 0.10),
    0 6px 14px -2px rgba(30, 27, 75, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.95),
    inset 0 -2px 0 rgba(30, 27, 75, 0.04);
}
```

### Tactile Clay Action Button

```css
.clay-button-primary {
  background: #E05A47;
  color: #FFFFFF;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 4px 12px rgba(224, 90, 71, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    inset 0 -2px 0 rgba(0, 0, 0, 0.15);
  transition: all 0.15s ease;
}

.clay-button-primary:active {
  transform: translateY(1px);
  box-shadow:
    0 2px 6px rgba(224, 90, 71, 0.2),
    inset 0 2px 4px rgba(0, 0, 0, 0.2);
}
```
