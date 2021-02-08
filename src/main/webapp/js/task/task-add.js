import React from "react";
import "../../css/form-style.css";

import { connect } 			from 'react-redux';
import mapDispatchToProps 	from './../../store/mapDispatchToProps.js';
import mapStateToProps 		from './../../store/mapStateToProps.js';
import { request, actions } from './../request-tool.js';

class TaskAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {discription: "", chief: "", priority: "1"};
        
        this.onChangeDiscription    = this.onChangeDiscription.bind(this);
        this.onChangeChief          = this.onChangeChief.bind(this);
        this.onChangePriority       = this.onChangePriority.bind(this);
        this.handleSubmit           = this.handleSubmit.bind(this);
    }
    
    onChangeDiscription(e) {
        var val = e.target.value;
        this.setState({discription: val});
    }
    
    onChangeChief(e) {
        var val = e.target.value;
        this.setState({chief: val});
    }
    
    onChangePriority(e) {
        var val = e.target.value;
        this.setState({priority: val});
    }
    
    handleSubmit(e) {
		let submitAction = {
			name: actions.TASK_ADD,
			data: {
				description: 	this.state.discription,
				chief:			this.state.chief,
				priority:		this.state.priority
			}
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
							value={this.state.discription} 
							onChange={this.onChangeDiscription}/>
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
					<button type='submit'>Отправить</button>
				</form>
			</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskAdd);