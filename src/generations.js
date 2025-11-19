let selectedGens = [];

export function genToggle() {
  const genButtons = document.querySelectorAll(".genBtn");

  if (!genButtons.length) {
    console.warn("Ingen .genBtn funnet når genToggle kjøres");
  }

  genButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("genBtn pressed");
      const gen = String(btn.dataset.gen);
      console.log(gen);
      btn.classList.toggle("active");

      if (btn.classList.contains("active")) {
        if (!selectedGens.includes(gen)) selectedGens.push(gen);
        btn.style.backgroundColor = "seagreen";
        btn.style.boxShadow = "0px 0px 5px mediumseagreen";
      } else {
        selectedGens = selectedGens.filter((g) => g !== gen);
        btn.style.backgroundColor = "white";
        btn.style.boxShadow = "none";
      }

      filterPokemonCards();
    });
  });
}

function filterPokemonCards() {
  const pokemonCards = document.querySelectorAll(".pokemonCard");

  pokemonCards.forEach((card) => {
    const match = selectedGens.some((gen) =>
      card.classList.contains(`gen${gen}`)
    );

    if (selectedGens.length === 0) {
      card.style.display = "flex";
    } else {
      card.style.display = match ? "flex" : "none";
    }
  });
}
