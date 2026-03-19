// Задача 1
function calculateFinalPrice(basePrice, discountPercent, taxRate) {
	const discountAmount = basePrice * (discountPercent / 100);
	const priceAfterDiscount = basePrice - discountAmount;
	const taxAmount = priceAfterDiscount * taxRate;
	return priceAfterDiscount + taxAmount;
}

// Задача 2
const checkAccess = (username, password) => {
	return username === "admin" && password === "123456"
		? "Доступ разрешен"
		: "Доступ запрещен";
};

// Задача 3
function getTimeOfDay(hour) {
	if (hour >= 0 && hour <= 5) {
		return "Ночь";
	} else if (hour >= 6 && hour <= 11) {
		return "Утро";
	} else if (hour >= 12 && hour <= 17) {
		return "День";
	} else if (hour >= 18 && hour <= 23) {
		return "Вечер";
	} else return "Некорректное время";
}

// Задача 4
function findFirstEven(start, end) {
	if (start > end) return "Некорректный диапазон";

	for (let i = start; i <= end; i++) {
		if (i % 2 === 0) return i;
	}
	return "Чётных чисел нет";
}
