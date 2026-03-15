const modal = document.querySelector(".modal");
const modalWindow = modal?.querySelector(".modal__window");
const closeButton = modal?.querySelector(".modal__close");
const pageBody = document.querySelector(".page__body");

const openers = document.querySelectorAll(
	".promo-banner__link, .actions__account-button"
);

if (modal && modalWindow) {
	let lastActiveElement = null;

	const getFocusableElements = () =>
		[...modalWindow.querySelectorAll(
			'input, button, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
		)].filter((el) => !el.hasAttribute("disabled"));

	const setModalState = (isOpen) => {
		modal.classList.toggle("modal--open", isOpen);
		modalWindow.classList.toggle("modal__window--open", isOpen);
		modal.setAttribute("aria-hidden", String(!isOpen));

		if (pageBody) {
			pageBody.style.overflow = isOpen ? "hidden" : "";
		}

		if (isOpen) {
			const focusable = getFocusableElements();
			focusable[0]?.focus();
		} else if (lastActiveElement instanceof HTMLElement) {
			lastActiveElement.focus();
		}
	};

	const openModal = () => {
		if (modal.classList.contains("modal--open")) {
			return;
		}

		lastActiveElement = document.activeElement;
		setModalState(true);
	};

	const closeModal = () => {
		if (!modal.classList.contains("modal--open")) {
			return;
		}

		setModalState(false);
	};

	openers.forEach((opener) => {
		opener.addEventListener("click", (event) => {
			event.preventDefault();
			openModal();
		});
	});

	closeButton?.addEventListener("click", (event) => {
		event.preventDefault();
		closeModal();
	});

	modal.addEventListener("click", (event) => {
		if (event.target === modal) {
			closeModal();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (!modal.classList.contains("modal--open")) {
			return;
		}

		if (event.key === "Escape") {
			closeModal();
		}

		if (event.key === "Tab") {
			const focusable = getFocusableElements();
			if (focusable.length === 0) {
				event.preventDefault();
				return;
			}

			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			const active = document.activeElement;

			if (event.shiftKey && active === first) {
				event.preventDefault();
				last.focus();
				return;
			}

			if (!event.shiftKey && active === last) {
				event.preventDefault();
				first.focus();
			}
		}
	});

	setModalState(false);
}
