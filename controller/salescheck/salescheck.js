var salescheck = function (app,db){

    app.get('/salescheck',function(req,res){
        db.query('select * from SalesCheck', function(err,rows){
            res.end(JSON.stringify(rows));
        });
    });

    app.get('/salescheck/:IdSale',function(req,res){
        db.query('select * from SalesCheck where IdSale = ?',[req.params.IdSale], function(err,rows){
            res.end(JSON.stringify(rows));
        });
    });
    
    app.delete('/salescheck/delete/:IdSale',function(req,res){
        db.query('delete from SalesCheck where IdSale = ?',[req.params.IdSale], function(err,rows){
            res.end(JSON.stringify(rows));
        });
    });

    app.post('/salescheck/add',function(req,res){
        db.query('insert into SalesCheck(IdSale,SaleDate,SaleStatus) values (?,?,?)',[req.body.IdSale,req.body.SaleDate,req.body.SaleStatus], function(err,rows){
            res.end(JSON.stringify(rows));
        });
    });

    app.put('/salescheck/update',function(req,res){
        db.query('update SalesCheck set IdSale=?, SaleDate=?, SaleStatus=? where IdSale=?',[req.body.IdSale,req.body.SaleDate,req.body.SaleStatus,req.body.IdSale],
         function(err,rows){
            res.end(JSON.stringify(rows));
        });
    });

};

module.exports = salescheck;
