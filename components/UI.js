/********* 
Making the main display of Pokemon
*********/

export function makePokemonCard() {
    const pokemonCard = document.createElement("article");
    pokemonCard.classList.add("pokemonCard");
    const pokemonImg = document.createElement("img");
    pokemonImg.classList.add("pokemonImg");
    pokemonImg.src = '';
    const pokemonNumber = document.createElement("p");
    pokemonNumber.classList.add("pokemonNumber");
    pokemonNumber.textContent = '';
    const pokemonName = document.createElement("p");
    pokemonName.classList.add("pokemonName");
    pokemonName.textContent = '';
    pokemonCard.append(pokemonImg, pokemonNumber, pokemonName);
};