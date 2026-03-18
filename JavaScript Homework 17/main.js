// Задача 1
const number = 7;

if (number % 3 === 0) {
	console.log("Чётное число");
} else {
	console.log("Нечётное число");
}

// Задача 2
const age = 18;

let discount = age < 18 ? 10 : age <= 65 ? 20 : 30;

console.log(discount);

// *Задача под звездочкой*
const userAge = 23;

let userDiscount;

switch (true) {
	case userAge < 18:
		userDiscount = 10;
		break;
	case userAge <= 65:
		userDiscount = 20;
		break;
	case userAge > 65:
		userDiscount = 30;
		break;
	default:
		userDiscount = 0;
}

console.log(userDiscount);

// Задача 3
let username = prompt("Введите имя пользователя (admin или user):");
let password = prompt("Введите пароль:");

if ((username === "admin" || username === "user") && password === "123456") {
	console.log("Доступ разрешен");
} else {
	console.log("Доступ запрещен");
}
