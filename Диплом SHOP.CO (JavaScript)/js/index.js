import { initPromoBanner } from "./promo-banner.js";
import { initModal } from "./modal.js";
import { initBurgerMenu } from "./burger.js";
import { initMenuDropdown } from "./menu-dropdown.js";
import { initSearchDropdown } from "./search-dropdown.js";
import { initCartDropdown } from "./cart-dropdown.js";
import { initReviewsSlider } from "./reviews.js";

function initApp() {
	initPromoBanner();
	initModal();
	initBurgerMenu();
	initMenuDropdown();
	initSearchDropdown();
	initCartDropdown();
	initReviewsSlider();
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initApp, { once: true });
} else {
	initApp();
}
