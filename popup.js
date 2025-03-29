const wordInput = document.getElementById('wordInput') // Получаем элемент для ввода нового слова
const addWordButton = document.getElementById('addWord') // Получаем кнопку для добавления нового слова
const wordList = document.getElementById('wordList') // Получаем элемент списка для отображения слов

// Слушатель на кнопку добавления нового слова
addWordButton.addEventListener('click', () => {
	// Извлекаем введённое слово, удаляя пробелы и приводя к нижнему регистру
	const newWord = wordInput.value.trim().toLowerCase()

	// Если слово не пустое
	if (newWord) {
		// Получаем текущий список ключевых слов из хранилища
		chrome.storage.sync.get('keywords', data => {
			const keywords = data.keywords || []
			// Проверяем, существует ли уже такое слово в списке
			const wordExists = keywords.some(w => w.toLowerCase() === newWord)

			// Если слова ещё нет в списке
			if (!wordExists) {
				// Добавляем новое слово в список
				keywords.push(newWord)
				// Сохраняем обновлённый список в хранилище
				chrome.storage.sync.set({ keywords }, () => {
					// Перерисовываем список после добавления нового слова
					renderWordList()
				})
			}

			// Очищаем поле ввода после добавления слова
			wordInput.value = ''
		})
	}
})

// Функция для рендеринга списка ключевых слов
function renderWordList() {
	// Получаем текущий список слов из хранилища
	chrome.storage.sync.get('keywords', data => {
		// Очищаем текущий список на странице
		wordList.innerHTML = ''

		// Перебираем все слова и создаём для каждого элемент списка
		;(data.keywords || []).forEach(word => {
			// Создаём новый элемент списка
			const li = document.createElement('li')
			li.textContent = word

			// Создаём кнопку для удаления слова из списка
			const deleteButton = document.createElement('button')
			deleteButton.classList.add('delete-button')
			deleteButton.textContent = '×'
			// Добавляем обработчик события для удаления слова
			deleteButton.addEventListener('click', () => {
				removeWord(word, li)
			})

			// Добавляем кнопку удаления в элемент списка
			li.appendChild(deleteButton)
			// Добавляем элемент списка в отображаемый список на странице
			wordList.appendChild(li)
		})
	})
}

// Функция для удаления слова из списка
function removeWord(word, element) {
	// Получаем текущий список слов из хранилища
	chrome.storage.sync.get('keywords', data => {
		const keywords = data.keywords || []
		// Отфильтровываем список, удаляя указанное слово
		const newKeywords = keywords.filter(
			w => w.toLowerCase() !== word.toLowerCase()
		)
		// Сохраняем обновлённый список в хранилище
		chrome.storage.sync.set({ keywords: newKeywords }, () => {
			// Добавляем класс для анимации удаления
			element.classList.add('slide-out')
			// Удаляем элемент из DOM после завершения анимации
			setTimeout(() => {
				element.remove()
			}, 300) // Время анимации в миллисекундах
		})
	})
}

// Вызов функции рендеринга списка при загрузке страницы
renderWordList()
