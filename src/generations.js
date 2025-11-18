/**
Make btn for all generations
Add eventlistener to all btns
    > filter-function
Reset? Or?
**/

const genRanges = {
  1: [1, 151],
  2: [152, 251],
  3: [252, 386],
  4: [387, 493],
  5: [494, 649],
  6: [650, 721],
  7: [722, 809],
  8: [810, 905],
  9: [906, 1025],
};

const genButtons = document.querySelectorAll(".genBtn");
const pokemonCards = document.querySelectorAll(".pokemonCard");

let selectedGens = [];

export function genToggle() {
  genButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("genBtn pressed");
      const gen = btn.dataset.gen;

      btn.classList.toggle("active");

      if (btn.classList.contains("active")) {
        selectedGens.push(gen);
      } else {
        selectedGens = selectedGens.filter((g) => g !== gen);
      }

      filterPokemonCards();
    });
  });
}

function filterPokemonCards() {
  pokemonCards.forEach((card) => {
    const cardGen = card.dataset.generation;

    if (selectedGens.length === 0) {
      card.style.display = "block";
      return;
    }

    card.style.display = selectedGens.includes(cardGen) ? "block" : "none";
  });
}
