import { CUR_EMPLOYER_UPDATE } from './../actions/actions.js'

function cur_employer_update(value) {
	return {
		type: CUR_EMPLOYER_UPDATE,
		value: value
	};
}

export default cur_employer_update;