---
name: exxat-leo-generation
description: >-
  Leo/AI creating data or components — shared lifecycle (inited, thinking,
  completed), Stop, parent/child sections, Leo loading rows, split rows. Load
  when a surface shows Leo working, adds rows/cards/charts via Leo, or adds a
  split-row column.
user-invocable: true
---

# Exxat DS — Leo generation

## Read first

| Topic | Path |
|-------|------|
| Pattern | `docs/exxat-ds/leo-generation-pattern.md` |
| Rule | `.agents/rules/exxat-leo-generation.md` |
| Split rows | `.agents/rules/exxat-split-rows.md` |
| Live examples | `/design-os/design-system/leo-generation`, `/design-os/design-system/data-table` (Row types) |
| Source | `packages/ui/src/lib/leo-generation.ts`, `components/ui/leo-generation-surface.tsx`, `components/data-table/leo-loading-row.tsx` |

## Pick the wrapper

| Leo is creating… | Use |
| --- | --- |
| a card, chart, form, panel | `LeoGenerationSurface` |
| a section that holds a table/chart | `LeoGenerationSection` (parent) + child consumer |
| table rows | `DataTable leoLoading={{ rows }}` |
| rows that stack sub-rows | `ColumnDef.split` + `splitCount` on the loading row |
| one run | `useLeoGeneration()` |
| a parent with several children | `useLeoGenerationGroup(ids)` |

## Five-question pre-flight

1. Is state driven by the real request, not a timer? (`run()` is demo only.)
2. Is there an icon-only Stop until completed?
3. Does completed show a check with "Leo is done", then the real data in the same shape?
4. Brand colour only, announced once, reduced-motion safe?
5. Is there an example in the Leo Generation catalog page?

## Do not

Hand-roll skeletons/blobs for Leo; use `Skeleton` or a spinner; nest Leo rows as parent/child inside a table (the section is the parent); add a fourth state; use `rowSpan` for split rows; exceed four visible sub-rows.

## API cheat sheet

```tsx
// one run
const gen = useLeoGeneration()           // state, delivered, stopped, run, stop, set
// parent with children
const g = useLeoGenerationGroup(ids)     // parent{state,running,delivered}, children[], run, stop, stopChild

<LeoGenerationSection title state={g.parent.state} onStop={g.stop}>   {/* parent */}
  <DataTable leoLoading={{ rows: [{ id, state, label, onStop, splitCount }] }} />  {/* child */}
</LeoGenerationSection>

<LeoGenerationSurface state={gen.state} onStop={gen.stop} skeleton={…}>…real content…</LeoGenerationSurface>
```

- Completed = brand check + "Leo is done", held ~0.9s (`doneMs`), then data in the same shape.
- Stop = icon-only `Button` ghost `icon-xs`, name "Stop", with `Tip`.
- Split column: `ColumnDef.split = { items, cell?, maxVisible? }` (≤ 4 sub-rows, "+N more").
- Catalog entry `ui-leo-generation` (group Leo) → `/design-os/design-system/leo-generation`; row examples on `/design-os/design-system/data-table`.
- Dev server: this repo's `.claude/launch.json` runs Vite on **4001**; 4000 may belong to another checkout.
