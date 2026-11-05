# Editing custom project pages

## What changed

The homepage still uses each project's `title`, `cover`, `category`, and `views`.
The existing `project.html?id=...` URL remains the only project template.

A project opts into the new detail layout by adding a `page` object in `projects.js`.
Without `page`, `project-page.js` uses the original renderer, HTML, CSS, hero and gallery.
Only `safet` has been migrated. Its existing fields are retained, including its original video gallery.

Files:
- `projects.js`: Safe-T's `page` configuration only.
- `project.html`: loads `project-blocks.css` and `project-blocks.js`.
- `project-page.js`: dispatches opted-in projects to `ProjectBlocks.render`.
- `project-blocks.js`: media, block, row alignment and lazy video rendering.
- `project-blocks.css`: isolated `.pb-*` classes and `.modular-project` body styles.
- `_dev/project-blocks.html` and `_dev/project-blocks.js`: local-only demonstration/checks.

## Create your second custom page

1. Find that project's object in `projects.js`.
2. Keep its existing `id`, `cover`, `views`, `category` and all detail content.
3. Add `page: { ... }` as another property. Use the example below.
4. Replace the example image paths with real paths relative to the website root.
5. Open `project.html?id=YOUR-EXISTING-ID` on your local server.
6. Reorder the objects in `blocks` to reorder the page. Add as many as needed.

For an entirely new project, add a new object to the existing `projects` array with a unique
`id`, `title`, `date`, `category`, `cover`, and `page`. The homepage renderer picks it up
and links to `project.html?id=YOUR-NEW-ID`. No separate HTML file or routing change is needed.

```js
page: {
  title: "My second custom project",
  measurements: "Editorial design, 2026",
  description: ["First paragraph.", "Second paragraph."],
  hero: {
    type: "image",
    src: "images/my-project/hero.jpg",
    alt: "Describe the hero",
    // Contain preserves the whole image in the 4:1 frame. For an intentional crop:
    fit: "cover", position: "50% 40%"
  },
  blocks: [
    {
      type: "big", margin: "1-column",
      media: { type: "image", src: "images/my-project/one.jpg", alt: "First image" }
    },
    {
      type: "equal-grid", margin: "0-column", columns: 3,
      mobileColumns: 1, gutter: 20, aspectRatio: "4 / 3", fit: "contain",
      items: [
        { type: "image", src: "images/my-project/two.jpg", alt: "Second image" },
        { type: "image", src: "images/my-project/three.jpg", alt: "Third image" },
        { type: "image", src: "images/my-project/four.jpg", alt: "Fourth image" }
      ]
    },
    {
      type: "midsize", margin: "0-column", align: "right", span: 6,
      media: { type: "image", src: "images/my-project/five.jpg", alt: "Fifth image", caption: "Optional caption" }
    },
    {
      type: "collage", margin: "0-column", columns: 12, gutter: 42,
      rows: [[
        { span: 3, media: { type: "image", src: "images/my-project/six.jpg", alt: "Sixth image" } },
        { span: 5, media: { type: "image", src: "images/my-project/seven.jpg", alt: "Seventh image" } },
        { span: 4, media: { type: "image", src: "images/my-project/eight.jpg", alt: "Eighth image" } }
      ]]
    },
    {
      type: "big", margin: "full-bleed",
      media: { type: "image", src: "images/my-project/nine.jpg", alt: "Final image" }
    }
  ]
}
```

`page.title`, `page.measurements` and `page.description` override detail-page text only.
Omit them to inherit the project's existing fields. Descriptions accept a string (blank
lines separate paragraphs) or an array of paragraphs. Text is inserted as text, not HTML.

## The five types

