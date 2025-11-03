const API_BASE = "https://pokeapi.co/api/v2/pokemon";

/** Fetch a single Pokémon by name or ID */
async function fetchPokemon(nameOrId) {
  const res = await fetch(`${API_BASE}/${nameOrId.toLowerCase()}`);
  return await res.json(); // returns full Pokémon object
}

/** Fetch the first n Pokémon as an array of objects */
async function fetchFirstNPokemon(n) {
  const ids = Array.from({ length: n }, (_, i) => i + 1);

  // Fetch all in parallel
  const pokemonArray = await Promise.all(ids.map((id) => fetchPokemon(id)));

  // Return array of Pokémon objects
  return pokemonArray;
}

/** Example usage */
async function example() {
  // Get the first 10 Pokémon
  const testArray = await fetchFirstNPokemon(6);

  // Iterate easily
  firstTen.forEach((p) => {
    console.log(p.name); // "bulbasaur", "ivysaur", etc.
    console.log(p.id); // Pokémon ID
    console.log(p.types); // Array of type objects
    console.log(p.sprites.front_default); // sprite image
  });

  // Fetch a specific Pokémon by name
  const pikachu = await fetchPokemon("pikachu");
  console.log(pikachu);
}

const pikachu = await fetchPokemon("122");
console.log(pikachu);
