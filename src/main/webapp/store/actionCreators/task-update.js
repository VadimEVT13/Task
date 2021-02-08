import { TASK_UPDATE } from './../actions/actions.js'

function task_update(value) {
	return {
		type: TASK_UPDATE,
		value: value
	};
}

export default task_update;