| Type | Data | Options |
|---|---|---|
| Hero | `page.hero` | Always first, full bleed, 4:1. `fit` defaults to `contain`; `position` controls an explicit crop. |
| Big | `{ type: "big", media }` | All three margins; natural image/video ratio by default. |
| Midsize | `{ type: "midsize", media, span, align }` | All margins; `left`, `center`, `right`; width in grid columns. |
| Equal grid | `{ type: "equal-grid", items, columns, gutter }` | All margins; Images keep their natural proportions by default; optional `aspectRatio` sets matching frames; `fit` defaults to contain. Final-row items keep the same widths. |
| Collage | `{ type: "collage", rows, columns, gutter }` | All margins; row arrays contain media with `span`; every row bottom-aligns its cells. |

Margin presets:
- `full-bleed`: no outer margin.
- `0-column`: the full 12-column content area.
- `1-column`: leave one column plus its gutter empty on each side (10 columns remain).

For a midsize block, `span` counts columns in the available area, using the shared gutter.
A full-bleed area is subdivided into 12 columns. On small screens midsize media fills its
available area. Equal grids use `mobileColumns` (default 1). Collages stack in source order.

Collage `columns` defaults to 12, or 10 inside `1-column` margins. Every row's item spans
must total no more than that number. A row may leave unused columns on the right.
To place a vertical group beside another image, use a stacked cell:

```js
{ span: 4, gutter: 28, stack: [
  { type: "image", src: "images/example/top.jpg", alt: "Top" },
  { type: "image", src: "images/example/bottom.jpg", alt: "Bottom" }
] }
```

Natural proportions are preserved. Captions are part of their figure and are included
in the block height; collage cells align their complete figures (including captions).
For a shared image-only baseline, omit captions within that collage row.

## Media and video options

Every `media`, `items` entry, or stack entry accepts:
`type`, `src`, `alt`, `caption`, `width`, `height`, `aspectRatio`, `fit`, `position`.
Image dimensions are optional but recommended: they reserve the correct space before loading.
`aspectRatio` explicitly sets a frame; `fit: "contain"` shows the entire image, while
`fit: "cover"` crops it without distortion.

```js
media: {
  type: "video", src: "videos/my-project/loop.mp4",
  autoplay: true, loop: true, muted: true, controls: false,
  playsinline: true, poster: "images/my-project/poster.jpg",
  aspectRatio: "16 / 9"
}
```

For a longer film use `autoplay: false`, `loop: false`, `controls: true`, and optionally
`muted: false`. Videos use `preload="none"` and receive a source only within 300px of the
viewport. Autoplay defaults to muted; blocked autoplay exposes controls. Reduced-motion
preferences disable autoplay and expose controls. Gallery images load lazily; the hero
loads eagerly. Video poster images are optional.

## Measured grid and the agreed row rule

Source: Figma Project 1 `559:3`, same layout grids as Main `424:32`.
At a 1440px content width: 60px margins, 42px gutters, 12 columns of 71.5px;
one-column inset is 173.5px. Widths adapt to the available viewport content area.
Tablet margins/gutters become 30px/24px; mobile 20px/12px.

Rows start at y=37, 106, 175, 244...: height 49px, gutter 20px, pitch 69px.
For every successive gallery block, find the row containing the previous block's bottom:
- If the bottom is within the first quarter (12.25px inclusive), use the next row start.
- Otherwise skip the next row and use the following row start.
- A bottom in the 20px gutter follows the second case.

Thus y=112 ends → next y=175; y=125 ends → next y=244.
This uses document coordinates and recalculates after resizing, font loading, image loading,
and video metadata loading. Captions count as part of a block. The first gallery position
follows the information section; subsequent blocks follow this agreed rule.

The title/metadata/description use the measured 52px / 20px Museo typography. The figure
slots in Figma are several pixels off the column grid and use varying vertical gaps.
The implementation follows the exact shared column system and your clarified row rule,
rather than reproducing those inconsistent offsets. Consequently later block y positions
and total page height differ from the static frame by design.

## Safe-T media still to assign

Confident match: `images/safet/poster.jpg`, the actual poster shown at Figma `566:44`.
Everything else in Project 1 is an unlabelled gray or outlined box. No file mapping is inferred.
23 media slots remain:

