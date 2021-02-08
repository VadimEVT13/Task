import React from 'react';
import MaterialTable from "material-table";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { connect } 			from 'react-redux';
import mapDispatchToProps 	from './../../store/mapDispatchToProps.js';
import mapStateToProps 		from './../../store/mapStateToProps.js';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import { forwardRef } from 'react';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

class TaskView extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div style={{ maxWidth: "100%" }}>
				<MaterialTable 
					icons={tableIcons}
					columns={[
					{
						title: "ID",
						field: "ID",
						type:  "numeric"
					},
					{
						title: "Название",
						field: "DESCRIPTION",
						render: rowData => 
							<a href="#" onClick={() => {
								let task = {
									id: 			rowData.ID,
									description: 	rowData.DESCRIPTION,
									chief: 			rowData.NAME,
									priority: 		rowData.PRIORITY
								};
								this.props.change_cur_task(task);
								this.props.onStageChange('TaskModif');
								}}>
								{rowData.DESCRIPTION}
							</a>
					},
					{ title: "Исполнитель", field: "NAME" },
					{ title: "Приоритет", field: "PRIORITY", type: "numeric" }
					]}
					data={this.props.task_data}
					title={<button onClick={()=>{this.props.onStageChange('TaskAdd')}}>Создать задачу</button>}
					/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskView);