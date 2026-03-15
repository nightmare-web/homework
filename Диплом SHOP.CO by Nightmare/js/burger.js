const burgerButton = document.querySelector(".header__burger");
const headerMenu = document.querySelector(".header__menu");
const pageBody = document.querySelector(".page__body");
const mobileMedia = window.matchMedia("(max-width: 768px)");

if (burgerButton && headerMenu && pageBody) {
	const isMenuOpen = () => headerMenu.classList.contains("header__menu--open");

	const restoreFocusIfNeeded = () => {
		const activeElement = document.activeElement;

		if (
			activeElement instanceof HTMLElement &&
			headerMenu.contains(activeElement)
		) {
			burgerButton.focus();
		}
	};

	const setMenuState = (isOpen) => {
		if (!isOpen) {
			restoreFocusIfNeeded();
		}

		burgerButton.classList.toggle("burger--open", isOpen);
		headerMenu.classList.toggle("header__menu--open", isOpen);
		burgerButton.setAttribute("aria-expanded", String(isOpen));
		headerMenu.setAttribute("aria-hidden", String(!isOpen));
		pageBody.style.overflow = isOpen ? "hidden" : "";
	};

	const closeMenu = () => {
		if (!isMenuOpen()) {
			return;
		}

		setMenuState(false);
	};

	const toggleMenu = () => {
		if (!mobileMedia.matches) {
			return;
		}

		setMenuState(!isMenuOpen());
	};

	burgerButton.addEventListener("click", (event) => {
		event.stopPropagation();
		toggleMenu();
	});

	headerMenu.addEventListener("click", (event) => {
		const target = event.target;

		if (!(target instanceof Element)) {
			return;
		}

		if (target.closest(".menu__link")) {
			closeMenu();
		}
	});

	document.addEventListener("click", (event) => {
		if (!isMenuOpen()) {
			return;
		}

		const target = event.target;

		if (!(target instanceof Node)) {
			return;
		}

		const clickedInsideMenu = headerMenu.contains(target);
		const clickedBurger = burgerButton.contains(target);

		if (!clickedInsideMenu && !clickedBurger) {
			closeMenu();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			closeMenu();
		}
	});

	if (typeof mobileMedia.addEventListener === "function") {
		mobileMedia.addEventListener("change", (event) => {
			if (!event.matches) {
				closeMenu();
			}
		});
	} else if (typeof mobileMedia.addListener === "function") {
		mobileMedia.addListener((event) => {
			if (!event.matches) {
				closeMenu();
			}
		});
	}

	setMenuState(false);
}
