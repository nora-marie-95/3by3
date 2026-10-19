# Three by Three

Organize life goals across three categories — **Goals**, **Routines**, **Joy List** — with
a connected **Todo** list. See [AGENTS.md](./AGENTS.md) for the concept and
[CLAUDE.md](./CLAUDE.md) for the tech stack and project rules.

## Get started

```bash
npm install
npm run web      # expo start --web
npm start        # expo start (choose iOS/Android/web from the menu)
```

```bash
npm run check     # eslint + tsc
npm test          # jest
```

No backend yet — everything persists locally via AsyncStorage (works the same on web and
native). Web ships first; iOS/Android run from the same codebase via Expo.
