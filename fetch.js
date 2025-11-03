import { API_BASE } from "./main";
import { makePokemonCard } from "./components/UI";

/** Fetch a single Pokémon by name or ID */
async function fetchPokemon(nameOrId) {
  const res = await fetch(
    `${API_BASE}/pokemon/${String(nameOrId).toLowerCase()}`
  );
  return await res.json(); // returns full Pokémon object
}

// console.log(fetchPokemon("89"));

/** Fetch the first n Pokémon as an array of objects */
async function fetchFirstNPokemon(n) {
  const ids = Array.from({ length: n }, (_, i) => i + 1);

  // Fetch all in parallel
  const pokemonArray = await Promise.all(ids.map((id) => fetchPokemon(id)));

  // Return array of Pokémon objects
  return pokemonArray;
}

// console.log(fetchFirstNPokemon(10));

/** Example usage*/
export async function example() {
  // Get the first 10 Pokémon
  const firstTen = await fetchFirstNPokemon(10);
  // console.log(firstTen);

  // Iterate easily
  firstTen.forEach((p) => {
    console.log(p.name);
    console.log(p.id);
    makePokemonCard(p);
  });

  // Fetch a specific Pokémon by name
  // const pikachu = await fetchPokemon("pikachu");
  // console.log(pikachu);
}
