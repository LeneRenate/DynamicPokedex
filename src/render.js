import { fetchFirstNPokemon, IMG_URL } from "./api.js";
import { findGeneration } from "./generations.js";
import { capitalize, formatID, applyTypeStyles } from "./utils.js";

const pokemonDisplay = document.getElementById("pokemonDisplay");

/*  Making the main display of all pokemon */
export async function makePokemonCard(p) {
  const pokemonCard = document.createElement("article");
  pokemonCard.classList.add("pokemonCard");
  pokemonCard.dataset.id = p.id;
  const generation = findGeneration(p.id);
  console.log(generation);

  pokemonCard.classList.add(`gen${generation}`);
  pokemonCard.style.borderColor = `var(--gen${generation})`;

  // For styling purposes
  const pokemonTag = document.createElement("div");
  pokemonTag.classList.add("pokemonTag");

  const pokemonTypes = p.types.map((t) => t.type.name);
  if (pokemonTypes.length === 2) {
    pokemonCard.classList.add(pokemonTypes[0]);
    pokemonCard.classList.add(pokemonTypes[1]);
  } else {
    pokemonCard.classList.add(pokemonTypes[0]);
  }
  applyTypeStyles(pokemonCard, pokemonTypes);

  const pokemonImg = document.createElement("img");
  pokemonImg.classList.add("pokemonImg");
  pokemonImg.src = `${IMG_URL}${p.id}.png`;

  const pokemonNumber = document.createElement("p");
  pokemonNumber.classList.add("pokemonNumber");
  pokemonNumber.textContent = formatID(p.id);

  const pokemonName = document.createElement("p");
  pokemonName.classList.add("pokemonName");
  pokemonName.textContent = capitalize(p.name);

  pokemonTag.append(pokemonNumber, pokemonName);
  pokemonCard.append(pokemonImg, pokemonTag);
  pokemonDisplay.append(pokemonCard);
}

/** Showing all pokemons*/
export async function renderPokemon(n) {
  const allPokemon = await fetchFirstNPokemon(n);

  // Sort by ID in ascending order (1, 2, 3, ...)
  allPokemon.sort((a, b) => a.id - b.id);

  Promise.all(allPokemon.map((p) => makePokemonCard(p)));
}
