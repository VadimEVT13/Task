import React from 'react';
 
import { connect } 			from 'react-redux';
import mapDispatchToProps 	from './../store/mapDispatchToProps.js';
import mapStateToProps 		from './../store/mapStateToProps.js';
 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import EmployerModif from 	'./employer/employer-modif';
import EmployerAdd from 	'./employer/employer-add';
import TaskModif from 		'./task/task-modif';
import TaskAdd from 		'./task/task-add';
import Config from 			'./configuration.js';

import MyTabs from './tabs-view.js';

class App extends React.Component {
	constructor(props) {
		super(props);
		
		this.switchContext = this.switchContext.bind(this);
		this.onButtonClick = this.onButtonClick.bind(this);
		
		this.state = {
			context: this.switchContext('MyTabs')
		};
	}
	
	onButtonClick(newStage) {
		this.setState({context: this.switchContext(newStage)});
	}
  
  	switchContext(name) {
		switch(name) {
			case 'MyTabs':
				return <MyTabs onStageChange={this.onButtonClick}/>;
			case 'EmployerAdd':
				return <EmployerAdd onStageChange={this.onButtonClick}/>;
			case 'TaskAdd':
				return <TaskAdd onStageChange={this.onButtonClick} />;
			case 'EmployerModif':
				return <EmployerModif onStageChange={this.onButtonClick} />;
			case 'TaskModif':
				return <TaskModif onStageChange={this.onButtonClick} />;
			default:
				return (<div>
					<h1>Default</h1>
					</div>);
		}
	}
	 
	render() {
		return (
			<div>
				{this.state.context}
			</div>
		);
	}
};

export default App;