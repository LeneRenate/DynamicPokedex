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
import { genToggle } from "./src/generations.js";
import { applyFilters, selectedGens } from "./src/filters.js";

async function main() {
  const loadingScreen = document.getElementById("loadingScreen");

  // Start function
  await renderTypes(); // Render the typeBtns once
  filterByType(); // Add eventlisteners to all typeBtns

  await renderPokemon(1025); // Render all the pokemonCards once

  // Only show gen 1 on load, with active toggle on gen1-btn
  selectedGens.push(1);
  applyFilters();

  const gen1Btn = document.querySelector(`.genBtn[data-gen="1"]`);
  if (gen1Btn) {
    gen1Btn.classList.add(`active`);
    gen1Btn.style.backgroundColor = "seagreen";
    gen1Btn.style.boxShadow = "0px 0px 5px mediumseagreen";
  }

  activateModal(); // Add eventlisteners to all pokemonCards
  genToggle();

  // Hide loading screen when everything is done
  loadingScreen.style.display = "none";
}

main();
