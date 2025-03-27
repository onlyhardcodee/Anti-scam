/* background.js */


chrome.runtime.onInstalled.addListener(() => {
	console.log('Extension installed')
})

function sendNotification(message) {
	chrome.notifications.create({
		type: 'basic',
		iconUrl: 'icons/notification-icon.png',
		title: '🛡 Предупреждение!',
		message: message,
		priority: 2,
	})
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'scanText') {
		const warning = checkForScam(request.text)
		if (warning) {
			sendNotification('Возможное мошенничество! Будьте осторожны.')
			chrome.runtime.sendMessage({ action: 'updateBlockedCount' })
		}
	}
})

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
