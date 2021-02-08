import employer_update 		from './../actionCreators/employer-update.js';
import task_update 			from './../actionCreators/task-update.js';
import chief_list_update 	from './../actionCreators/chief-list-update.js';
import cur_employer_update 	from './../actionCreators/cur-employer-update.js';
import cur_task_update 		from './../actionCreators/cur-task-update.js';
import max_priority_update 	from './../actionCreators/max-priority-update.js';
import { EMPLOYER_UPDATE, TASK_UPDATE, CHIEF_LIST_UPDATE, 
	CUR_EMPLOYER_UPDATE, CUR_TASK_UPDATE, MAX_PRIORITY_UPDATE } from './../actions/actions.js';

function reducer(state, action) {
	switch(action.type) {
		case EMPLOYER_UPDATE: 		return { 
										employer_data: 	action.value, 
										task_data: 		state.task_data,
										chief_list: 	state.chief_list,
										cur_employer: 	state.cur_employer,
										cur_task: 		state.cur_task,
										max_priority: 	state.max_priority
										};
		case TASK_UPDATE: 			return { 
										employer_data: 	state.employer_data, 
										task_data: 		action.value,
										chief_list: 	state.chief_list,
										cur_employer: 	state.cur_employer,
										cur_task: 		state.cur_task,
										max_priority: 	state.max_priority
										};
		case CHIEF_LIST_UPDATE: 	return { 
										employer_data: 	state.employer_data, 
										task_data: 		state.task_data,
										chief_list: 	action.value,
										cur_employer: 	state.cur_employer,
										cur_task: 		state.cur_task,
										max_priority: 	state.max_priority
										};
		case CUR_EMPLOYER_UPDATE: 	return { 
										employer_data: 	state.employer_data, 
										task_data: 		state.task_data,
										chief_list: 	state.chief_list,
										cur_employer: 	action.value,
										cur_task: 		state.cur_task,
										max_priority: 	state.max_priority
										};
		case CUR_TASK_UPDATE: 		return { 
										employer_data: 	state.employer_data, 
										task_data: 		state.task_data,
										chief_list: 	state.chief_list,
										cur_employer: 	state.cur_employer,
										cur_task: 		action.value,
										max_priority: 	state.max_priority
										};
		case MAX_PRIORITY_UPDATE: 	return { 
										employer_data: 	state.employer_data, 
										task_data: 		state.task_data,
										chief_list: 	state.chief_list,
										cur_employer: 	state.cur_employer,
										cur_task: 		state.cur_task,
										max_priority: 	action.value
										};
		
		default: return state;
	}	
}

export default reducer;