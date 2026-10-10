# Testing

`tests/` is a standalone Vitest + React Testing Library suite (jsdom). It changes no site code,
`package.json` or lockfile.

| Tests | Statements | Branches | Functions | Lines |
|------:|-----------:|---------:|----------:|------:|
|    25 |      98.5% |    93.2% |      100% |  100% |

(2 of the 25 are known bugs.)

```bash
npm ci                 # the site (first time)
cd tests && npm ci     # the test tooling (first time)
npm test | npm run coverage | npm run bugs
```

The motion effects are tested against a controllable browser (`tests/support/browser.ts`): each
test chooses whether the pointer is fine and whether reduced motion is on, fires
IntersectionObservers itself, and steps `requestAnimationFrame` frame by frame. Lenis, `next/image`
and `next/font` are stand-ins. The tests also check that the resume and portrait the page links to
exist in `public/`.

## Known bugs

| Severity | Where | Bug |
|---|---|---|
| Medium | `data/portfolio.ts` | Still marked "TODO: replace with your real handles": the GitHub link is `github.com/mayurkale` (the account is `Mayur8830`), and the LinkedIn handle is the same placeholder. Visitors are sent to someone else's profiles. |
| Low | `components/Cursor.tsx` | The cursor label only refreshes when the hover *state* changes, so moving straight from one labelled element to another (the adjacent contact links) keeps the first label. |

Unused: `components/Marquee.tsx`, `IconTop` in `components/icons.tsx`, and `public/portrait.jpg`
(the page uses `mayur.jpeg`). The two components are covered by tests.
