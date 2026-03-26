export function initMenuDropdown() {
	document
		.querySelectorAll(".menu__item--has-submenu")
		.forEach((dropdownItem) => {
			const toggle = dropdownItem.querySelector(".menu__toggle");

			if (!toggle) return;

			const updateState = (isOpen) => {
				dropdownItem.classList.toggle("is-open", isOpen);
				toggle.setAttribute("aria-expanded", String(isOpen));
			};

			toggle.addEventListener("click", (e) => {
				e.stopPropagation();
				const nextIsOpen = !dropdownItem.classList.contains("is-open");
				if (nextIsOpen) {
					document.dispatchEvent(new Event("header:close-cart"));
					document.dispatchEvent(new Event("header:close-search"));
				}
				updateState(nextIsOpen);
			});

			document.addEventListener("click", (e) => {
				if (!dropdownItem.contains(e.target)) {
					updateState(false);
				}
			});

			document.addEventListener("keydown", (e) => {
				if (e.key === "Escape") {
					updateState(false);
				}
			});

			document.addEventListener("header:close-shop", () => {
				updateState(false);
			});
		});
}
