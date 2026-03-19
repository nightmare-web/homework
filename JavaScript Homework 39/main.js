// Задача 1
const person = {
	name: "Alexsandr",
	profession: "Web-developer",
	speciality: "Верстка сайтов",
	experience: "1 год",
};

console.log("Имя:", person.name);
console.log("Профессия:", person.profession);
console.log("Специализация:", person.speciality);
console.log("Опыт:", person.experience);

// Задача 2
function isEmpty(object) {
	for (let key in object) {
		return false;
	}
	return true;
}

console.log(isEmpty({})); // true
console.log(isEmpty({ name: "Alexsandr" })); // false

// Задача 3
const task = {
	title: "Изучить JS ",
	description: "Разобраться с объектами и модификациями",
	isCompleted: false,
};

function cloneAndModify(object, modifications) {
	return { ...object, ...modifications };
}

const updatedTask = cloneAndModify(task, {
	title: "Изучить модуль JavaScript (обновлено)",
	isCompleted: true,
});

for (let key in updatedTask) {
	console.log(key + ":", updatedTask[key]);
}

// Задача 4
function callAllMethods(obj) {
	for (let key in obj) {
		if (typeof obj[key] === "function") {
			obj[key](); // вызываем метод
		}
	}
}

const myObject = {
	method1() {
		console.log("Метод 1 вызван");
	},
	method2() {
		console.log("Метод 2 вызван");
	},
	property: "Это не метод",
};

callAllMethods(myObject);
