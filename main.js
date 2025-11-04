/*** 
Base URL: https://pokeapi.co/api/v2
All pokemons: https://pokeapi.co/api/v2/pokemon
Specific pokemon: https://pokeapi.co/api/v2/pokemon/bulbasaur
OR
https://pokeapi.co/api/v2/pokemon/1

(`${API_BASE}/pokemon?limit=100000&offset=0`);
***/

/** Establish api and html-connections */
const API_BASE = "https://pokeapi.co/api/v2";
const searchSection = document.getElementById("searchSection");
const typeGrid = document.getElementById("typeGrid");
const pokemonDisplay = document.getElementById("pokemonDisplay");

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

/** Fetch a single Pokémon by name or ID */
async function fetchPokemon(nameOrId) {
  const res = await fetch(
    `${API_BASE}/pokemon/${String(nameOrId).toLowerCase()}`
  );
  return await res.json(); // returns full Pokémon object
}

/**  Making the main display of all pokemon */
function makePokemonCard(p) {
  const pokemonCard = document.createElement("article");
  pokemonCard.classList.add("pokemonCard");
  const pokemonTypes = p.types.map((t) => t.type.name);
  // console.log(types.length);
  if (pokemonTypes.length === 2) {
    pokemonCard.classList.add(pokemonTypes[0]);
    pokemonCard.classList.add(pokemonTypes[1]);
  } else {
    pokemonCard.classList.add(pokemonTypes[0]);
  }
  const pokemonImg = document.createElement("img");
  pokemonImg.classList.add("pokemonImg");
  pokemonImg.src = `ImagesPokemon/${p.name}.png`;
  const pokemonNumber = document.createElement("p");
  pokemonNumber.classList.add("pokemonNumber");
  pokemonNumber.textContent = "#" + p.id;
  const pokemonName = document.createElement("p");
  pokemonName.classList.add("pokemonName");
  pokemonName.textContent = capitalize(p.name);
  pokemonCard.append(pokemonImg, pokemonNumber, pokemonName);
  pokemonDisplay.append(pokemonCard);
}

/** Fetch the first n Pokémon as an array of objects */
async function fetchFirstNPokemon(n) {
  const ids = Array.from({ length: n }, (_, i) => i + 1);
  // console.log(ids);

  // Fetch all in parallel
  const pokemonArray = await Promise.all(ids.map((id) => fetchPokemon(id)));

  // Return array of Pokémon objects
  return pokemonArray;
}

// console.log(fetchPokemon("ditto"));

/** Showing all pokemons*/
async function renderPokemon() {
  // Get the first 10 Pokémon
  const displayedPokemon = await fetchFirstNPokemon(9);
  // console.log(firstTen);

  // Iterate easily
  displayedPokemon.forEach((p) => {
    makePokemonCard(p);
  });
}

renderPokemon();

async function fetchTypes() {
  const res = await fetch(`${API_BASE}/type`);
  return await res.json();
}

console.log(fetchTypes());

async function makeTypeArray() {
  const types = await fetchTypes;
}

makeTypeArray();

// const displayedTypes = await fetchTypes();

// const types = p.types.map((t) => t.type.name);
