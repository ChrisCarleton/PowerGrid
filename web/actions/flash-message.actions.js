export function flashInfo(title, description) {
	return {
		type: 'FLASH_MESSAGE',
		messageType: 'info',
		title: title,
		description: description
	};
}

export function flashWarning(title, description) {
	return {
		type: 'FLASH_MESSAGE',
		messageType: 'warn',
		title: title,
		description: description
	};
}

export function flashError(title, description) {
	return {
		type: 'FLASH_MESSAGE',
		messageType: 'error',
		title: title,
		description: description
	};
}
