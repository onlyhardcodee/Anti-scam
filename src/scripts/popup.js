/* popup.js */


document.getElementById('scan').addEventListener('click', () => {
	chrome.scripting.executeScript({
		target: { allFrames: true },
		function: checkForScam,
	})
})

document.getElementById('scan-image').addEventListener('click', () => {
	extractTextFromImage()
})

function checkForScam() {
	const keywords = [
		'скинь деньги',
		'номер карты',
		'пароль',
		'перевод на карту',
		'скинь реквизиты',
		'отправь деньги',
		'код подтверждения',
		'верификация',
		'восстановление пароля',
		'получить доступ',
		'восстановить аккаунт',
		'кликни на ссылку',
		'зайди на сайт',
		'ссылка на страницу',
		'выиграл',
		'получите подарок',
		'приз',
		'пожертвования',
		'спонсорская помощь',
		'письмо с угрозами',
	]
	let pageText = document.body.innerText.toLowerCase()

	for (let keyword of keywords) {
		if (pageText.toLowerCase().includes(keyword)) {
			return `⚠️ Найдено подозрительное слово: "${keyword}". Будьте осторожны, возможны мошенники! ⚠️`
		}
	}
}
