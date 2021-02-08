import { CHIEF_LIST_UPDATE } from './../actions/actions.js'

function chief_list_update(value) {
	return {
		type: CHIEF_LIST_UPDATE,
		value: value
	};
}

export default chief_list_update;