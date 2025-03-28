// 2. background.js
// Фоновый скрипт для обработки уведомлений
chrome.runtime.onMessage.addListener(message => {
	if (message.type === 'alertUser') {
		chrome.notifications.create({
			type: 'basic',
			iconUrl: 'icons/icon48.png',
			title: 'Предупреждение!',
			message: message.text,
		})
	}
})
