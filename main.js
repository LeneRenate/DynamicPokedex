// fetch("https://pokeapi.co/api/v2/pokemon/bulbasaur")
//   .then((response) => response.json())
//   .then((data) => console.log(data));

/*** 
Base URL: https://pokeapi.co/api/v2
All pokemons: https://pokeapi.co/api/v2/pokemon
Specific pokemon: https://pokeapi.co/api/v2/pokemon/bulbasaur
OR
https://pokeapi.co/api/v2/pokemon/1

(`${API_BASE}/pokemon?limit=100000&offset=0`);
***/

const API_BASE = "https://pokeapi.co/api/v2";

async function loadPokemon(nameOrId) {
  try {
    const pokemon = await getJSON(`${API_BASE}/pokemon/${nameOrId}`);
  } catch (err) {
    alert(`Could not load Pokémon: ${err.message}`);
  }
}

import { makePokemonCard } from "./components/UI";
import { makeInfoCard } from "./components/infoCard";

const searchSection = document.getElementById("searchSection");
const typeGrid = document.getElementById("typeGrid");
const pokemonDisplay = document.getElementById("pokemonDisplay");

pokemonCard.addEventlistener("click", makeInfoCard());
