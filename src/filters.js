export const selectedGens = [];
export let selectedType = null;

export function applyFilters() {
  const cards = document.querySelectorAll(".pokemonCard");

  cards.forEach((card) => {
    // Gen-check
    const cardGen = Number(
      [...card.classList].find((c) => c.startsWith("gen"))?.slice(3)
    );

    // Type-check
    const cardTypes = [...card.classList];

    const matchGen =
      selectedGens.length === 0 || selectedGens.includes(cardGen);

    const matchType = !selectedType || cardTypes.includes(selectedType);

    card.style.display = matchGen && matchType ? "flex" : "none";
  });
}

export function setSelectedType(type) {
  selectedType = type;
}
