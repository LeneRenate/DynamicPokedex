import { fetchTypes } from "./api.js";
import { applyFilters, setSelectedType } from "./filters.js";
import { capitalize } from "./utils.js";

const typeGrid = document.getElementById("typeGrid");

async function makeTypeArray() {
  const types = await fetchTypes();
  return types.results.slice(0, 18).map((t) => t.name);
}

export async function renderTypes() {
  const types = await makeTypeArray();

  types.forEach((t) => {
    const btn = document.createElement("button");
    btn.classList.add("typeBtn", t);
    btn.dataset.type = t;
    btn.textContent = capitalize(t);
    btn.style.backgroundColor = `var(--${t})`;
    btn.style.borderColor = `var(--${t}-border)`;
    typeGrid.append(btn);
  });

  const resetBtn = document.createElement("button");
  resetBtn.classList.add("typeBtn", "resetBtn");
  resetBtn.dataset.type = "show all";
  resetBtn.textContent = "Show all";
  typeGrid.append(resetBtn);
}

export function filterByType() {
  const typeButtons = document.querySelectorAll(".typeBtn");

  typeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;
      console.log("filtering?");

      if (type === "show all") {
        setSelectedType(null);
      } else {
        // Actual filter by type-function
        setSelectedType(type);
      }

      applyFilters();
    });
  });
}
