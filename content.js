// 3. content.js
// Сканирование страницы на мошеннические слова
chrome.storage.sync.get(['keywords'], data => {
	const keywords = data.keywords || []
	const bodyText = document.body.innerText

	keywords.forEach(word => {
		if (bodyText.includes(word)) {
			chrome.runtime.sendMessage({
				type: 'alertUser',
				text: `Обнаружено мошенническое слово: ${word}`,
			})
		}
	})
})
