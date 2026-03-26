export function initBurgerMenu() {
	const burgerButton = document.querySelector(".header__burger");
	const headerMenu = document.querySelector(".header__menu");
	const pageBody = document.querySelector(".page__body");
	const mobileMedia = window.matchMedia("(max-width: 768px)");

	if (!burgerButton || !headerMenu || !pageBody) return;

	const isMenuOpen = () => headerMenu.classList.contains("header__menu--open");

	const restoreFocusIfNeeded = () => {
		const activeElement = document.activeElement;

		if (
			activeElement instanceof HTMLElement &&
			headerMenu.contains(activeElement) &&
			mobileMedia.matches
		) {
			burgerButton.focus();
		}
	};

	const updateMenuInteractivity = (isOpen) => {
		if (mobileMedia.matches) {
			headerMenu.inert = !isOpen;
		} else {
			headerMenu.inert = false;
		}
	};

	const setMenuState = (isOpen, options = {}) => {
		const { skipTransition = false, restoreFocus = true } = options;

		if (skipTransition) {
			headerMenu.style.transition = "none";
		}

		if (!isOpen && restoreFocus) {
			restoreFocusIfNeeded();
		}

		burgerButton.classList.toggle("burger--open", isOpen);
		headerMenu.classList.toggle("header__menu--open", isOpen);
		burgerButton.setAttribute("aria-expanded", String(isOpen));
		pageBody.style.overflow = mobileMedia.matches && isOpen ? "hidden" : "";

		updateMenuInteractivity(isOpen);

		document.dispatchEvent(
			new CustomEvent("header:menu-state", { detail: { isOpen } }),
		);

		if (skipTransition) {
			requestAnimationFrame(() => {
				headerMenu.style.transition = "";
			});
		}
	};

	const closeMenu = (options = {}) => {
		if (!isMenuOpen()) return;
		setMenuState(false, options);
	};

	const toggleMenu = () => {
		if (!mobileMedia.matches) return;
		setMenuState(!isMenuOpen());
	};

	const dragState = {
		active: false,
		pointerId: null,
		startX: 0,
		offsetX: 0,
		rafId: null,
	};

	const DRAG_CLOSE_THRESHOLD_RATIO = 0.3;
	const DRAG_CLOSE_MIN_PX = 80;

	const resetDragState = () => {
		dragState.active = false;
		dragState.pointerId = null;
		dragState.startX = 0;
		dragState.offsetX = 0;
		if (dragState.rafId !== null) {
			cancelAnimationFrame(dragState.rafId);
			dragState.rafId = null;
		}
	};

	const resetMenuDragStyles = () => {
		headerMenu.style.transition = "";
		headerMenu.style.transform = "";
	};

	const onDragStart = (event) => {
		if (!isMenuOpen() || !mobileMedia.matches) return;
		if (event.button !== undefined && event.button !== 0) return;
		if (!(event.target instanceof Node) || !headerMenu.contains(event.target)) {
			return;
		}

		dragState.active = true;
		dragState.pointerId = event.pointerId ?? null;
		dragState.startX = event.clientX;
		dragState.offsetX = 0;
		headerMenu.style.transition = "none";

		if (dragState.pointerId !== null) {
			try {
				headerMenu.setPointerCapture(dragState.pointerId);
			} catch {
				// no-op
			}
		}
	};

	const onDragMove = (event) => {
		if (!dragState.active) return;
		if (dragState.pointerId !== null && event.pointerId !== dragState.pointerId) {
			return;
		}

		const rawDeltaX = event.clientX - dragState.startX;
		dragState.offsetX = Math.min(0, rawDeltaX);

		if (dragState.rafId !== null) return;

		dragState.rafId = requestAnimationFrame(() => {
			headerMenu.style.transform = `translateX(${dragState.offsetX}px)`;
			dragState.rafId = null;
		});
	};

	const onDragEnd = (event) => {
		if (!dragState.active) return;
		if (dragState.pointerId !== null && event.pointerId !== dragState.pointerId) {
			return;
		}

		if (dragState.pointerId !== null) {
			try {
				headerMenu.releasePointerCapture(dragState.pointerId);
			} catch {
				// no-op
			}
		}

		const closeThreshold = Math.max(
			DRAG_CLOSE_MIN_PX,
			headerMenu.offsetWidth * DRAG_CLOSE_THRESHOLD_RATIO,
		);
		const shouldClose = Math.abs(dragState.offsetX) >= closeThreshold;

		if (shouldClose) {
			headerMenu.style.transition = "transform 0.22s ease";
			headerMenu.style.transform = "translateX(-100%)";

			const onCloseDragEnd = () => {
				headerMenu.removeEventListener("transitionend", onCloseDragEnd);
				closeMenu({ skipTransition: true, restoreFocus: false });
				resetMenuDragStyles();
				resetDragState();
			};

			headerMenu.addEventListener("transitionend", onCloseDragEnd);
			return;
		}

		headerMenu.style.transition = "transform 0.2s ease";
		headerMenu.style.transform = "translateX(0)";

		const onSnapBackEnd = () => {
			resetMenuDragStyles();
			headerMenu.removeEventListener("transitionend", onSnapBackEnd);
		};

		headerMenu.addEventListener("transitionend", onSnapBackEnd);
		resetDragState();
	};

	burgerButton.addEventListener("click", (event) => {
		event.stopPropagation();
		toggleMenu();
	});

	headerMenu.addEventListener("click", (event) => {
		const target = event.target;
		if (!(target instanceof Element)) return;

		if (target.closest(".menu__link")) {
			closeMenu();
		}
	});

	headerMenu.addEventListener("pointerdown", onDragStart);
	headerMenu.addEventListener("pointermove", onDragMove);
	headerMenu.addEventListener("pointerup", onDragEnd);
	headerMenu.addEventListener("pointercancel", onDragEnd);
	headerMenu.addEventListener("lostpointercapture", onDragEnd);

	document.addEventListener("click", (event) => {
		if (!isMenuOpen()) return;

		const target = event.target;
		if (!(target instanceof Node)) return;

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

	document.addEventListener("header:close-menu", closeMenu);

	const handleMediaChange = (event) => {
		if (!event.matches) {
			closeMenu();
			pageBody.style.overflow = "";
		}

		resetMenuDragStyles();
		resetDragState();
		updateMenuInteractivity(isMenuOpen());
	};

	if (typeof mobileMedia.addEventListener === "function") {
		mobileMedia.addEventListener("change", handleMediaChange);
	} else if (typeof mobileMedia.addListener === "function") {
		mobileMedia.addListener(handleMediaChange);
	}

	headerMenu.style.touchAction = "pan-y";
	headerMenu.style.willChange = "transform";
	setMenuState(false);
}
