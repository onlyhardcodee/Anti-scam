import { checkForScam } from './utils'

document.getElementById('scan-image')?.addEventListener('click', function () {
	const keywordsSelect = document.getElementById(
		'keywords'
	) as HTMLSelectElement
	const selectedKeyword = keywordsSelect?.value

	if (selectedKeyword !== '') {
		checkForScam(selectedKeyword)
	}
})


chrome.runtime.onMessage.addListener((request: any) => {
	if (request.action === 'updateBlockedCount') {
		const countElement = document.getElementById('blocked-count')
		if (countElement)
			countElement.textContent = `Заблокировано объектов: ${request.count}`
	}
})

let blockedCount = 0

function updateBlockedCount(): void {
	const countElement = document.getElementById('blocked-count')
	if (countElement)
		countElement.textContent = `Заблокировано объектов: ${blockedCount}`
}

function blockObject(): void {
	blockedCount++
	updateBlockedCount()
}

document.getElementById('keywords')?.addEventListener('change', function () {
	if ((this as HTMLSelectElement).value) {
		blockObject()
	}
})
