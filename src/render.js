import { fetchFirstNPokemon, IMG_URL } from "./api.js";
import {
  capitalize,
  formatID,
  applyTypeStyles,
  fetchGeneration,
} from "./utils.js";

const pokemonDisplay = document.getElementById("pokemonDisplay");

/*  Making the main display of all pokemon */
export async function makePokemonCard(p) {
  const pokemonCard = document.createElement("article");
  pokemonCard.classList.add("pokemonCard");
  pokemonCard.dataset.id = p.id;
  const generation = await fetchGeneration(p.id);
  pokemonCard.classList.add(`${generation}`);

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
export async function renderPokemon() {
  // Get the first n Pokémon
  const allPokemon = await fetchFirstNPokemon(386);
  // Gen 1 - 3: 386
  // console.log(typeof allPokemon);

  // Iterate easily
  allPokemon.forEach((p) => {
    makePokemonCard(p);
  });
}
