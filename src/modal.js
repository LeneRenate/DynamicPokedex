import { fetchPokemon, IMG_URL } from "./api.js";
import {
  capitalize,
  formatID,
  applyTypeStyles,
  fetchCategory,
} from "./utils.js";

// MODAL  -  Pop-up info on all pokemons
const pokeModal = document.getElementById("myModal");
const closeBtn = document.getElementById("close");

async function makeModal(id) {
  pokeModal.textContent = "";

  const pokemon = await fetchPokemon(id);
  // console.log(pokemon);
  const types = pokemon.types.map((t) => t.type.name);

  // Apply background & border colors based on type(s)
  applyTypeStyles(pokeModal, types);
  if (types.length === 2) {
    const [t1, t2] = types;
    pokeModal.style.borderTopColor = `var(--${t1}-border)`;
    pokeModal.style.borderLeftColor = `var(--${t1}-border)`;
    pokeModal.style.borderRightColor = `var(--${t2}-border)`;
    pokeModal.style.borderBottomColor = `var(--${t2}-border)`;
  } else {
    const t = types[0];
    pokeModal.style.borderColor = `var(--${t}-border)`;
  }

  // Header > ID, name & img
  const idArticle = document.createElement("article");
  idArticle.classList.add("idArticle");

  const modalID = document.createElement("p");
  modalID.classList.add("modalID");
  modalID.textContent = formatID(pokemon.id);

  const modalName = document.createElement("p");
  modalName.classList.add("modalName");
  modalName.textContent = capitalize(pokemon.name);

  const modalImg = document.createElement("img");
  modalImg.classList.add("modalImg");
  modalImg.src = `${IMG_URL}${pokemon.id}.png`;

  idArticle.append(modalID, modalName, modalImg);

  // Base Info Section
  const baseArticle = document.createElement("article");
  baseArticle.classList.add("baseArticle");

  const modalType = document.createElement("p");
  modalType.classList.add("modalType");
  modalType.textContent =
    types.length === 2
      ? `TYPES: ${types[0]} / ${types[1]}`
      : `TYPE: ${types[0]}`;

  const modalCategory = document.createElement("p");
  modalCategory.classList.add("modalCategory");
  const category = await fetchCategory(id);
  console.log(typeof category);
  modalCategory.textContent = `CATEGORY: ${category}`;

  const modalHeight = document.createElement("p");
  modalHeight.classList.add("modalHeight");
  modalHeight.textContent = `HEIGHT: ${(pokemon.height / 10).toFixed(1)} m`;

  const modalWeight = document.createElement("p");
  modalWeight.classList.add("modalWeight");
  modalWeight.textContent = `WEIGHT: ${(pokemon.weight / 10).toFixed(1)} kg`;

  const modalAbilities = document.createElement("p");
  modalAbilities.classList.add("modalAbilities");
  modalAbilities.textContent = `ABILITIES: ${pokemon.abilities
    .map((a) => a.ability.name)
    .join(", ")}`;

  baseArticle.append(
    modalType,
    modalCategory,
    modalHeight,
    modalWeight,
    modalAbilities
  );
  const statsArticle = document.createElement("article");
  statsArticle.classList.add("statsArticle");

  // const movesArticle = document.createElement("article");

  pokeModal.append(closeBtn, idArticle, baseArticle);
}

export async function activateModal() {
  const pokemonCards = document.querySelectorAll(".pokemonCard");

  pokemonCards.forEach((card) => {
    card.addEventListener("click", async () => {
      // console.log("modal activated");
      const id = card.dataset.id;
      await makeModal(id);

      // To center the modal when activated
      pokeModal.style.top = "50%";
      pokeModal.style.left = "50%";
      pokeModal.style.transform = "translate(-50%,-50%)";
      pokeModal.style.zIndex = "1";
    });
  });
}

function closeModal() {
  pokeModal.style.top = "-100%";
}

// window.addEventListener("click", () => {
//   closeModal();
// });

closeBtn.addEventListener("click", () => {
  closeModal();
});

document.addEventListener("keydown", (e) => {
  if ((e.key = "ESC")) {
    closeModal();
  }
});
