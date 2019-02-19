import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import axios from 'axios';

class App extends Component {
  addNewTask(task,date){
    console.log(task,date);
    axios({
      method:'POST',
      url:'http://localhost:3006/addTask',
      data: {
        taskName: task,
        taskDate: date,
      },
    }).then((backEndResp)=>{
      console.log(backEndResp);
    })
  }

  render() {
    return (
      <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" render={()=>{
          return (<Home addNewTask={this.addNewTask} />);
        }} />
      </div>
      </Router>
    );
  }
}

export default App;
