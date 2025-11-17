/*** 
Base URL: https://pokeapi.co/api/v2
All pokemons: https://pokeapi.co/api/v2/pokemon
Specific pokemon: https://pokeapi.co/api/v2/pokemon/bulbasaur
OR
https://pokeapi.co/api/v2/pokemon/1
All types: https://pokeapi.co/api/v2/type

(`${BASE_URL
}/pokemon?limit=100000&offset=0`);

Image-URL
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png

***/

// const searchSection = document.getElementById("searchSection");

import { renderPokemon } from "./src/render.js";
import { renderTypes, filterByType } from "./src/types.js";
import { activateModal } from "./src/modal.js";
// import { makeGenArray } from "./src/generations.js";

async function main() {
  // Start function
  await renderPokemon(386); // Render the pokemonCards once
  await renderTypes(); // Render the typeBtns once
  filterByType(); // Add eventlisteners to all typeBtns
  activateModal(); // Add eventlisteners to all pokemonCards
}

main();
