const API_BASE = "https://pokeapi.co/api/v2/pokemon";

async function getPokemonData(nameOrId) {
  const res = await fetch(`${API_BASE}/${nameOrId}`);
  const data = await res.json();
  return data;
}

console.log(await getPokemonData("50"));
// const pokemonData = await getPokemonData();

// const pokemonDetails = await Promise.all(
//   pokemonData.results.map(async (pokemon) => {
//     const res = await fetch(pokemon.url);
//     const data = await res.json();
//     return data;
//   })
// );

// pokemonDetails.map((opkemon) => console.log(opkemon));
