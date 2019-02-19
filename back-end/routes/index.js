var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const config = require('../config');
const connection = mysql.createConnection(config);
connection.connect();

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Add Task
router.post('/addTask', (req,res,next) => {
  const taskName = req.body.taskName;
  const taskDate = req.body.taskDate;
  const insertQuery = `INSERT INTO tasks(taskName,taskDate)
    VALUES (?,?);`;

  connection.query(insertQuery,[taskName,taskDate],(err,results)=>{
    if(err){throw err;}
    const getTasksQuery = `SELECT * FROM tasks;`;
    connection.query(getTasksQuery,(nextErr,nextRes)=>{
      if(nextErr){throw nextErr;}
      res.json({nextRes})
    });
  })
});

module.exports = router;