import { MAX_PRIORITY_UPDATE } from './../actions/actions.js'

function max_priority_update(value) {
	return {
		type: MAX_PRIORITY_UPDATE,
		value: value
	};
}

export default max_priority_update;