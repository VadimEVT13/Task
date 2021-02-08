import { EMPLOYER_UPDATE } from './../actions/actions.js'

function employer_update(value) {
	return {
		type: EMPLOYER_UPDATE,
		value: value
	};
}

export default employer_update;