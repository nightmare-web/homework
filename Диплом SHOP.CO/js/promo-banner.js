const promoBanner = document.querySelector(".promo-banner");
const promoBannerCloseButton = document.querySelector(".promo-banner__close");

if (promoBanner && promoBannerCloseButton) {
	promoBannerCloseButton.addEventListener("click", () => {
		promoBanner.classList.add("promo-banner--hidden");
	});
}
