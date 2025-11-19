export let selectedType = null;
export let selectedGens = [];

export function applyFilters() {
  const cards = document.querySelectorAll(".pokemonCard");

  cards.forEach((card) => {
    const cardGen = [...card.classList]
      .find((c) => c.startsWith("gen"))
      ?.slice(3);
    const cardTypes = [...card.classList];

    const matchGen =
      selectedGens.length === 0 || selectedGens.includes(cardGen);

    const matchType = !selectedType || cardTypes.includes(selectedType);

    card.style.display = matchGen && matchType ? "flex" : "none";
  });
}
