# Nicolas Milosevic, portfolio

Static site built with [Astro](https://astro.build). No UI framework, about 15 KB of JavaScript.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview  # serves dist/ to check the real build
```

Images are optimised on demand in dev, so they load slowly the first time. Use `npm run build && npm run preview` to judge the real speed and motion.

## Editing content

| I want to change | File |
| --- | --- |
| A project's text, images, results, or place on the home grid | `src/content/projects/<name>.md` |
| Name, availability, LinkedIn, email, stats, how I work, skills, tools | `src/data/site.ts` |
| Home page sentences | `src/pages/index.astro` |
| About page sentences | `src/pages/about.astro` |

**Add a project:** copy a file in `src/content/projects/`, put its images in `src/assets/projects/<name>/`, then set `order` and `place`. The home page, the about page, the next-project link and the URL `/projects/<name>` all follow.

**Move a card on the home page:** change `place: { start, span }`. `start` is the first column (1 to 12), `span` is how many columns it takes.

**Change a project's hover colour:** set `brand: { onGrey, onBlack }` in its file. It colours the project name on hover. Use colours from the real product. Aim for at least 3:1 contrast on that background. Somfy is a deliberate exception: its logo yellow on grey is about 1.2:1.

**Change the tools on the about page:** edit `tools` in `src/data/site.ts`. Each logo is an SVG in `src/assets/logos/`, with a 24 x 24 viewBox. It takes the text colour by itself.

**Add an email address:** fill in `email` in `src/data/site.ts`. The links appear on their own.

## Design system

`src/design-system/tokens.json` is the single source of truth, in the W3C Design Tokens format. `npm run tokens` turns it into `src/styles/tokens.css` (this also runs before `dev` and `build`). Never edit `tokens.css` by hand.

The live documentation is at `/system`. It reads the same JSON file.

- **Change the accent colour:** change `color.accent.hue`. Try values live with the slider on `/system`.
- **Change the greys:** change `theme.light` and `theme.dark`. Components only use these semantic names, like `--bg`, `--fg` and `--accent`.
- **Change the type scale or font:** change `type` and `font`. The font import is at the top of `src/layouts/Layout.astro`.
- **Change motion:** change `duration`, `ease` and `stagger`. All the motion follows.

### Rules that keep it consistent

1. Colour means attention. The accent is for links, focus and live states. A project's hover turns its name to its own product colour, set with `brand` in its file.
2. Everything sits on `.grid`. Place things with `grid-column`, and check with Shift + G.
3. Components use tokens, never raw values.
4. Motion answers to reduced motion: every hidden state sits behind `html.js` and a `prefers-reduced-motion` check.

### Motion without writing JS

| Attribute | Effect |
| --- | --- |
| `data-split` | Text rises line by line. `data-split="chars"` also wraps each letter. |
| `data-fade` | Short text fades in. Delay it with `--fade-delay`. |
| `data-words` | Words light up as you scroll. |
| `data-parallax` | The whole block drifts as you scroll, off the main thread. Set the distance with `--drift`, for example `0.05`. Pictures are never cropped. |
| `data-count="50"` | Number counts up. Add `data-suffix="+"` for a unit. |
| `data-surface-trigger` | The page flips to the opposite surface while this section is centred. |

### Buttons

Every call to action uses `src/components/Button.astro`. With `href` it renders a link, without it a button.

```astro
<Button href="/about" size="lg">More about how I work</Button>
<Button variant="secondary" data-replay>Replay</Button>
```

- `variant`: `primary` or `secondary`
- `size`: `sm`, `md` or `lg`
- `external`: opens in a new tab
- `disabled`: stops it answering
- `aria-pressed`: for buttons that switch something on

States are in `src/styles/button.css`: default, hover, focus, pressed, selected and disabled. Heights and padding are in the tokens. See them all on `/system`. Text links are for navigation only.

## How the code is organised

```
src/
  design-system/tokens.json   the source of truth
  content/projects/*.md       one file per project
  data/site.ts                everything else about you
  layouts/Layout.astro        html shell
  pages/                      /, /about, /projects/[slug], /system, 404
  components/                 Button, Shot, WorkItem, GridOverlay, Loader...
  styles/
    tokens.css                generated
    global.css                layers, reset, grid, type utilities
    motion.css                text and image reveals
    transitions.css           page transition
  scripts/
    app.ts                    entry point, navigation, grid toggle
    core.ts                   shared animation loop and helpers
    reveal.ts                 text, image and number reveals
    scrollfx.ts               parallax, word lighting
    pointer.ts                grid glow, hero letters, previews
```

## Fonts

Hubot Sans, self-hosted, SIL Open Font License. Its zero is slashed, which reads badly in dates and in "360Learning", so `src/styles/fonts.css` swaps that single glyph for the zero of its sister typeface, Mona Sans (1 KB, also OFL).

## Deploying

Every push to `main` builds and publishes the site to nicolasmilosevic.com with GitHub Actions (`.github/workflows/deploy.yml`). Each page is a real HTML file, so direct links like `/projects/somfy` work. `public/CNAME` keeps the custom domain.