| Order | Slot | Figma ID(s) |
|---|---|---|
| Hero | Wide 4:1 hero | 563:36 |
| Block 1 | Three portrait images, left to right | 566:48, 566:49, 566:50 |
| Block 2 | Wide media | 585:6 |
| Block 3 | Poster is assigned; two right-side companions need files | 585:3, 585:4 |
| Block 4 | Fifteen contact-sheet images, row-major order | 566:73–77, 566:78–82, 566:83–87 |
| Block 5 | Final wide media | 585:8 |

To assign a placeholder, replace `placeholder` with `type`, `src` and `alt`. Keep its
`aspectRatio` only if you want that explicit frame; remove it for natural proportions.
For the contact sheet, replace the `Array.from(...)` expression with an `items` array of
real media entries. Existing unassigned assets include the explainer sheet, two worksheets,
and Safe-T videos. They were deliberately not mapped to ambiguous gray boxes.

The floating home icon uses your `images/interface/to-home.svg`, at its natural 76×73px.
Its desktop right offset is 58px from Figma. A 36px bottom offset is used because the
4747px-tall frame cannot specify a live viewport bottom inset; edit `.project-home` in
`project-navigation.css` to change it. The button is defined once in `project.html`,
outside the project content, and appears on every project page regardless of its layout. The link is relative (`index.html`) for GitHub Pages.

## Local development showcase

From the website folder, run `python3 -m http.server 8766 --bind 127.0.0.1` and visit:
- `http://127.0.0.1:8766/project.html?id=safet`
- `http://127.0.0.1:8766/_dev/project-blocks.html`

The showcase demonstrates every type, all margins, all midsize alignments, natural media,
zero/custom gutters, incomplete final rows, collage baselines/stacks and both video modes.
It displays automated geometry checks and reruns when resized. It has no public navigation
link, includes `noindex,nofollow`, and renders only on localhost. `_dev` is also excluded
by standard GitHub Pages Jekyll processing; if deploying without Jekyll, omit `_dev` from
your upload for strict development-only distribution.


## Block captions

Add `caption` to any object in `page.blocks`. For a grid or collage this is one caption
under the entire group. For midsize blocks it uses the media width and follows `align`.
Use `caption: "First line\nSecond line"` to force a line break; long lines also wrap naturally.
Captions use Museo 700, 17px, 170% leading, #BEBDBD, and a 14px gap from media.
The next block's row calculation starts from the caption bottom, including all its lines.
Omit `caption` or use an empty string to hide it without reserving space.


## One-off width and spacing

Set `span: 8` on an individual midsize block to use eight columns. Other midsize
blocks keep their default six-column width. On mobile, midsize images still fill
the available width.

Set `gapAfter: 24` on a block to use exactly 24px before the next block instead of
the normal row-alignment rule. This includes any caption in the preceding block.
Omit it to keep automatic spacing; `gapAfter: 0` removes that gap. It has no effect
on the final block's bottom padding.


### Presentation viewer

Use `slides` in the order they should appear. Images (including animated GIFs) and MP4 videos can be mixed. All slides use `contain` within one fixed frame. Margin accepts `full-bleed`, `0-column`, `1-column`, or `2-column`.

```js
{
  type: "presentation",
  margin: "1-column",
  aspectRatio: "16 / 9",
  slides: [
    { type: "image", src: "images/example/1.webp", alt: "Introduction" },
    { type: "video", src: "videos/example/2.mp4", autoplay: true,
      loop: true, muted: true, controls: true, poster: "images/example/2.jpg" }
  ]
}
```

Focus the viewer or its buttons to use Left/Right arrows. Swipe horizontally across slides on mobile; the bottom video control area remains available for seeking. Videos pause when hidden, offscreen, or the browser tab is hidden. Autoplay respects reduced-motion preferences and browser audio restrictions.
