import { fetchSpecies } from "./api.js";

// Easy function to capitalize the first letter
export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

export function formatID(id) {
  return "#" + String(id).padStart(4, "0");
}

/** Builds the background / border colors depending on one or two types */
export function applyTypeStyles(element, types) {
  element.style.backgroundImage = "";
  if (types.length === 2) {
    const [t1, t2] = types;

    element.style.backgroundImage = `
      linear-gradient(
        129.8deg,
        var(--${t1}) 30%,
        var(--${t1}),
        var(--${t2}),
        var(--${t2}) 70%
      )`;
  } else {
    const t = types[0];
    element.style.backgroundColor = `var(--${t})`;
  }
}

// Category
export async function fetchCategory(id) {
  const species = await fetchSpecies(id);
  const genera = species.genera.find((e) => e.language.name === "en");
  const category = genera.genus;
  return category.toLowerCase();
}

// console.log(fetchCategory(1));
// fetchCategory(1);

// Generation
export async function fetchGeneration(id) {
  const species = await fetchSpecies(id);
  const findGeneration = species.generation;
  const generation = findGeneration.name;
  // console.log(generation);
  // console.log(typeof generation);
  return generation;
}

// fetchGeneration(1);

export function normalizeGeneration(genString) {
  const map = {
    "generation-i": 1,
    "generation-ii": 2,
    "generation-iii": 3,
    "generation-iv": 4,
    "generation-v": 5,
    "generation-vi": 6,
    "generation-vii": 7,
    "generation-viii": 8,
    "generation-ix": 9,
  };

  return map[genString];
}
