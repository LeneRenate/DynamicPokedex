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
  pokemonTypes.forEach((type) => pokemonCard.classList.add(type));
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
    // [16] = dark, and no dark pokemons within gen 1
    if (i === 16) {
      continue;
    } else {
      const typeBtn = document.createElement("button");
      typeBtn.classList.add("typeBtn");
      typeBtn.classList.add(typesArray[i]);
      typeBtn.textContent = capitalize(typesArray[i]);
      typeGrid.append(typeBtn);
    }
  }
}

async function filterByType() {
  await renderPokemon(); // await all pokemonCards
  await renderTypes(); // await all typeBtns

  const typeButtons = document.querySelectorAll(".typeBtn");
  const pokemonCards = document.querySelectorAll(".pokemonCard");

  typeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.textContent.trim().toLowerCase();
      pokemonCards.forEach((card) => {
        card.style.display = card.classList.contains(type) ? "flex" : "none";
      });
    });
  });
}

filterByType();

const pokeModal = document.getElementById("myModal");
const pikachu = fetchPokemon(25);

async function makeModal(p) {
  const pokemon = await fetchPokemon(p);
  console.log(pokemon);
  const idArticle = document.createElement("article");
  idArticle.classList.add("idArticle");
  const modalID = document.createElement("p");
  modalID.classList.add("modalID");
  modalID.textContent = "#0" + pokemon.id;
  const modalName = document.createElement("p");
  modalName.classList.add("modalName");
  modalName.textContent = capitalize(pokemon.name);
  const modalImg = document.createElement("img");
  modalImg.classList.add("modalImg");
  modalImg.src = `ImagesPokemon/${pokemon.name}.png`;
  idArticle.append(modalID, modalName, modalImg);

  const baseArticle = document.createElement("article");
  baseArticle.classList.add("baseArticle");
  const modalType = document.createElement("p");
  modalType.classList.add("modalType");
  const pokemonTypes = pokemon.types.map((t) => t.type.name);
  // console.log(typeof pokemonTypes);
  if (pokemonTypes.length === 2) {
    modalType.textContent = `Types: ${pokemonTypes[0]}, ${pokemonTypes[1]}`;
  } else {
    modalType.textContent = `Type: ${pokemonTypes[0]}`;
  }
  const modalCategory = document.createElement("p");
  modalCategory.classList.add("modalCategory");
  modalCategory.textContent = "";
  const modalHeight = document.createElement("p");
  modalHeight.classList.add("modalHeight");
  modalHeight.textContent = `Height: ${(pokemon.height / 10).toFixed(1)} m`;
  const modalWeight = document.createElement("p");
  modalWeight.classList.add("modalWeight");
  modalWeight.textContent = `Weight: ${(pokemon.weight / 10).toFixed(1)} kg`;
  const modalAbilities = document.createElement("p");
  modalAbilities.classList.add("modalAbilities");
  modalAbilities.textContent = "";
  baseArticle.append(
    modalType,
    modalCategory,
    modalHeight,
    modalWeight,
    modalAbilities
  );

  // const statsArticle = document.createElement("article");

  // const movesArticle = document.createElement("article");

  pokeModal.append(idArticle, baseArticle);
}

function activateModal() {
  const pokemonCards = document.querySelectorAll(".pokemonCard");
  pokemonCards.forEach((card) => {
    card.addEventListener("click", async () => {
      const id = card.dataset.id;
      const pokemon = await fetchPokemon(id);
      console.log(pokemon);
      // makeModal(pokemon);
    });
  });
}

activateModal();

// makeModal(25);

// function activateModal() {
//   const pokemonCards = document.querySelectorAll(".pokemonCard");
//   pokemonCards.forEach((card) => {
//     card.addEventListener("click", async () => {
//       const pokemon = await fetchPokemon(card.id);
//       makeModal(pokemon);
//       pokeModal.style.top = "50%";
//       pokeModal.style.left = "50%";
//       pokeModal.style.transform = "translate(-50%, -50%)";
//       pokeModal.style.zIndex = "1";
//     });
//   });
// }

// MODAL  -  Pop-up info on all pokemons
/*
Lag modal i html med placeholders for relevant pokemondata

gi den position absolute, overflow hidden og plasser den utenfor viewport 

når pokemon blir trykket på, endre position på modal slik at den plasseres midt på skjerm med z-index > 0 og data til pokemon trykket på(sikkert med event.target) 

X- i hjørnet reverserer prosessen slik at modalen forsvinner fra viewport igjen
*/

/*
<!-- The Modal -->
<div id="myModal" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
  </div>
</div>
*/
