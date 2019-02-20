import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Edit from './Edit';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
      taskList: [],
    }
  }

  componentDidMount(){
    axios({
      method:'GET',
      url:'http://localhost:3006/getTasks',
    }).then((storedTasks)=>{
      this.setState({
        taskList:storedTasks.data
      });
    })
  }

  addNewTask = (task,date)=>{
    console.log(task,date);
    axios({
      method:'POST',
      url:'http://localhost:3006/addTask',
      data: {
        taskName: task,
        taskDate: date,
      },
    }).then((backEndResp)=>{
      this.setState({
        taskList:backEndResp.data,
      });
    })
  }

  deleteTask = (id)=>{
    axios({
      method:'POST',
      url:`http://localhost:3006/deleteTask/${id}`,
    }).then((backEndResp)=>{
      axios({
        method:'GET',
        url:'http://localhost:3006/getTasks',
      }).then((storedTasks)=>{
        this.setState({
          taskList:storedTasks.data
        });
      })
    })
  }

  render() {
    return (
      <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" render={()=>{
          return (<Home taskList={this.state.taskList} deleteTask={this.deleteTask} addNewTask={this.addNewTask} />);
        }} />
        <Route exact path="/edit/:id" component={Edit} />
      </div>
      </Router>
    );
  }
}

export default App;
