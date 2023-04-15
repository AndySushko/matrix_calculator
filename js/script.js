// script.js


document.addEventListener('DOMContentLoaded', () => {
			
	// сразу фокус на элемент матрицы
	document.querySelector('.matrix_elem').focus();

	const btnMakeMatrixElem = document.querySelector('.add_matrix_elem')
	const space = " ";
	const alphabet = /[A-Za-zА-Яа-яЁё]/g;
	const dBLock_matrix = 'ABCDEFG';
	const row_limit = 10;
	let column_limit = 10;


	let id_count = 0;
	let id_row_count = 0;
	let dBlock_count = 1;


	let matrix = [];
	for (i = 0; i < row_limit; i++){
		let row_matrix = [];
		for (j = 0; j < column_limit; j++) {
			row_matrix.push('n');
		}
		matrix.push(row_matrix);
	}

	

	// Добавление по кнопке
	btnMakeMatrixElem.addEventListener('click', () => {
		createNewElem();			
	});


	// Добавление элемента по пробелу
	document.addEventListener('keydown', function(event) {
			if (event.code == 'Space' && document.querySelector(`#matrix_elem_${id_count}`) === document.querySelector(':focus')) {
				// let id = elem.id;
	  			id_num = +event.target.id.slice(-1);	// если у id на конце одна цифра
	  			if (event.target.id.length != 13) { id_num = +event.target.id.slice(-2); }	// если у id на конце не одна цифра
				// console.log(id_num);
				createNewElem();
			}
	});

	// Перенос строки по Enter
	document.addEventListener('keydown', function(event) {
			if (event.code == 'Enter' && document.querySelector(`#matrix_elem_${id_count}`) === document.querySelector(':focus')) {
				// matrix.push(+document.querySelector(`#matrix_elem_${id_count}`).value);
				// console.log(matrix);
			createNewElem(true);
			}
	});


	// Удаление по Backspace (НЕ РАБОТАЕТ!!!)
	document.addEventListener('keydown', function(event) {
			if (event.code == 'Backspace' && (document.querySelector(`#matrix_elem_${id_count}`) === document.querySelector(':focus')
				&& document.querySelector(`#matrix_elem_${id_count}`).value == " " || document.querySelector(`#matrix_elem_${id_count}`).value == "")) {
				//matrix.pop(+document.querySelector(`#matrix_elem_${id_count}`).value);
				console.log(matrix);
				deleteElement();
			}
	});


	function addDeleteCrossSymbol() {
		// Добавляет, удаляет крестик на странице  || elem.value != '' && isNaN(elem.value) == false
	  if (document.getElementById('m_field').getElementsByTagName('input').length > 1) {
	  	document.querySelector('.matrix_title').style.display = 'none';
	  	document.querySelector('.cross_symbol').style.display = 'block';
	  }
	  else {
	  	document.querySelector('.cross_symbol').style.display = 'none';
	  	document.querySelector('.matrix_title').style.display = 'block';
	  }
	}


	function createNewElem(flag) {

		id_count++;
		// автоматически перебрасывать на след. строку, если кол-во элементов прев. пред. строку
		if (id_row_count > 0) {
			console.log(document.getElementById(`matrix_row_${id_row_count - 1}`).getElementsByTagName('input').length);
			column_limit = document.getElementById(`matrix_row_${id_row_count - 1}`).getElementsByTagName('input').length;
		}
		// Создание новой строки матрицы
		if ((flag && (id_row_count == 0 || id_count % column_limit == 0)) || id_count % column_limit == 0) {
			// проверка, чтобы кол-во элементов во всех строках было одинаковым !!! - Сделать
			// id_count += 10 - id_count % 10;
			
			id_row_count++;
			if (id_row_count > row_limit - 1) { 
				id_count--;
				id_row_count--;
				return;
			}
			let row = document.createElement('div');
			row.className = "matrix_row_field";
			row.id = `matrix_row_${id_row_count}`;
			document.querySelector('.matrix_field').append(row);
		}

		// Создание инпута нового элемента матрицы
		let elem = document.createElement('input');
		elem.className = "matrix_elem";
		elem.type = "text";	
		elem.name = "username";
		elem.autocomplete = "off";
		elem.id = `matrix_elem_${id_count}`;

		document.querySelector(`#matrix_row_${id_row_count}`).append(elem);
		document.querySelector(`#matrix_elem_${id_count}`).focus();
	}


	// Удалить элемент
	function deleteElement() {
		// Пока не первый элемент
		if (id_count != 0) {
			if (id_count % column_limit == 0 && id_row_count != 0) {
				document.querySelector(`#matrix_elem_${id_count}`).remove();
				document.querySelector(`#matrix_row_${id_row_count}`).remove();
				id_row_count--;
				id_count--;
				document.querySelector(`#matrix_elem_${id_count}`).focus();
				if (id_row_count == 0) {
					column_limit = 10;
				}
			}
			else {
				document.querySelector(`#matrix_elem_${id_count}`).remove();
				id_count--;
				document.querySelector(`#matrix_elem_${id_count}`).focus();
			}
		}
	}


	// Добавление в matrix
	function addToMatrix(elem) {
	  	let id = elem.id;
	  	id_num = +id.slice(12);
	  	elem.value = elem.value.replace(space, '');
	  	elem.value = elem.value.replace(alphabet, '');
	  	console.log(Math.floor(16 / 6));
	  	matrix[Math.floor(id_num / column_limit)][id_num - Math.floor(id_num / column_limit) * column_limit] = elem.value;	// добавляем элемент в матрицу
	  	normalizeMatrix(matrix);
	}


	// Преобразование matrix в нормальную матрицу
	function normalizeMatrix(matrix) {
		matrix2 = [];
		temp = 0;
		temp_flag = false;
		if (column_limit < 10) {
			temp_flag = true;
		}
		for (i = 0; i < matrix.length; i++) {
			if (matrix[i][0] != 'n' || (temp_flag && i == 1)) {
					row_matrix = [];
				for (j = 0; j < matrix[i].length; j++) {
					if (temp_flag && i == 0 && matrix[i][j + 1] == 'n') {
						temp = matrix[i][j];
						break;
					}
					if (temp_flag && i == 1 && j == 0) {
						row_matrix.push(temp);
					}
					if (matrix[i][j] != 'n') {
						row_matrix.push(matrix[i][j]);
					}
					else {
						continue;
					}
				}
				matrix2.push(row_matrix);
			}
			else {
				break;
			}
		}
		console.log(matrix)
		console.log(matrix2)
	}


	// Замена размера шрифта у инпута 
	function fixFontSize(text) {
  		if (text.value.length > 2 && text.value.length < 7)  {
  			text.style.fontSize = `${(2 - text.value.length * 0.2).toFixed(1)}em`;
  		}
  		else if (text.value.length >= 7) {
  			text.style.fontSize = '0.6em';
  		}
  		else { text.style.fontSize = '1.6em'; }
	}


	// Динамическая замена всего
	document.querySelector('.matrix_field').oninput = function(event) {
		addToMatrix(event.target);			
	  	// addElem
	  	// deleteElem
	  	addDeleteCrossSymbol();
	  	fixFontSize(event.target);
	};


	// Matrix2
	function makeMatrixToStr() {
		str = [];
		temp = 0;
		temp_flag = false;
		if (column_limit < 10) {
			temp_flag = true;
		}
		for (i = 0; i < matrix.length; i++) {
			if (matrix[i][0] != 'n' || (temp_flag && i == 1)) {
				for (j = 0; j < matrix[i].length; j++) {
					if (temp_flag && i == 0 && matrix[i][j + 1] == 'n') {
						temp = matrix[i][j];
						break;
					}
					if (temp_flag && i == 1 && j == 0) {
						str += temp + " ";
					}
					if (matrix[i][j] != 'n') {
						str += matrix[i][j] + " ";
					}
					else {
						continue;
					}
				}
				str += "\n";
			}
			else {
				break;
			}
		}
		console.log(str);
		return str;
	}


	document.querySelector('.btn_plus').addEventListener('click', e => {
		// Создание "новой матрицы"
		let new_matrix_elem = document.createElement('a');
		new_matrix_elem.className = "matrix_btn";	
		new_matrix_elem.innerHTML = `Matrix ${dBLock_matrix[dBlock_count]}`;
		dBlock_count++;

		document.querySelector('.btn_plus').before(new_matrix_elem);
	})


	// Копирование матрицы в буфер
	document.querySelector('.copy').addEventListener('click', e => {
	  	var inp = document.createElement('textarea')
	  	inp.value = makeMatrixToStr()
	  	document.body.appendChild(inp)
	  	inp.select()
	  	document.execCommand('copy')
	  	document.body.removeChild(inp)
	  	alert("Successfully copied")
	})


	// Конец скрипта
})