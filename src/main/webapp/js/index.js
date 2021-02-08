import React, { Component } from "react";
import ReactDOM 			from "react-dom";
import App 					from './app.js'
import Config 				from './configuration.js';
import store 				from './../store/store.js';
import { Provider } 		from 'react-redux';
import employer_update 		from './../store/actionCreators/employer-update.js';
import task_update 			from './../store/actionCreators/task-update.js';
import chief_list_update 	from './../store/actionCreators/chief-list-update.js';
import max_priority_update 	from './../store/actionCreators/max-priority-update.js';
import { request, actions } from './request-tool.js';

// ---- Данные ----
function getEmployer() {	
	let req = new XMLHttpRequest();
	req.open('GET', Config.GetEmployerPath(), false);	
	try {
		req.send();	
        if(req.status == 200) {
            return JSON.parse(req.responseText);
        }
	} catch (err) {
	}   
	return []; 
}

function getTask() {    
	let req = new XMLHttpRequest();
	req.open('GET', Config.GetTaskPath(), false);
	try {
		req.send();	
        if(req.status == 200) {
            return JSON.parse(req.responseText);
        }
	} catch (err) {
	}   
	return []; 
}

var getEmployerAction = {
	name: actions.EMPLOYER_GET	
};
var getTaskAction = {
	name: actions.TASK_GET	
};

var employerData_Example = [{"ID":50,"NAME":"Мотнгомери Скотти Скотт ","CHIEF":"Джеймс Тиберий Кирк ","BRANCH":"Энтерпрайз ","TASK":1},{"ID":25,"NAME":"Спок ","CHIEF":"Джеймс Тиберий Кирк ","BRANCH":"Энтерпрайз ","TASK":0},{"ID":32,"NAME":"Кристин Чапел ","CHIEF":"Леонард «Боунз» Маккой ","BRANCH":"Энтерпрайз ","TASK":1},{"ID":49,"NAME":"Артемьев Вадим Владимирович ","CHIEF":"Спок ","BRANCH":"Энтерпрайз ","TASK":2},{"ID":28,"NAME":"Леонард «Боунз» Маккой ","CHIEF":"Джеймс Тиберий Кирк ","BRANCH":"Энтерпрайз ","TASK":0},{"ID":9,"NAME":"Джеймс Тиберий Кирк ","CHIEF":null,"BRANCH":"Энтерпрайз ","TASK":0}];
var taskData_Example = [{"ID":8,"DESCRIPTION":"Отразить нападение клингонов ","NAME":"Артемьев Вадим Владимирович ","PRIORITY":2},{"ID":6,"DESCRIPTION":"Включить гипердвигатель ","NAME":"Артемьев Вадим Владимирович ","PRIORITY":2},{"ID":43,"DESCRIPTION":"Вылечить спока и налить ему суп ","NAME":"Кристин Чапел ","PRIORITY":1},{"ID":44,"DESCRIPTION":"Починить гипердвигатель ","NAME":"Мотнгомери Скотти Скотт ","PRIORITY":3}];

var employerData = request(getEmployerAction);
//var employerData = employerData_Example;
var list_of_chief = [];
list_of_chief.push("");
for (var i = 0; i < employerData.length; i++) {
	list_of_chief.push(employerData[i]["NAME"]);
}
var taskData = request(getTaskAction);
//var taskData = taskData_Example;
var max_priority = 1;
for (var i = 0; i < taskData.length; i++) {
	if(taskData[i]["PRIORITY"] >= max_priority) {
		max_priority = taskData[i]["PRIORITY"] + 1;
	}		
}

store.dispatch(employer_update(employerData));
store.dispatch(task_update(taskData));
store.dispatch(chief_list_update(list_of_chief));
store.dispatch(max_priority_update(max_priority));

// ---- Приложение ----
ReactDOM.render(
	<Provider store={store}>	
		<App />
	</Provider>, 
	document.getElementById("root"));