var item = function (app,db){
    
        app.get('/item',function(req,res){
            db.query('select * from Item', function(err,rows){
                res.end(JSON.stringify(rows));
            });
        });
    
        app.get('/item/:IdSaleItem',function(req,res){
            db.query('select * from Item where IdSaleItem = ?',[req.params.IdSaleItem], function(err,rows){
                res.end(JSON.stringify(rows));
            });
        });
        
        app.delete('/client/delete/:cc',function(req,res){
            db.query('delete from client where IdSaleItem = ?',[req.params.cc], function(err,rows){
                res.end(JSON.stringify(rows));
            });
        });
    
        app.post('/item/add',function(req,res){
            db.query('insert into Item(IdSaleItem,IdProductItem,quantity) values (?,?,?)',[req.body.IdSaleItem,req.body.IdProductItem,req.body.quantity], function(err,rows){
                res.end(JSON.stringify(rows));
            });
        });
    
        app.put('/item/update',function(req,res){
            db.query('update Item set quantity=? where IdSaleItem = ? and IdProductItem = ?',[req.body.quantity,req.body.IdSaleItem,req.body.IdProductItem],
             function(err,rows){
                res.end(JSON.stringify(rows));
            });
        });
    
    };
    
    module.exports = item;
    