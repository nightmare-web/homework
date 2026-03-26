export function initModal() {
	const modal = document.querySelector(".modal");
	const modalWindow = modal?.querySelector(".modal__window");
	const closeButton = modal?.querySelector(".modal__close");
	const pageBody = document.querySelector(".page__body");
	const openers = document.querySelectorAll(
		".promo-banner__link, .actions__account-button",
	);

	if (!modal || !modalWindow) return;

	let lastActiveElement = null;
	let isOpen = false;

	const getFocusableElements = () => [
		...modalWindow.querySelectorAll(
			'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
		),
	];

	const setModalState = (show) => {
		isOpen = show;
		modal.classList.toggle("modal--open", show);
		modalWindow.classList.toggle("modal__window--open", show);
		modal.setAttribute("aria-hidden", String(!show));

		if (pageBody) {
			pageBody.style.overflow = show ? "hidden" : "";
		}

		if (show) {
			const focusable = getFocusableElements();
			focusable[0]?.focus();
		} else if (lastActiveElement instanceof HTMLElement) {
			lastActiveElement.focus();
		}
	};

	const openModal = () => {
		if (isOpen) return;
		lastActiveElement = document.activeElement;
		setModalState(true);
	};

	const closeModal = () => {
		if (!isOpen) return;
		setModalState(false);
	};

	openers.forEach((opener) => {
		opener.addEventListener("click", (event) => {
			event.preventDefault();
			openModal();
		});
	});

	closeButton?.addEventListener("click", closeModal);
	modal.addEventListener("click", (event) => {
		if (event.target === modal) closeModal();
	});

	document.addEventListener("keydown", (event) => {
		if (!isOpen) return;

		if (event.key === "Escape") {
			closeModal();
		}

		if (event.key === "Tab") {
			const focusable = getFocusableElements();
			if (focusable.length === 0) return;

			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			const current = document.activeElement;

			if (event.shiftKey && current === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && current === last) {
				event.preventDefault();
				first.focus();
			}
		}
	});

	setModalState(false);
}
