import React from 'react';
import EmployerView from './employer/employer_view.js';
import TaskView from './task/task_view.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class MyTabs extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (		
		<Tabs>
			<TabList>
				<Tab>Сотрудники</Tab>
				<Tab>Задачи</Tab>
			</TabList>
			<TabPanel>
				<EmployerView onStageChange={this.props.onStageChange}/>
			</TabPanel>
			<TabPanel>
				<TaskView onStageChange={this.props.onStageChange}/>
			</TabPanel>
		</Tabs>
		);
	}
}

export default MyTabs;