// Фоновый скрипт для обработки уведомлений

// Слушатель сообщений, приходящих от других частей расширения
chrome.runtime.onMessage.addListener(message => {
	// Проверка, что сообщение имеет тип 'alertUser'
	if (message.type === 'alertUser') {
		// Создание уведомления
		chrome.notifications.create({
			// Указание типа уведомления (базовое)
			type: 'basic',
			// Указание иконки для уведомления
			iconUrl: 'icons/icon48.png',
			// Заголовок уведомления
			title: 'Предупреждение!',
			// Сообщение, которое будет отображено в уведомлении
			message: message.text,
		})
	}
})
