import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';

class App extends Component {
  addNewTask(e){
    e.preventDefault();
    console.dir(e.target);
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
