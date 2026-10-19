# Three by Three

## What this is

An app for organizing life goals. Everything a person wants to do with their life gets
sorted into three categories, plus one cross-cutting list that turns intentions into daily
action.

## The three categories

1. **Goals** — long-term outcomes (e.g. "Reach B2 in French").
2. **Routines** — recurring things that maintain one's lifestyle (daily/weekly habits).
3. **Joy List** — things chosen for fun and fulfillment, blending responsibility with
   pleasure, rather than pure obligation.

These three are the same kind of entity under the hood — a category item with a `type` of
`goal | routine | joy` — just grouped differently in the UI.

## Todo list

A single, category-agnostic list of actionable items. Each todo *optionally* links back to
one category item as its parent, which is what connects an abstract goal/routine/joy entry
to concrete, doable action.

Example: the goal "B2 French" (category: goal) has a linked todo "Learn 10 new words".
Todos without a linked category item are allowed (quick capture).

Data shape, roughly:

```
CategoryItem { id, type: "goal" | "routine" | "joy", title, ... }
TodoItem     { id, title, done, categoryItemId?: CategoryItem["id"] }
```

One `CategoryItem` can have many `TodoItem`s; a `TodoItem` has zero or one parent
`CategoryItem`.

## Platforms & scope

- **Web ships first**, mobile (iOS/Android) follows from the same codebase — see
  CLAUDE.md for the Expo-based stack chosen to make that reuse work.
- **MVP has no backend or database.** All data is local, persisted via AsyncStorage (works
  the same on web and native — see CLAUDE.md's State and storage section). Multi-device
  sync is a later concern, not part of the MVP.

## Status

Pre-code: repo and project rules (CLAUDE.md) exist; the app itself is not yet built.
