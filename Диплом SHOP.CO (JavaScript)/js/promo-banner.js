export function initPromoBanner() {
	document
		.querySelector(".promo-banner__button")
		?.addEventListener("click", function () {
			this.closest(".promo-banner").classList.add("promo-banner--hidden");
		});
}
