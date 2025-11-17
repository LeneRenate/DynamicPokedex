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

genButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log("GenBtn pressed");
    const gen = btn.dataset.gen;
    const [start, end] = genRanges[gen];

    pokemonCards.forEach((card) => {
      const id = Number(card.dataset.id);
      card.style.display = id >= start && id <= end ? "block" : "none";
    });
  });
});
