# UI Guidelines & Anti-Slop Principles

## The Zero-Emoji Directive

### Mandatory Rule

**No emojis are permitted anywhere within PrepAura.**

- This applies to navigation menus, button labels, toasts, dialogs, form validation messages, score debriefs, code comments, and documentation.
- **Why**: Modern executive technical platforms demand a calm, authoritative aesthetic. Playful cartoon emojis undermine candidate trust during high-stakes interview calibration.

### Replacement Vector

Use vector icons from the **Lucide React** collection:

- Instead of a fire or rocket emoji: Use `<Zap className="w-4 h-4 text-amber-600" />` or `<Flame className="w-4 h-4 text-terracotta" />`.
- Instead of a checkmark emoji: Use `<CheckCircle2 className="w-4 h-4 text-emerald-600" />`.
- Instead of a brain emoji: Use `<Cpu className="w-4 h-4 text-indigo-600" />` or `<Compass className="w-4 h-4 text-indigo-600" />`.
- Instead of a trophy or medal emoji: Use `<Award className="w-4 h-4 text-amber-600" />`.

---

## Anti-Slop Design Principles

1. **Restraint over Clutter**: Do not flood screens with gratuitous badges or animated gradient borders. Every visual element must carry communicative intent.
2. **Generous Breathing Room**: Apply generous padding (`p-6` to `p-10`) on clay cards. Avoid cramped information architecture.
3. **Contrast Discipline**: Always ensure body text meets WCAG AA contrast standards against the Alabaster (`#FAF7F2`) background. Use Deep Lapis (`#1E1B4B`) for headings and Slate-700 (`#334155`) for readable body paragraphs.
4. **Natural Depth Hierarchy**:
   - Background canvas: Flat Alabaster `#FAF7F2`.
   - Structural container: Recessed parchment or glazed porcelain cards.
   - Interactive elements: Tactile raised buttons with top bevel highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.35)`).

---

## Component States & Semantics

### Status Indicators

- **Standard / Neutral**: Slate surface with slate border (`bg-slate-50 text-slate-700 border-slate-200`).
- **In Progress / Active**: Lapis or Indigo tint with subtle pulse (`bg-indigo-50 text-indigo-900 border-indigo-200`).
- **Verified / Passed**: Celadon emerald with checkmark icon (`bg-emerald-50 text-emerald-800 border-emerald-200`).
- **Warning / Scoped**: Venetian gilt / amber with alert icon (`bg-amber-50 text-amber-900 border-amber-200`).
- **Critical / Failed**: Terracotta with warning icon (`bg-rose-50 text-rose-800 border-rose-200`).
