const initialState = {
	employer_data: 	[],
	task_data: 		[],
	chief_list:		[],
	cur_employer: 	{
		id: '',
		name: '',
		chief: '',
		branch: ''		
	},
	cur_task:		{
		id: '',
		description: '',
		chief: '',
		priority: 1
	},
	max_priority:	1
};

export default initialState;