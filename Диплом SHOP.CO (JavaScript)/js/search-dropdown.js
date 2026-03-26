export function initSearchDropdown() {
	const searchBtn = document.querySelector(".actions__search-button");
	const dropdown = document.querySelector("#header-search-dropdown");
	const input = dropdown?.querySelector(".search-dropdown__input");
	const burgerButton = document.querySelector(".header__burger");
	const searchMedia = window.matchMedia("(max-width: 992px)");

	if (!searchBtn || !dropdown || !input) return;

	const isOpen = () => dropdown.classList.contains("search-dropdown--open");

	const open = () => {
		document.dispatchEvent(new Event("header:close-menu"));
		document.dispatchEvent(new Event("header:close-cart"));
		document.dispatchEvent(new Event("header:close-shop"));

		dropdown.classList.add("search-dropdown--open");
		searchBtn.setAttribute("aria-expanded", "true");
		input.focus();
	};

	const close = () => {
		dropdown.classList.remove("search-dropdown--open");
		searchBtn.setAttribute("aria-expanded", "false");
	};

	document.addEventListener("header:close-search", close);

	searchBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		isOpen() ? close() : open();
	});

	burgerButton?.addEventListener("click", () => close());

	document.addEventListener("header:menu-state", (e) => {
		if (e.detail?.isOpen) close();
	});

	document.addEventListener("click", (e) => {
		if (!(e.target instanceof Node)) return;
		if (!dropdown.contains(e.target) && !searchBtn.contains(e.target)) close();
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") close();
	});

	const handleMediaChange = (e) => {
		if (!e.matches) close();
	};

	if (typeof searchMedia.addEventListener === "function") {
		searchMedia.addEventListener("change", handleMediaChange);
	} else if (typeof searchMedia.addListener === "function") {
		searchMedia.addListener(handleMediaChange);
	}
}
