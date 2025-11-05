/*** 
Base URL: https://pokeapi.co/api/v2
All pokemons: https://pokeapi.co/api/v2/pokemon
Specific pokemon: https://pokeapi.co/api/v2/pokemon/bulbasaur
OR
https://pokeapi.co/api/v2/pokemon/1
All types: https://pokeapi.co/api/v2/type

(`${BASE_URL
}/pokemon?limit=100000&offset=0`);
***/

/* Establish api and html-connections */

const BASE_URL = "https://pokeapi.co/api/v2";
const searchSection = document.getElementById("searchSection");
const typeGrid = document.getElementById("typeGrid");
const pokemonDisplay = document.getElementById("pokemonDisplay");

// Easy function to capitalize the first letter
function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

/* Fetch a single Pokémon by name or ID */
async function fetchPokemon(nameOrId) {
  const res = await fetch(
    `${BASE_URL}/pokemon/${String(nameOrId).toLowerCase()}`
  );
  return await res.json(); // returns full Pokémon object
}

/*  Making the main display of all pokemon */
function makePokemonCard(p) {
  const pokemonCard = document.createElement("article");
  pokemonCard.classList.add("pokemonCard");
  pokemonCard.dataset.id = p.id;
  const pokemonTypes = p.types.map((t) => t.type.name);
  if (pokemonTypes.length === 2) {
    pokemonCard.classList.add(pokemonTypes[0]);
    pokemonCard.classList.add(pokemonTypes[1]);
    pokemonCard.style.backgroundImage = `
    linear-gradient(
      129.8deg,
      var(--${pokemonTypes[0]}) 30%, 
      var(--${pokemonTypes[0]}), 
      var(--${pokemonTypes[1]}), 
      var(--${pokemonTypes[1]}) 70%
    )`;
    // pokemonCard.style.borderColor = `var(--${pokemonTypes[0]}-border)`;
    pokemonCard.style.borderTopColor = `var(--${pokemonTypes[0]}-border)`;
    pokemonCard.style.borderLeftColor = `var(--${pokemonTypes[0]}-border)`;
    pokemonCard.style.borderRightColor = `var(--${pokemonTypes[1]}-border)`;
    pokemonCard.style.borderBottomColor = `var(--${pokemonTypes[1]}-border)`;
  } else {
    pokemonCard.classList.add(pokemonTypes[0]);
    pokemonCard.style.backgroundColor = `var(--${pokemonTypes[0]})`;
    pokemonCard.style.borderColor = `var(--${pokemonTypes[0]}-border)`;
  }
  const pokemonImg = document.createElement("img");
  pokemonImg.classList.add("pokemonImg");
  pokemonImg.src = `ImagesPokemon/${p.name}.png`;
  const pokemonTag = document.createElement("div");
  pokemonTag.classList.add("pokemonTag");
  const pokemonNumber = document.createElement("p");
  pokemonNumber.classList.add("pokemonNumber");
  pokemonNumber.textContent = "#" + p.id;
  const pokemonName = document.createElement("p");
  pokemonName.classList.add("pokemonName");
  pokemonName.textContent = capitalize(p.name);
  pokemonTag.append(pokemonNumber, pokemonName);
  pokemonCard.append(pokemonImg, pokemonTag);
  pokemonDisplay.append(pokemonCard);
}

/* Fetch the first n Pokémon as an array of objects */
async function fetchFirstNPokemon(n) {
  const ids = [...Array(n)].map((_, i) => i + 1);
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
  const allPokemon = await fetchFirstNPokemon(151);
  // console.log(typeof allPokemon);

  // Iterate easily
  allPokemon.forEach((p) => {
    makePokemonCard(p);
  });
}

async function fetchTypes() {
  const res = await fetch(`${BASE_URL}/type`);
  return await res.json();
}

// console.log(fetchTypes());

const typesArray = [];

async function makeTypeArray() {
  const types = await fetchTypes();
  // console.log(types.results[17]);
  for (let i = 0; i < 18; i++) {
    typesArray.push(types.results[i].name);
  }
  // console.log(typesArray);
}

async function renderTypes() {
  await makeTypeArray();
  for (let i = 0; i < 18; i++) {
    // 8 and 16 represents types not present in gen 1
    if (i === 8 || i === 16) {
      continue;
    } else {
      const typeBtn = document.createElement("button");
      typeBtn.classList.add("typeBtn");
      typeBtn.classList.add(typesArray[i]);
      typeBtn.textContent = capitalize(typesArray[i]);
      typeBtn.style.backgroundColor = `var(--${typesArray[i]})`;
      typeBtn.style.borderColor = `var(--${typesArray[i]}-border)`;
      typeGrid.append(typeBtn);
    }
  }

  const resetBtn = document.createElement("button");
  resetBtn.classList.add("typeBtn", "resetBtn");
  resetBtn.textContent = "Show all";
  typeGrid.append(resetBtn);
}

async function filterByType() {
  await renderPokemon(); // await all pokemonCards
  await renderTypes(); // await all typeBtns

  const typeButtons = document.querySelectorAll(".typeBtn");
  const pokemonCards = document.querySelectorAll(".pokemonCard");

  typeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.textContent.toLowerCase();

      // ResetBtn
      if (type === "show all") {
        pokemonCards.forEach((card) => {
          card.style.display = "flex";
        });
        return;
      }

      // Actual filter by type-function
      pokemonCards.forEach((card) => {
        card.style.display = card.classList.contains(type) ? "flex" : "none";
      });
    });
  });
}

filterByType();
