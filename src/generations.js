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
