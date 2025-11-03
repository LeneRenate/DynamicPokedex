import { pokemonDisplay } from "../main";

/********* 
Making the main display of Pokemon
*********/

export function makePokemonCard(p) {
  const pokemonCard = document.createElement("article");
  // pokemonCard.id.add = p.name;
  // const pokeID = p.name;
  pokemonCard.classList.add("pokemonCard");
  // const pokemonImg = document.createElement("img");
  // pokemonImg.classList.add("pokemonImg");
  // pokemonImg.src = "";
  // const pokemonNumber = document.createElement("p");
  // pokemonNumber.classList.add("pokemonNumber");
  // pokemonNumber.textContent = "";
  const pokemonName = document.createElement("p");
  pokemonName.classList.add("pokemonName");
  pokemonName.textContent = p.name;
  pokemonCard.append(pokemonName);
  pokemonDisplay.append(pokemonCard);
}

// export function makePokemonCard(p) {
//   const pokemonCard = document.createElement("article");
//   pokemonCard.id.add = p.name;
//   const pokeID = p.name;
//   pokemonCard.classList.add("pokemonCard");
//   const pokemonImg = document.createElement("img");
//   pokemonImg.classList.add("pokemonImg");
//   pokemonImg.src = "";
//   const pokemonNumber = document.createElement("p");
//   pokemonNumber.classList.add("pokemonNumber");
//   pokemonNumber.textContent = "";
//   const pokemonName = document.createElement("p");
//   pokemonName.classList.add("pokemonName");
//   pokemonName.textContent = "";
//   pokemonCard.append(pokemonImg, pokemonNumber, pokemonName);
//   pokemonDisplay.append(pokemonCard);
// }
