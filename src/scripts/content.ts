import { checkForScam } from './utils'

function scanPage(): void {
	const pageText: string = document.body.innerText.toLowerCase()
	const warning = checkForScam(pageText)

	if (warning) {
		alert(warning)
	}
}

scanPage()
