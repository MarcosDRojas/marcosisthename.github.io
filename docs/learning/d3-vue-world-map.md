# Learning notes: D3 + Vue interactive map

Private notes, not part of the site. Nothing in `src/` or `public/` references this
file, so Vite never bundles or serves it — it only exists in the repo for us.

## The problem

We want a zoomable world map where clicking a marker shows photos taken there,
plus a scrollable grid of every photo below it. D3 is the standard tool for
map projections and zoom/pan math. Vue is the standard tool for reactive UI.
The question is how to use both without them fighting over the same DOM nodes.

## Why D3 and Vue can conflict

D3's classic pattern is **imperative**: you hand it data, and it directly
creates/updates/removes DOM nodes itself (`selection.enter().append(...)`).

Vue's rendering is **declarative**: you describe what the DOM should look like
for a given state, and Vue's virtual DOM diffs and patches it for you.

If you let D3 own a chunk of DOM (e.g. call `d3.select(el).selectAll('circle').data(...).enter()...`)
and Vue *also* thinks it owns that DOM (because it's inside a Vue template),
they'll stomp on each other — Vue re-renders and wipes out nodes D3 created,
or D3 mutates nodes Vue thinks it controls, and state goes out of sync.

## The fix: split responsibilities

Give each library the part it's actually good at, and don't let them touch
the same nodes:

- **D3 owns math, not markup.** Use `d3-geo` to turn `(lat, lon)` into
  `(x, y)` pixel coordinates for a given projection. Use `d3-zoom` to
  compute the current pan/zoom transform (translate + scale) from user
  gestures. Neither of these need to touch the DOM directly — they're just
  functions that take data and return numbers.
- **Vue owns markup.** The `<svg>`, the `<path>` for the landmass, and a
  `<circle>` per photo location are all rendered by Vue's template from
  reactive state (`ref`/`computed`). When D3's zoom handler fires, we don't
  let D3 touch the DOM — we store the resulting transform in a Vue `ref`,
  and the template re-renders using that ref.

Concretely:

```
d3-zoom's zoom handler → updates a Vue ref (transform: {x, y, k})
                             ↓
        Vue template binds <g :transform="`translate(${x},${y}) scale(${k})`">
                             ↓
              every marker inside re-projects reactively
```

D3 never calls `.append()` or `.remove()`. It only computes numbers; Vue
renders them. This is sometimes called the "D3 for math, framework for DOM"
pattern, and it's the standard way to combine D3 with React/Vue/Svelte.

## Key D3 vocabulary

- **Projection** (`d3.geoNaturalEarth1()`, `d3.geoMercator()`, etc.): a
  function that maps `[longitude, latitude]` → `[x, y]` pixel coordinates.
  Also has a `.pathGenerator` companion (`d3.geoPath()`) that turns GeoJSON
  polygons (country borders) into an SVG `<path d="...">` string.
- **TopoJSON**: a compact format for map geometry (shared borders between
  countries are stored once instead of duplicated). `topojson-client`'s
  `feature()` function converts it to plain GeoJSON that `d3.geoPath()` can
  consume. `world-atlas` is an npm package that ships pre-built TopoJSON for
  the world at a few resolutions (110m = low detail/small file, good for a
  zoomed-out world view).
- **d3-zoom**: attaches wheel/drag/touch listeners to an element and emits a
  `transform` (`{x, y, k}`, i.e. translate x/y and scale k) on every zoom/pan
  gesture. We read that transform and apply it to an SVG `<g>` via Vue's
  `:transform` binding instead of letting d3-zoom apply it itself.

## Where this lands in the codebase

- `src/data/photoLocations.ts` — plain data: `{ id, name, lat, lon, photos[] }`.
- `src/components/WorldMap.vue` — holds the D3 math (projection + zoom
  transform ref) and a Vue template that renders the landmass `<path>` and
  one `<circle>` per location. Emits `locationClick` with the location id.
- `src/components/PhotoScroll.vue` — pure Vue, no D3: a grid of every photo,
  with an optional prop to highlight/scroll to one location's photos.
- `src/views/Photography.vue` — wires the two together (click marker →
  highlight that location in the scroll).

## What actually got built (first pass)

- `world-atlas`'s `land-110m.json` (not `countries-110m.json`) — we only need
  a world silhouette, not per-country borders, so `objects.land` is simpler
  than dealing with a `FeatureCollection` of ~180 countries.
- `d3-geo`'s `geoNaturalEarth1()` projection + `geoPath()` to turn the
  TopoJSON-derived GeoJSON into a static `<path d="...">` string, computed
  once (not reactive — the landmass shape never changes, only the zoom
  transform wrapping it does).
- `d3-zoom`'s `on('zoom', ...)` handler writes `{x, y, k}` into a plain Vue
  `ref`. The template applies it as `<g :transform="translate(...) scale(...)">`.
  D3 never calls `.attr()` on anything — confirmed the split held up in
  practice, not just in theory.
- Markers are computed once via `projection([lon, lat])` (a plain function
  call, no DOM) and rendered as a `v-for` over that computed array — plain
  Vue reactivity, zero D3 involvement.
- Marker radius is divided by the current zoom scale (`7 / transform.k`) so
  markers don't visually balloon as you zoom in — a common D3 map gotcha
  since the `<g>` scale transform affects everything inside it, markers
  included.
- `WorldMap.vue` emits `locationClick`; `Photography.vue` owns an
  `activeLocationId` ref and passes it down to `PhotoScroll.vue`, which
  `scrollIntoView`s the matching photo. State lives in the parent view, not
  in either child — keeps the two components decoupled from each other.
- Bundle cost: bundling `land-110m.json` + the d3 submodules into the
  Photography route added ~48kB gzipped to that one lazy-loaded chunk. Since
  it's route-level code-splitting (see `src/router/index.ts`), it only loads
  when someone actually visits `/photography` — doesn't affect Landing/Resume.

## Mobile pass: touch-action, tap targets, slice-crop

- **`touch-action: none` was trapping page scroll.** With it set, a single
  finger landing on the map at all was captured for panning, so the user
  couldn't scroll past the map on a phone. Fixed with `touch-action: pan-y` —
  the browser handles single-finger vertical scroll natively (bypassing JS
  entirely), while pinch and horizontal drag are still left for `d3-zoom` to
  handle. This is the standard trick for embedding a pan/zoom widget inside
  a normally-scrolling page.
- **Tap targets vs. visual size are separate concerns.** The visible marker
  dot is intentionally small (`3px`/`7px` radius) so it doesn't overwhelm the
  map, but that's well under the ~44px touch target guideline. Added a third,
  invisible circle (`fill: transparent`, `r="20/k"`) per marker purely to
  enlarge the *hit area* without changing what's drawn. Note: SVG hit-testing
  treats `fill: transparent` as "painted" (clickable) — it's `fill: none`
  that opts an element out of pointer events, not `transparent`.
- **Made the map "bigger" on mobile via crop, not by rescaling the whole
  scene.** The viewBox stays a fixed `960×500` — same projection, same
  `scale()`, same marker coordinates — on every screen size. What changes is
  the CSS `aspect-ratio` of the `<svg>` box: a squarer box on narrow screens,
  combined with `preserveAspectRatio="xMidYMid slice"` (the SVG analog of
  `object-fit: cover`) instead of the default `"meet"` (the analog of
  `object-fit: contain`, which would've letterboxed with blank bars instead
  of enlarging anything). Slice crops the left/right edges and scales the
  visible portion up to fill the taller box — the net effect is a bigger,
  more legible map on phones without touching any of the projection math.
  This works cleanly with `d3-zoom`'s pointer math because `d3.pointer`
  resolves coordinates through the SVG's actual screen CTM (the current
  transform matrix, accounting for viewBox + preserveAspectRatio), not a
  naive pixel-to-unit assumption — so panning/zooming stays accurate even
  though the rendered box no longer matches the viewBox's own aspect ratio.

## Gotchas to remember for next time

- Don't call any D3 selection method inside `onMounted` that appends/removes
  elements Vue's template also renders — pick one owner per node.
- `d3.geoPath()` needs a projection *and* a canvas/SVG context is optional —
  for SVG we just use it to generate the `d` attribute string; no manual
  canvas drawing needed.
- Zoom transforms compose with the projection's own scale — don't fight it
  by also trying to change the projection's `.scale()` on zoom. Only the
  outer `<g transform>` should change; the projection stays fixed.
