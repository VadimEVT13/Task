import { CUR_TASK_UPDATE } from './../actions/actions.js'

function cur_task_update(value) {
	return {
		type: CUR_TASK_UPDATE,
		value: value
	};
}

export default cur_task_update;