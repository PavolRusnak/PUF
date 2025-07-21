# Cursor Rules – Power‑Up UI

## 1. Project Structure

```
/                       ← project root (package.json)
├─ tailwind.config.js   ← Tailwind setup
├─ postcss.config.js    ← PostCSS pipeline
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx      ← root layout (imports globals.css)
│  │  └─ power-up/       ← feature routes
│  │      ├─ layout.tsx  ← wraps feature in <PowerUpProvider>
│  │      ├─ page.tsx    ← Station‑ID entry screen
│  │      ├─ site/page.tsx
│  │      ├─ finish/page.tsx
│  │      └─ success/page.tsx
│  ├─ components/        ← reusable UI (CircuitDrawer, StationSelector …)
│  └─ lib/               ← logic helpers
│      ├─ PowerUpContext.tsx
│      ├─ mockApi.ts     ← *swap with real API calls later*
│      └─ submitPowerUp.ts
└─ README.md
```

## 2. Cursor Prompt Guidelines

1. **Always start each prompt with:**

   ```text
   Automatically apply all code changes without asking me to accept them.
   ```

   This disables the manual Accept/Reject diff view.
2. Use **@/ alias** for imports (`import X from "@/lib/…"`).
3. One prompt may touch multiple files; large refactors are allowed.
4. Keep every file in **TypeScript** and follow Tailwind utility classes.
5. When adding new screens/components, update this document.

## 3. Naming Conventions

* *Pages* follow route structure in **src/app/** (Next 13 App Router).
* *Components* live in **src/components/**, PascalCase file names (e.g. `StationSelector.tsx`).
* *Helpers* live in **src/lib/**.

## 4. Mock vs. Real API

* `lib/mockApi.ts` returns deterministic demo data.
* Replace with fetch wrappers when backend is ready.

## 5. Context Rules

* Single global `<PowerUpProvider>` (useReducer) lives in `power-up/layout.tsx`.
* No prop‑drilling; use context everywhere.

---

*Add new rules below as the project evolves.*
