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
      res.json(nextRes);
    });
  })
});

// GET Tasks
router.get('/getTasks',(req,res,next)=>{
  const selectQuery = `SELECT * FROM tasks;`;

  connection.query(selectQuery,(err,results)=>{
    if(err){throw err;}
    res.json(results);
  });
})

router.get('/getTask/:tId',(req,res,next)=>{
  const tId = req.params.tId;
  const selectTaskQuery = `SELECT * FROM tasks WHERE id = ?;`;
  connection.query(selectTaskQuery,[tId],(err,result)=>{
    if(err){throw err}
    console.log(result[0]);
    res.json({task:result[0]});
  });
});

module.exports = router;