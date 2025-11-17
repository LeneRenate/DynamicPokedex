/* Establish api and html-connections */
export const BASE_URL = "https://pokeapi.co/api/v2";
export const IMG_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

/* Fetch a single Pokémon by name or ID */
export async function fetchPokemon(nameOrId) {
  const res = await fetch(
    `${BASE_URL}/pokemon/${String(nameOrId).toLowerCase()}`
  );
  return await res.json(); // returns full Pokémon object
}

/* Fetch the first n Pokémon as an array of objects */
export async function fetchFirstNPokemon(n) {
  const ids = [...Array(n)].map((_, i) => i + 1);
  // console.log(ids);

  // Fetch all in parallel
  const pokemonArray = await Promise.all(ids.map((id) => fetchPokemon(id)));

  // Return array of Pokémon objects
  return pokemonArray;
}

// console.log(fetchPokemon("ditto"));

export async function fetchTypes() {
  const res = await fetch(`${BASE_URL}/type`);
  return await res.json();
}

// console.log(fetchTypes());

// Species
export async function fetchSpecies(id) {
  const res = await fetch(`${BASE_URL}/pokemon-species/${id}`);
  return await res.json();
  // const data = await res.json();
  // console.log(data);
}

// console.log(fetchSpecies());
