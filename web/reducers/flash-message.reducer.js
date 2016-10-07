import _ from 'lodash';

export default function(state = {}, action) {
	switch (action.type) {
		case 'FLASH_MESSAGE':
			return _.pick(action, ['messageType', 'title', 'description']);

		default:
			return state;
	}
}
