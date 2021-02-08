import { bindActionCreators } 	from 'redux';
import employer_update 			from './actionCreators/employer-update.js';
import task_update 				from './actionCreators/task-update.js';
import chief_list_update 		from './actionCreators/chief-list-update.js';
import cur_employer_update 		from './actionCreators/cur-employer-update.js';
import cur_task_update 			from './actionCreators/cur-task-update.js';
import max_priority_update 		from './actionCreators/max-priority-update.js';

const mapDispatchToProps =
	function(dispatch) {
		return {
			change_employer_data: 	bindActionCreators(employer_update, dispatch),				
			change_task_data: 		bindActionCreators(task_update, dispatch),				
			change_chief_list: 		bindActionCreators(chief_list_update, dispatch),				
			change_cur_employer: 	bindActionCreators(cur_employer_update, dispatch),				
			change_cur_task: 		bindActionCreators(cur_task_update, dispatch),				
			change_max_priority: 	bindActionCreators(max_priority_update, dispatch)
		};
	}


export default mapDispatchToProps;