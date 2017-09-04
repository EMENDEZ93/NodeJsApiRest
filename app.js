const express = require('express');
const mysql = require('mysql');

//create connection
const db = mysql.createConnection({
    host     :'localhost',
    user     :'root',
    password :'',
    database :'nodejsapirest'
});

//connect
db.connect((err) =>{
    if(err){
        throw err;
    }
    console.log('MySql Connected');
});

const app = express();

//create db
app.get('/createdb',(req,res) => {
    let sql = 'CREATE DATABASE nodejsapirest';
    db.query(sql, (err, result) =>{
        if(err) throw err;
            console.log(result);
            res.send('Database created....');
    })
});

app.listen('3000',() => { 
    console.log('Server started on por 3000');
});
 