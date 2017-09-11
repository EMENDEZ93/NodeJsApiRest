const express = require('express');
const mysql = require('mysql');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());


/******************create connection*****************/
const db = mysql.createConnection({
    host     :'localhost',
    user     :'root',
    password :'',
    database :'nodejsapirest' // comment this line when creating the database for the first time
});

/**********************connect**********************/
db.connect((err) =>{
    if(err){
        throw err;
    }
    console.log('MySql Connected');
});

/**********************create db**********************/
app.get('/createdb',(req,res) => {
    let sql = 'CREATE DATABASE nodejsapirest';
    db.query(sql, (err, result) =>{
        if(err) throw err;
            console.log(result);
            res.send('Database created....');
    })
});


/**********************Controller**********************/
var models = require('./controller/models');
models(app,db);

var client = require('./controller/client/client');
client(app,db);

var salescheck = require('./controller/salescheck/salescheck');
salescheck(app,db);



app.listen('3000',() => { 
    console.log('Server started on por 3000');
});
 