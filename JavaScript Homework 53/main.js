// Задача 1
const users = [
	{ name: "Alex", age: 24, isAdmin: false },
	{ name: "Bob", age: 13, isAdmin: false },
	{ name: "John", age: 31, isAdmin: true },
	{ name: "Jane", age: 20, isAdmin: false },
];

users.push(
	{ name: "Ann", age: 19, isAdmin: false },
	{ name: "Jack", age: 43, isAdmin: true },
);

console.log(users);

// Задача 2
function getUserAverageAge(users) {
	let allAges = 0;
	for (let i = 0; i < users.length; i++) {
		allAges += users[i].age;
	}
	return allAges / users.length;
}

console.log("Средний возраст пользователей:", getUserAverageAge(users));

// Задача 3
function getAllAdmins(users) {
	const admins = [];
	for (let i = 0; i < users.length; i++) {
		if (users[i].isAdmin) {
			admins.push(users[i]);
		}
	}
	return admins;
}

console.log("Администратором является:", getAllAdmins(users));

// Задача 4
function first(arr, n) {
	const result = [];

	if (n === 0) {
		return [];
	} else if (n === undefined) {
		if (arr.length > 0) result.push(arr[0]);
		return result;
	} else if (n > arr.length) {
		console.error(
			`Ошибка: не может быть больше длины массива. n = ${n}, длина массива = ${arr.length}`,
		);
		n = arr.length;
	}

	for (let i = 0; i < n; i++) {
		result.push(arr[i]);
	}

	return result;
}

console.log(first([4, 6, 11, 12, 15, 35], 3));
console.log(first([1, 3, 7, 13, 17, 24], 4));
console.log(first([1, 2, 4, 5, 8, 10], 5));
