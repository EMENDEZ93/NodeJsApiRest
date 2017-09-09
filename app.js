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

//create table
app.get('/createpostable',(req,res) =>{
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql,(err, result) =>{
        if(err) throw err;
        res.send('Post table created.....'); 
    });
});

//insert post 1
app.get('/addpost1', (req,res) => {
    let post = {title:'Post One',body:'this is post number one'};
    let sql = 'INSERT INTO posts SET?';
    let query = db.query(sql, post,(err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('Post 1 added...');
    });
});

//select post
app.get('/getposts', (req,res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql,(err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('Post fetched...');
    });
});

//select single post
app.get('/getpost/:id', (req,res) => {
    let sql = 'SELECT * FROM posts WHERE id => ${req.params.id}';
    let query = db.query(sql,(err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('Postfetched...');
    });
});

app.listen('3000',() => { 
    console.log('Server started on por 3000');
});
 