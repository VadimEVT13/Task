import React from "react";
import "../../css/form-style.css";

import { connect } 			from 'react-redux';
import mapDispatchToProps 	from './../../store/mapDispatchToProps.js';
import mapStateToProps 		from './../../store/mapStateToProps.js';
import { request, actions } from './../request-tool.js';

class EmployerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			name: "", 
			chief: "", 
			branch: ""
		};
        
        this.onChangeName   = this.onChangeName.bind(this);
        this.onChangeChief  = this.onChangeChief.bind(this);
        this.onChangeBranch = this.onChangeBranch.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);
    }
    
    onChangeName(e) {
        var val = e.target.value;
        this.setState({name: val});
    }
    
    onChangeChief(e) {
        var val = e.target.value;
        this.setState({chief: val});
    }
    
    onChangeBranch(e) {
        var val = e.target.value;
        this.setState({branch: val});
    }
    
    handleSubmit(e) {
        let submitAction = {
			name: actions.EMPLOYER_ADD,
			data: {
				name: 	this.state.name,
				chief:	this.state.chief,
				branch:	this.state.branch
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
						<label>ФИО:</label><br />
						<input type="text" value={this.state.name} onChange={this.onChangeName}/>
					</p>
					<p>
						<label>Начальник:</label><br />
						<select type="text"  value={this.state.chief} onChange={this.onChangeChief}>
							{
								this.props.chief_list.map(function(item) {
									return <option value={item} key={item}>{item}</option>
								})
							}                        
						</select>                    
					</p>
					<p>
						<label>Филиал:</label><br />
						<input type="text" value={this.state.branch} onChange={this.onChangeBranch}/>                    
					</p>
					<button type="submit">Отправить</button>
				</form>
			</div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployerAdd);