var client = function (app,db){

    app.get('/clients',function(req,res){
        db.query('select * from client', function(err,rows){
            res.end(JSON.stringify(rows));
        });
    });

    app.get('/client/:cc',function(req,res){
        db.query('select * from client where cc = ?',[req.params.cc], function(err,rows){
            res.end(JSON.stringify(rows));
        });
    });
    
    app.delete('/client/delete/:cc',function(req,res){
        db.query('delete from client where cc = ?',[req.params.cc], function(err,rows){
            res.end(JSON.stringify(rows));
        });
    });

    app.post('/client/add',function(req,res){
        db.query('insert into client(cc,name) values (?,?)',[req.body.cc,req.body.name], function(err,rows){
            res.end(JSON.stringify(rows));
        });
    });

    app.put('/client/update',function(req,res){
        db.query('update client set cc=?, name = ? where cc = ?',[req.body.cc,req.body.name,req.body.cc],
         function(err,rows){
            res.end(JSON.stringify(rows));
        });
    });

};

module.exports = client;
