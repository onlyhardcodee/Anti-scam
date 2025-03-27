/* content.js */

function scanPage() {
	const pageText = document.body.innerText.toLowerCase()
	const warning = checkForScam(pageText)

	if (warning) {
		alert(warning)
	}
}

// Логика для определения мошенничества
function checkForScam(text) {
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
	for (let keyword of keywords) {
		if (text.toLowerCase().includes(keyword)) {
			return `⚠️ Найдено подозрительное слово: "${keyword}". Будьте осторожны, возможны мошенники! ⚠️`
		}
	}
	return null
}

scanPage()
