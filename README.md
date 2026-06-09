# PokéDex 2.0

A browser-based Pokédex that fetches live data from the [PokéAPI](https://pokeapi.co/) and lets you browse, filter, and inspect all 1025 Pokémon.

## Background

The Pokédex is my go-to project whenever I pick up something new. Building the same familiar product lets me focus on the technology rather than the problem domain — so the differences between versions reflect what I've actually learned.

**v1.0** (HTML & CSS only) — Static markup written with Emmet, locally saved images, Gen I Pokémon only. No JavaScript, no API.

**v2.0** *(this repo)* — Rebuilt with vanilla JavaScript ES Modules. Pulls live data from PokéAPI, covers all 1025 Pokémon across 9 generations, and adds filtering, a detail modal, and a loading screen.

**v3 — React** and **v4 — Next.js** versions are in progress.

> See the [full series](#the-pokedex-series) below.

## Features

- **Browse all Pokémon** — Cards for all 1025 Pokémon (Gen I–IX), each showing the official artwork, Pokédex number, name, and type-based color styling.
- **Filter by Generation** — Toggle one or more generation buttons (Gen I–IX) to show only Pokémon from those generations. Defaults to Gen I on load.
- **Filter by Type** — Click any of the 18 type buttons to narrow the display to a single type. A "Show All" button resets the filter.
- **Combined filters** — Generation and type filters work together simultaneously.
- **Detail Modal** — Click any card to open a modal with extended info: type(s), category, height, weight, and abilities. Modal border colors reflect the Pokémon's type(s).
- **Loading screen** — Animated Pokéball loader while the initial data is being fetched.

## Tech Stack

- Vanilla HTML, CSS, and JavaScript (ES Modules — no frameworks, no bundler)
- [PokéAPI v2](https://pokeapi.co/api/v2) for all Pokémon and type data
- [PokeAPI Sprites](https://github.com/PokeAPI/sprites) for official artwork images

## Project Structure

```
├── index.html          # App shell and static markup
├── main.js             # Entry point — orchestrates startup
├── style.css           # Component styles
├── styleRoot.css       # CSS custom properties (type colors, gen colors, etc.)
├── images/
│   └── pokedex.png     # Header image
└── src/
    ├── api.js          # All fetch calls to PokéAPI
    ├── render.js       # Creates and appends Pokémon cards to the DOM
    ├── types.js        # Renders type filter buttons and handles type filtering
    ├── generations.js  # Generation toggle buttons and logic
    ├── filters.js      # Shared filter state and applyFilters()
    ├── modal.js        # Detail modal — build and display on card click
    └── utils.js        # Helpers: capitalize, formatID, applyTypeStyles, etc.
```

## Getting Started

No build step or dependencies required. Just open `index.html` in a browser, or serve the folder with any static file server:

```bash
npx serve .
```

> **Note:** On first load the app fetches data for all 1025 Pokémon in parallel, so the initial load may take a few seconds depending on network speed.

---

## The PokéDex Series

| Version | Stack | Highlights |
|---------|-------|------------|
| v1.0 — HTML & CSS | HTML, CSS (Emmet) | Static, local images, Gen I only |
| **v2.0 — Vanilla JS** *(this repo)* | HTML, CSS, JS ES Modules | PokéAPI, all 1025 Pokémon, filtering, modal |
| v3.0 — React | React | *(in progress)* |
| v4.0 — Next.js | Next.js | *(in progress)* |
