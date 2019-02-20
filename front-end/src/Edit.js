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
        taskStateDummy.taskDate = value;

        this.setState({
            task:taskStateDummy
        })
    }

    editTask = (e)=>{
        e.preventDefault();
    }

    render(){
        return(
            <div className="container">
                <form onSubmit={this.editTask} className="add-box">
                    <input onChange={this.changeTask} type="text" id="new-task" value={this.state.task.taskName} />
                    <input onChange={this.changeDate} type="date" id="new-task-date" value={moment(this.state.task.taskDate).format('YYYY-MM-DD')} />
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>            
            </div>
        )
    }
}

export default Edit;