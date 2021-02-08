import React from "react";
import "../../css/form-style.css";

import { connect } 			from 'react-redux';
import mapDispatchToProps 	from './../../store/mapDispatchToProps.js';
import mapStateToProps 		from './../../store/mapStateToProps.js';
import { request, actions } from './../request-tool.js';

class TaskModif extends React.Component {
    constructor(props) {
        super(props);
        
		this.state = {
			description: 	this.props.cur_task.description,
			chief: 			this.props.cur_task.chief,
			priority: 		this.props.cur_task.priority
		};
		
        this.onChangeDescription    = this.onChangeDescription.bind(this);
        this.onChangeChief          = this.onChangeChief.bind(this);
        this.onChangePriority       = this.onChangePriority.bind(this);
        this.handleSubmit           = this.handleSubmit.bind(this);
        this.deleteTask 			= this.deleteTask.bind(this);
    }
    
    onChangeDescription(e) {
		var task = this.props.cur_task;
        var val = e.target.value;
        task.description = val;
		this.props.change_cur_task(task);
        this.setState({description: val});
    }
    
    onChangeChief(e) {
		var task = this.props.cur_task;
        var val = e.target.value;
        task.chief = val;
		this.props.change_cur_task(task);
        this.setState({chief: val});
    }
    
    onChangePriority(e) {
		var task = this.props.cur_task;
        var val = e.target.value;
        task.priority = val;
		this.props.change_cur_task(task);
        this.setState({priority: val});
    }
    
    handleSubmit(e) {        
		let submitAction = {
			name: actions.TASK_MODIF,
			data: {
				description: 	this.state.description,
				chief: 			this.state.chief,
				priority: 		this.state.priority,
				id: 			this.props.cur_task.id
			}
		};
		request(submitAction);
    }  
    
    deleteTask() {		
		let submitAction = {
			name: actions.TASK_DELETE,
			data: this.props.cur_task.id
		};       
		request(submitAction);
    }
    
    render() {
        return (
            <div className="formDiv">
				<button onClick={()=>{this.props.onStageChange('MyTabs')}}>Отменить</button>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <label>Описание:</label><br />
                        <textarea 
                            type="text" 
                            value={this.state.description} 
                            onChange={this.onChangeDescription}/>
                    </p>
                    <p>
                        <label>Ответственный:</label><br />
                        <select 
                            type="text"  
                            value={this.state.chief} 
                            onChange={this.onChangeChief}>
                            {
                                this.props.chief_list.map(function(item) {
                                    return <option value={item} key={item}>{item}</option>
                                })
                            }                        
                        </select>                    
                    </p>
                    <p>
                        <label>Приоритет:</label><br />
                        <input 
                            type="number" 
                            value={this.state.priority} 
                            onChange={this.onChangePriority}
                            min="1"
                            max={this.props.max_priority}/>                    
                    </p>
                    <input type="submit" value="Отправить"/>
                </form>
                <button type='submit' onClick={this.deleteTask}>Удалить</button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskModif);