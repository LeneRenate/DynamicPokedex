import { fetchTypes } from "./api.js";
import { capitalize } from "./utils.js";

const typeGrid = document.getElementById("typeGrid");

async function makeTypeArray() {
  const types = await fetchTypes();
  return types.results.slice(0, 18).map((t) => t.name);
}

export async function renderTypes() {
  const types = await makeTypeArray();

  types.forEach((t, i) => {
    const btn = document.createElement("button");
    btn.classList.add("typeBtn", t);
    btn.textContent = capitalize(t);
    btn.style.backgroundColor = `var(--${t})`;
    btn.style.borderColor = `var(--${t}-border)`;
    typeGrid.append(btn);
  });

  const resetBtn = document.createElement("button");
  resetBtn.classList.add("typeBtn", "resetBtn");
  resetBtn.textContent = "Show all";
  typeGrid.append(resetBtn);
}

export function filterByType() {
  const typeButtons = document.querySelectorAll(".typeBtn");
  const pokemonCards = document.querySelectorAll(".pokemonCard");

  typeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.textContent.toLowerCase();
      console.log("filtering?");

      // ResetBtn
      if (type === "show all") {
        pokemonCards.forEach((card) => (card.style.display = "flex"));
        return;
      }

      // Actual filter by type-function
      pokemonCards.forEach((card) => {
        card.style.display = card.classList.contains(type) ? "flex" : "none";
      });
    });
  });
}
