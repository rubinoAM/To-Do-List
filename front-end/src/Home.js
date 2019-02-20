import React, { Component } from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';

class Home extends Component{
    constructor(){
        super();
        this.state = {
            task: '',
            date: '',
        };
        this.changeTask = this.changeTask.bind(this);
        this.changeDate = this.changeDate.bind(this);
    }

    addNewTask = (e)=>{ //You can do this so you won't have to do this.method.bind(this) up top.
        e.preventDefault();
        this.props.addNewTask(this.state.task, this.state.date);
    }

    changeTask(e){
        this.setState({
            task:e.target.value,
        });
    }

    changeDate(e){
        this.setState({
            date:e.target.value,
        });
    }

    render(){
        const taskArray = this.props.taskList.map((task)=>{
            return(
                <tr key={task.id}>
                    <td>{task.taskName} - {moment(task.taskDate).format('MMMM Do YYYY')}</td>
                    <td>
                        <button className="btn red waves-effect waves-light">
                            <i className="material-icons">delete</i>
                        </button>
                    </td>
                    <td>
                        <Link to={"/edit/"+task.id}>
                            <button className="btn blue waves-effect waves-light">
                                <i className="material-icons">edit</i>
                            </button>
                        </Link>
                    </td>
                </tr>
            )
        });

        return(
            <div className="to-do-app">
                <div className="section no-pad-bot" id="index-banner">
                    <div className="container">
                        <h1 className="header center orange-text">To-Do List</h1>
                        <div className="row center">
                            <h5 className="header col s12 light">Made with React and Express</h5>
                        </div>
                    </div>
                </div>    
                <div className="container">
                    <form onSubmit={this.addNewTask} className="add-box">
                        <input onChange={this.changeTask} type="text" id="new-task" placeholder="New Task" value={this.state.task} />
                        <input onChange={this.changeDate} type="date" id="new-task-date" value={this.state.date} />
                        <button type="submit" className="btn btn-primary waves-effect waves-light">Add Task</button>
                    </form>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taskArray}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Home;