const wordInput = document.getElementById('wordInput')
const addWordButton = document.getElementById('addWord')
const wordList = document.getElementById('wordList')

addWordButton.addEventListener('click', () => {
	const newWord = wordInput.value.trim().toLowerCase()

	if (newWord) {
		chrome.storage.sync.get('keywords', data => {
			const keywords = data.keywords || []
			const wordExists = keywords.some(w => w.toLowerCase() === newWord)

			if (!wordExists) {
				keywords.push(newWord)
				chrome.storage.sync.set({ keywords }, () => {
					renderWordList()
				})
			}

			// Очищаем поле ввода
			wordInput.value = ''
		})
	}
})

function renderWordList() {
	chrome.storage.sync.get('keywords', data => {
		wordList.innerHTML = ''

		;(data.keywords || []).forEach(word => {
			const li = document.createElement('li')
			li.textContent = word

			const deleteButton = document.createElement('button')
			deleteButton.classList.add('delete-button')
			deleteButton.textContent = '×'
			deleteButton.addEventListener('click', () => {
				removeWord(word, li)
			})

			li.appendChild(deleteButton)
			wordList.appendChild(li)
		})
	})
}

function removeWord(word, element) {
	chrome.storage.sync.get('keywords', data => {
		const keywords = data.keywords || []
		const newKeywords = keywords.filter(
			w => w.toLowerCase() !== word.toLowerCase()
		)
		chrome.storage.sync.set({ keywords: newKeywords }, () => {
			// Добавляем класс анимации
			element.classList.add('slide-out')
			// Удаляем элемент после завершения анимации
			setTimeout(() => {
				element.remove()
			}, 300) // Время анимации в миллисекундах
		})
	})
}

renderWordList()
