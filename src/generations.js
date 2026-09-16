import { applyFilters, selectedGens } from "./filters.js";

export function genToggle() {
  const genButtons = document.querySelectorAll(".genBtn");

  genButtons.forEach((btn) => {
    btn.style.borderColor = `var(--gen${btn.dataset.gen})`;

    btn.addEventListener("click", () => {
      console.log("genBtn pressed");
      const gen = Number(btn.dataset.gen);
      btn.classList.toggle("active");

      if (btn.classList.contains("active")) {
        if (!selectedGens.includes(gen)) {
          selectedGens.push(gen);
        }
        btn.style.backgroundColor = "seagreen";
        btn.style.boxShadow = "0px 0px 5px mediumseagreen";
      } else {
        const idx = selectedGens.indexOf(gen);
        if (idx !== -1) {
          selectedGens.splice(idx, 1);
        }
        btn.style.backgroundColor = "#F0F0F0";
        btn.style.boxShadow = "none";
      }

      // filterPokemonCards();
      applyFilters();
    });
  });
}

export function findGeneration(pokeId) {
  const id = pokeId;
  let generation = "";
  switch (true) {
    case id <= 151:
      generation = "1";
      break;
    case id <= 251:
      generation = "2";
      break;
    case id <= 386:
      generation = "3";
      break;
    case id <= 493:
      generation = "4";
      break;
    case id <= 649:
      generation = "5";
      break;
    case id <= 721:
      generation = "6";
      break;
    case id <= 809:
      generation = "7";
      break;
    case id <= 905:
      generation = "8";
      break;
    case id <= 1025:
      generation = "9";
      break;
  }
  return generation;
}
