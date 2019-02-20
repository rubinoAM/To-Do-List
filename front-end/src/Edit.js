import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';

class Edit extends Component{
    constructor(){
        super();
        this.state = {
            task: {}
        }
    }

    componentDidMount(){
        const tId = this.props.match.params.id;
        axios({
            method: 'GET',
            url: `http://localhost:3006/getTask/${tId}`,
        }).then((taskMatched)=>{
            this.setState({
                task:taskMatched.data.task
            })
        });
    }

    changeTask = (e)=>{
        const value = e.target.value;
        let taskStateDummy = {...this.state.task};  //taskStateDummy = {taskName: 'x', taskDate: 'y'}
        taskStateDummy.taskName = value;

        this.setState({
            task:taskStateDummy
        })
    }

    changeDate = (e)=>{
        const value = e.target.value;
        let taskStateDummy = {...this.state.task};
        taskStateDummy.taskDate = moment(value).format('YYYY-MM-DD');

        this.setState({
            task:taskStateDummy
        })
    }

    editTask = (e)=>{
        e.preventDefault();
        axios({
            method:'POST',
            data:{
                task: this.state.task,
                id: this.props.match.params.id,
            },
            url:`http://localhost:3006/edit/`
        }).then((jsonData)=>{
            //console.log(jsonData.data);
            if(jsonData.data.msg === 'updated'){
                this.props.history.push('/');
            }
        });
    }

    render(){
        return(
            <div className="to-do-app">
                <div className="section no-pad-bot" id="index-banner">
                    <div className="container">
                        <h1 className="header center orange-text">To-Do List</h1>
                        <div className="row center">
                            <h5 className="header col s12 light">Edit Entry</h5>
                        </div>
                    </div>
                </div>  
                <div className="container">
                    <form onSubmit={this.editTask} className="add-box">
                        <input onChange={this.changeTask} type="text" id="new-task" value={this.state.task.taskName} />
                        <input onChange={this.changeDate} type="date" id="new-task-date" value={moment(this.state.task.taskDate).format('YYYY-MM-DD')} />
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>            
                </div>
            </div>
        )
    }
}

export default Edit;