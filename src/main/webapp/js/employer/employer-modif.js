import React from "react";
import "../../css/form-style.css";

import { connect } 			from 'react-redux';
import mapDispatchToProps 	from './../../store/mapDispatchToProps.js';
import mapStateToProps 		from './../../store/mapStateToProps.js';
import { request, actions } from './../request-tool.js';

class EmployerModif extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
			name: 	this.props.cur_employer.name,
			chief: 	this.props.cur_employer.chief,
			branch: this.props.cur_employer.branch
		};
		
        this.onChangeName   = this.onChangeName.bind(this);
        this.onChangeChief  = this.onChangeChief.bind(this);
        this.onChangeBranch = this.onChangeBranch.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);
        this.deleteEmployer = this.deleteEmployer.bind(this);
	};
	
	
    onChangeName(e) {
		var employer = this.props.cur_employer;
        var val = e.target.value;
        employer.name = val;
		this.setState({name: val});
		this.props.change_cur_employer(employer);		
    }
    
    onChangeChief(e) {
		var employer = this.props.cur_employer;
        var val = e.target.value;
        employer.chief = val;
		this.setState({chief: val});
		this.props.change_cur_employer(employer);
    }
    
    onChangeBranch(e) {
		var employer = this.props.cur_employer;
        var val = e.target.value;
        employer.branch = val;
		this.setState({branch: val});
		this.props.change_cur_employer(employer);
    }
    
    handleSubmit(e) {
		let submitAction = {
			name: actions.EMPLOYER_MODIF,
			data: {
				name: 	this.state.name,
				chief: 	this.state.chief,
				branch: this.state.branch,
				id: 	this.props.cur_employer.id
			}
		};
		request(submitAction);
    }  
    
    deleteEmployer() {		
		let submitAction = {
			name: actions.EMPLOYER_DELETE,
			data: this.props.cur_employer.id
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
                        <input type="text" value={this.props.cur_employer.name} onChange={this.onChangeName}/>
                    </p>
                    <p>
                        <label>Начальник:</label><br />
                        <select type="text"  value={this.props.cur_employer.chief} onChange={this.onChangeChief}>
                            {
                                this.props.chief_list.map(function(item) {
                                    return <option value={item} key={item}>{item}</option>
                                })
                            }                        
                        </select>                    
                    </p>
                    <p>
                        <label>Филиал:</label><br />
                        <input type="text" value={this.props.cur_employer.branch} onChange={this.onChangeBranch}/>
                    </p>
                    <input type="submit" value="Отправить"/>
                </form>
                <button type='submit' onClick={this.deleteEmployer}>Удалить</button>
            </div>
        );
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployerModif);