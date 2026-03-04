const promo = document.querySelector(".promo-banner");
const closeBtn = document.querySelector(".promo-banner__button");

closeBtn?.addEventListener("click", () => {
	promo?.classList.add("promo-banner--hidden");
});
