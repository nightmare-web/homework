export function initReviewsSlider() {
	const track = document.querySelector(".reviews__track");
	const prevBtn = document.querySelector(".reviews__button--prev");
	const nextBtn = document.querySelector(".reviews__button--next");

	if (!track || !prevBtn || !nextBtn) {
		console.warn("Reviews slider: required elements not found.");
		return;
	}

	const DRAG_THRESHOLD_RATIO = 0.2;
	const ANIMATION_DURATION = "0.4s";

	let slides = [];
	let visible = 1;
	let index = 0;

	let drag = {
		active: false,
		startX: 0,
		offsetX: 0,
		baseX: 0,
		pointerId: null,
	};

	const getGap = () => parseFloat(getComputedStyle(track).gap) || 0;

	const getOriginalSlides = () => [
		...track.querySelectorAll(".review:not(.clone)"),
	];

	const getAllSlides = () => [...track.querySelectorAll(".review")];

	const getSlideWidth = () => {
		const slide = slides[0];
		if (!slide) return 0;
		return slide.offsetWidth + getGap();
	};

	const getVisibleSlides = () => {
		const container = track.parentElement;
		const firstOriginal = getOriginalSlides()[0];
		if (!container || !firstOriginal) return 1;

		const containerWidth = container.offsetWidth;
		const fullSlideWidth = firstOriginal.offsetWidth + getGap();

		return Math.max(
			1,
			Math.round((containerWidth + getGap()) / fullSlideWidth),
		);
	};

	const setTransition = (enabled) => {
		track.style.transition = enabled
			? `transform ${ANIMATION_DURATION} ease`
			: "none";
	};

	const applyTranslate = (x, animated = true) => {
		setTransition(animated);
		track.style.transform = `translateX(${x}px)`;
	};

	const getTranslateByIndex = () => -index * getSlideWidth();

	const markActive = () => {
		slides.forEach((slide) => slide.classList.remove("is-active", "is-edge"));

		for (let i = 0; i < visible; i += 1) {
			slides[index + i]?.classList.add("is-active");
		}

		slides[index - 1]?.classList.add("is-edge");
		slides[index + visible]?.classList.add("is-edge");
	};

	const updatePosition = (animated = true) => {
		applyTranslate(getTranslateByIndex(), animated);
		markActive();
	};

	const removeClones = () => {
		track.querySelectorAll(".review.clone").forEach((el) => el.remove());
	};

	const addClones = () => {
		const originals = getOriginalSlides();
		if (!originals.length) return;

		const before = originals.slice(-visible);
		const after = originals.slice(0, visible);

		before.forEach((slide) => {
			const clone = slide.cloneNode(true);
			clone.classList.add("clone");
			track.prepend(clone);
		});

		after.forEach((slide) => {
			const clone = slide.cloneNode(true);
			clone.classList.add("clone");
			track.append(clone);
		});
	};

	const rebuild = () => {
		removeClones();

		visible = getVisibleSlides();
		addClones();

		slides = getAllSlides();
		index = visible;

		updatePosition(false);
	};

	const normalizeLoopIndex = () => {
		const maxBeforeReset = slides.length - visible;
		const resetToEnd = slides.length - visible * 2;

		if (index >= maxBeforeReset) {
			index = visible;
			updatePosition(false);
		} else if (index <= 0) {
			index = resetToEnd;
			updatePosition(false);
		}

		markActive();
	};

	const move = (direction) => {
		index += direction;
		updatePosition(true);
	};

	const closeDrag = () => {
		drag.active = false;
		drag.offsetX = 0;
		drag.pointerId = null;
		track.classList.remove("is-dragging");
		track.style.cursor = "grab";
	};

	const onPointerDown = (event) => {
		if (event.button !== undefined && event.button !== 0) return;

		drag.active = true;
		drag.startX = event.clientX;
		drag.offsetX = 0;
		drag.baseX = getTranslateByIndex();
		drag.pointerId = event.pointerId ?? null;

		track.classList.add("is-dragging");
		track.style.cursor = "grabbing";
		setTransition(false);

		if (drag.pointerId !== null) {
			track.setPointerCapture(drag.pointerId);
		}
	};

	const onPointerMove = (event) => {
		if (!drag.active) return;
		if (drag.pointerId !== null && event.pointerId !== drag.pointerId) return;

		drag.offsetX = event.clientX - drag.startX;
		applyTranslate(drag.baseX + drag.offsetX, false);
	};

	const onPointerEnd = (event) => {
		if (!drag.active) return;
		if (drag.pointerId !== null && event.pointerId !== drag.pointerId) return;

		if (drag.pointerId !== null) {
			try {
				track.releasePointerCapture(drag.pointerId);
			} catch {
				// no-op
			}
		}

		const threshold = getSlideWidth() * DRAG_THRESHOLD_RATIO;

		if (Math.abs(drag.offsetX) >= threshold) {
			move(drag.offsetX < 0 ? 1 : -1);
		} else {
			updatePosition(true);
		}

		closeDrag();
	};

	prevBtn.addEventListener("click", () => move(-1));
	nextBtn.addEventListener("click", () => move(1));

	track.addEventListener("transitionend", normalizeLoopIndex);

	track.addEventListener("pointerdown", onPointerDown);
	track.addEventListener("pointermove", onPointerMove);
	track.addEventListener("pointerup", onPointerEnd);
	track.addEventListener("pointercancel", onPointerEnd);
	track.addEventListener("lostpointercapture", onPointerEnd);

	track.style.touchAction = "pan-y";
	track.style.userSelect = "none";
	track.style.cursor = "grab";

	let resizeTimer;
	window.addEventListener("resize", () => {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(rebuild, 150);
	});

	rebuild();
}
