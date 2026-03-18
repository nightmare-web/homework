// Задача 1
for (let i = 1; i <= 20; i++) {
	if (i % 4 === 0) {
		continue;
	}

	console.log(i);
}

// Задача 2
const number = +prompt("Введите число для вычисления факториала:");
let factorial = 1;

for (let i = 1; i <= number; i++) {
	factorial *= i;
}

console.log(`Факториал числа ${number} равен ${factorial}`);

// Задача 3
let board = "";

for (let row = 0; row < 8; row++) {
	for (let col = 0; col < 8; col++) {
		if ((row + col) % 2 === 0) {
			board += "Ч ";
		} else {
			board += "Б ";
		}
	}
	board += "\n";
}

console.log(board);
