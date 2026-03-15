const track = document.querySelector(".reviews__track");
const prevBtn = document.querySelector(".reviews__button--prev");
const nextBtn = document.querySelector(".reviews__button--next");

let slides = document.querySelectorAll(".review");

let visibleSlides = 3;
let index = visibleSlides;

function cloneSlides() {
	const slidesArray = [...slides];

	slidesArray.slice(-visibleSlides).forEach((slide) => {
		const clone = slide.cloneNode(true);
		clone.classList.add("clone");
		track.prepend(clone);
	});

	slidesArray.slice(0, visibleSlides).forEach((slide) => {
		const clone = slide.cloneNode(true);
		clone.classList.add("clone");
		track.append(clone);
	});

	slides = document.querySelectorAll(".review");
}

cloneSlides();

function getGap() {
	const gap = parseFloat(getComputedStyle(track).gap);
	return Number.isFinite(gap) ? gap : 0;
}

function getSlideWidth() {
	return slides[0].offsetWidth + getGap();
}

function calcVisibleSlides() {
	const slideWidth = slides[0]?.offsetWidth || 0;
	const gap = getGap();
	const container = track.parentElement;
	const containerWidth = container ? container.offsetWidth : 0;
	if (slideWidth === 0 || containerWidth === 0) return 1;
	return Math.max(1, Math.round((containerWidth + gap) / (slideWidth + gap)));
}

function setPosition() {
	track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
}

function setActiveSlide() {
	slides.forEach((s) => {
		s.classList.remove("is-active");
		s.classList.remove("is-edge");
	});

	// mark all visible slides (3) as active
	for (let i = 0; i < visibleSlides; i++) {
		const slide = slides[index + i];
		if (slide) slide.classList.add("is-active");
	}

	// mark only the two edge slides (just outside the viewport)
	const leftEdge = slides[index - 1];
	const rightEdge = slides[index + visibleSlides];
	if (leftEdge) leftEdge.classList.add("is-edge");
	if (rightEdge) rightEdge.classList.add("is-edge");
}

setPosition();
setActiveSlide();

function rebuildSlider() {
	document.querySelectorAll(".review.clone").forEach((c) => c.remove());
	slides = document.querySelectorAll(".review");
	visibleSlides = calcVisibleSlides();
	cloneSlides();
	index = visibleSlides;
	setPosition();
	setActiveSlide();
}

let resizeTimer;
window.addEventListener("resize", () => {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(() => {
		rebuildSlider();
	}, 150);
});

nextBtn.addEventListener("click", () => {
	index++;
	track.style.transition = "transform 0.4s ease";
	setPosition();
	setActiveSlide();
});

prevBtn.addEventListener("click", () => {
	index--;
	track.style.transition = "transform 0.4s ease";
	setPosition();
	setActiveSlide();
});

track.addEventListener("transitionend", () => {
	if (index >= slides.length - visibleSlides) {
		track.style.transition = "none";
		index = visibleSlides;
		setPosition();
		setActiveSlide();
	}

	if (index === 0) {
		track.style.transition = "none";
		index = slides.length - visibleSlides * 2;
		setPosition();
		setActiveSlide();
	}
});
