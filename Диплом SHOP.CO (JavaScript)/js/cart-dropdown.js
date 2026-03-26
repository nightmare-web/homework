export function initCartDropdown() {
	const cartButton = document.querySelector(".actions__cart-button");
	const cartDropdown = document.querySelector("#header-cart-dropdown");
	const searchButton = document.querySelector(".actions__search-button");
	const searchDropdown = document.querySelector("#header-search-dropdown");

	if (!cartButton || !cartDropdown) return;

	const isOpen = () => cartDropdown.classList.contains("cart-dropdown--open");

	const closeSearchDropdown = () => {
		if (!searchDropdown || !searchButton) return;
		searchDropdown.classList.remove("search-dropdown--open");
		searchButton.setAttribute("aria-expanded", "false");
	};

	const open = () => {
		document.dispatchEvent(new Event("header:close-menu"));
		document.dispatchEvent(new Event("header:close-shop"));
		closeSearchDropdown();

		cartDropdown.classList.add("cart-dropdown--open");
		cartButton.setAttribute("aria-expanded", "true");
	};

	const close = () => {
		cartDropdown.classList.remove("cart-dropdown--open");
		cartButton.setAttribute("aria-expanded", "false");
	};

	cartButton.addEventListener("click", (event) => {
		event.stopPropagation();
		isOpen() ? close() : open();
	});

	document.addEventListener("click", (event) => {
		if (!(event.target instanceof Node)) return;
		if (
			!cartDropdown.contains(event.target) &&
			!cartButton.contains(event.target)
		) {
			close();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") close();
	});

	document.addEventListener("header:menu-state", (event) => {
		if (event.detail?.isOpen) close();
	});

	document.addEventListener("header:close-cart", close);
}
