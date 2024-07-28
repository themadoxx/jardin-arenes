const cardSection = document.querySelector(".card-section");
const cards = document.querySelector(".cards");
const cardElements = document.querySelectorAll(".card");
const cardSectionHeight = cardSection.offsetHeight;
const windowHeight = window.innerHeight;

window.addEventListener("scroll", () => {
  const scrollPosition = window.pageYOffset;
  const cardSectionTop = cardSection.offsetTop;

  if (
    scrollPosition > cardSectionTop - windowHeight / 2 &&
    scrollPosition < cardSectionTop + cardSectionHeight - windowHeight * 1.5
  ) {
    cards.classList.add("fixed");
    cardSection.style.paddingTop = `${windowHeight}px`;

    const progress =
      (scrollPosition - (cardSectionTop - windowHeight / 2)) /
      (windowHeight / 2);

    // Animation des cartes
    cardElements.forEach((card, index) => {
      if (index === 0) {
        // La première carte reste au centre
        card.style.transform = "translate(-50%, -50%)";
      } else {
        // Les autres cartes montent du bas
        const cardProgress = Math.max(
          0,
          Math.min(1, progress * 2 - (index - 1))
        );
        const yOffset = 100 - cardProgress * 150; // Commence plus bas et monte plus haut
        const scale = 0.9 + cardProgress * 0.1;
        const zIndex = 2 + cardProgress;

        card.style.transform = `translate(-50%, ${yOffset}%) scale(${scale})`;
        card.style.zIndex = zIndex;
      }
    });
  } else {
    cards.classList.remove("fixed");
    cardSection.style.paddingTop = "0";

    // Réinitialiser les positions des cartes
    cardElements.forEach((card, index) => {
      if (index === 0) {
        card.style.transform = "translate(-50%, -50%)";
      } else {
        card.style.transform = "translate(-50%, 100%)";
      }
    });
  }
});
