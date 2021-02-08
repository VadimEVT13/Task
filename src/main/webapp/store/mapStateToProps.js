const mapStateToProps = function(state) {
	return {
		employer_data: 	state.employer_data,
		task_data: 		state.task_data,
		chief_list:		state.chief_list,
		cur_employer:	state.cur_employer,
		cur_task:		state.cur_task,
		max_priority:	state.max_priority
	};
}

export default mapStateToProps;