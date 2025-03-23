chrome.runtime.onInstalled.addListener(() => {
	console.log('Extension installed')
})

function sendNotification(message: string): void {
	chrome.notifications.create({
		type: 'basic',
		iconUrl: 'icons/notification-icon.png',
		title: '🛡 Предупреждение!',
		message: message,
		priority: 2,
	})
}

chrome.runtime.onMessage.addListener((request: any) => {
	if (request.action === 'checkForScam') {
		sendNotification('Возможное мошенничество! Будьте осторожны.')
	}
})
