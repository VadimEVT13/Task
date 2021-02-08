import Config from './configuration.js';

const actions = {
	EMPLOYER_ADD: 		'EMPLOYER_ADD',
	EMPLOYER_MODIF: 	'EMPLOYER_MODIF',
	EMPLOYER_DELETE: 	'EMPLOYER_DELETE',
	EMPLOYER_GET: 		'EMPLOYER_GET',	
	
	TASK_ADD: 			'TASK_ADD',
	TASK_MODIF: 		'TASK_MODIF',
	TASK_DELETE: 		'TASK_DELETE',
	TASK_GET: 			'TASK_GET'	
}

function employer_get() {
	let req = new XMLHttpRequest();
	req.open('GET', Config.GetEmployerPath(), false);	
	try {
		req.send();	
        if(req.status == 200) {
            return JSON.parse(req.responseText);
        }
	} catch (err) { }   
	return []; 
}

function task_get() {
	let req = new XMLHttpRequest();
	req.open('GET', Config.GetTaskPath(), false);
	try {
		req.send();	
        if(req.status == 200) {
            return JSON.parse(req.responseText);
        }
	} catch (err) { }   
	return []; 
}

function add_employer(employer) {
	var xhr = new XMLHttpRequest();
	var url = Config.AddEmployerPath();
	
	var body =  "?name="    + encodeURIComponent(employer.name) + 
				"&chief="   + encodeURIComponent(employer.chief) +
				"&branch="  + encodeURIComponent(employer.branch);
	xhr.open('POST', url+body, false);
	xhr.send(body);
	if(xhr.status !== 200) {
		alert(xhr.status + ' ' + xhr.statusText);
	} else {
		alert(xhr.responseText);
	}
}

function add_task(task) {
	var xhr = new XMLHttpRequest();
	var url = Config.AddTaskPath();
	
	var body =  
			"?discription="     + encodeURIComponent(task.description) + 
			"&chief="           + encodeURIComponent(task.chief) +
			"&priority="        + encodeURIComponent(task.priority);
	xhr.open('POST', url+body, false);
	xhr.send(body);
	if(xhr.status !== 200) {
		alert(xhr.status + ' ' + xhr.statusText);
	} else {
		alert(xhr.responseText);
	}
}

function delete_employer(id) {
	if(confirm('Удалить пользователя?')) {
		var xhr = new XMLHttpRequest();
		var url = Config.DeleteEmployerPath();

		var body = "?id=" + encodeURIComponent(id);
		xhr.open('POST', url+body, false);
		xhr.send(body);
		if(xhr.status !== 200) {
			alert(xhr.status + ' ' + xhr.statusText);
		} else {
			alert(xhr.responseText);
		}
	}
}

function delete_task(id) {
	if(confirm('Удалить задачу?')) {
		var xhr = new XMLHttpRequest();
		var url = Config.DeleteTaskPath();

		var body = "?id=" + encodeURIComponent(id);
		xhr.open('POST', url+body, false);
		xhr.send(body);
		if(xhr.status !== 200) {
			alert(xhr.status + ' ' + xhr.statusText);
		} else {
			alert(xhr.responseText);
		}
	}      	
}

function modif_employer(employer) {
	var xhr = new XMLHttpRequest();
	var url = Config.UpdateEmployerPath();
	
	var body =  "?name="        + encodeURIComponent(employer.name)   + 
				"&chief="       + encodeURIComponent(employer.chief)  +
				"&branch="      + encodeURIComponent(employer.branch) +
				"&id="          + encodeURIComponent(employer.id);
		
	xhr.open('POST', url+body, false);
	xhr.send(body);
	if(xhr.status !== 200) {
		alert(xhr.status + ' ' + xhr.statusText);
	} else {
		alert(xhr.responseText);
	}	
}

function modif_task(task) {
	var xhr = new XMLHttpRequest();
	var url = Config.UpdateTaskPath();
	
	var body =  
			"?description="     + encodeURIComponent(task.description)    + 
			"&chief="           + encodeURIComponent(task.chief)          +
			"&priority="        + encodeURIComponent(task.priority)       +
			"&id="              + encodeURIComponent(task.id);
		
	xhr.open('POST', url+body, false);
	xhr.send(body);
	if(xhr.status !== 200) {
		alert(xhr.status + ' ' + xhr.statusText);
	} else {
		alert(xhr.responseText);
	}	
}

function request(action) {
	switch(action.name) {
		case actions.EMPLOYER_GET: 		return employer_get();
		case actions.TASK_GET: 			return task_get();
		case actions.EMPLOYER_ADD: 		return add_employer(action.data);
		case actions.TASK_ADD: 			return add_task(action.data);
		case actions.EMPLOYER_DELETE: 	return delete_employer(action.data);
		case actions.TASK_DELETE: 		return delete_task(action.data);
		case actions.EMPLOYER_MODIF: 	return modif_employer(action.data);
		case actions.TASK_MODIF: 		return modif_task(action.data);
		
		default: alert("Действие " + action.name + " неопределено");		
	}
}

export { request, actions };