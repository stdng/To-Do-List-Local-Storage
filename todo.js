const form = document.querySelector('form');
const ul = document.querySelector('.todolist');
const taskInput = document.querySelector('input[type = "text"]');

form.addEventListener('submit', function (e) {
	e.preventDefault();
	let newElement = makeElement(taskInput.value);
	ul.append(newElement);

	let removeButton = document.createElement('Button');
	removeButton.innerText = 'x';
	removeButton.classList.add('rmv');
	newElement.append(removeButton);

	let newLocalStorage = JSON.parse(localStorage.getItem('To Do: '));
	if (!Array.isArray(newLocalStorage)) {
		newLocalStorage = [];
	}
	newLocalStorage.push({
		name: taskInput.value,
		lineThrough: false
	});

	localStorage.setItem('To Do: ', JSON.stringify(newLocalStorage));

	taskInput.value = '';
});

function makeElement(value) {
	let task = document.createElement('li');
	task.innerText = value;
	task.classList.add('taskChar');
	return task;
}

ul.addEventListener('click', function (e) {
	if (e.target.tagName === 'BUTTON') {
		e.target.parentElement.remove();

		let newLocalStorage = JSON.parse(localStorage.getItem('To Do: '));
		for (let i = 0; i < newLocalStorage.length; i++) {
			if (newLocalStorage[i].name + 'x' === e.target.parentElement.innerText) {
				newLocalStorage.splice(i, 1);
			}
		}

		localStorage.setItem('To Do: ', JSON.stringify(newLocalStorage));
	}

	if (e.target.tagName === 'LI') {
		e.target.style.textDecoration = e.target.style.textDecoration ? null : 'line-through';

		let removeCross = JSON.parse(localStorage.getItem('To Do: '));
		for (let i = 0; i < removeCross.length; i++) {
			if (removeCross[i].name + 'x' === e.target.innerText) {
				removeCross[i]['lineThrough'] = removeCross[i]['lineThrough'] ? false : true;
			}
		}

		localStorage.setItem('To Do: ', JSON.stringify(removeCross));
	}
});

window.addEventListener('load', function (e) {
	let newLocalStorage = [];
	try {
		newLocalStorage = JSON.parse(localStorage.getItem('To Do: '));
	} catch (e) {
		localStorage.setItem('To Do: ', JSON.stringify(newLocalStorage));
	}

	for (let toDo of newLocalStorage) {
		let newElement = makeElement(toDo.name);
		ul.append(newElement);

		let removeButton = document.createElement('Button');
		removeButton.innerText = 'x';
		removeButton.classList.add('rmv');
		newElement.append(removeButton);

		if (toDo.lineThrough === true) {
			newElement.style.textDecoration = 'line-through';
		}
	}
});