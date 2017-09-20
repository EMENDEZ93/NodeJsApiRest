var product = function (app,db){
    
        app.get('/product',function(req,res){
            db.query('select * from Product', function(err,rows){
                res.end(JSON.stringify(rows));
            });
        });
    
        app.get('/product/:IdProduct',function(req,res){
            db.query('select * from Product where IdProduct = ?',[req.params.IdProduct], function(err,rows){
                res.end(JSON.stringify(rows));
            });
        });
        
        app.delete('/product/delete/:IdProduct',function(req,res){
            db.query('delete from Product where IdProduct = ?',[req.params.IdProduct], function(err,rows){
                res.end(JSON.stringify(rows));
            });
        });
    
        app.post('/product/add',function(req,res){
            db.query('insert into Product(IdProduct,NameProduct,ProductCost) values (?,?,?)',[req.body.IdProduct,req.body.NameProduct,req.body.ProductCost], function(err,rows){
                res.end(JSON.stringify(rows));
            });
        });
    
        app.put('/product/update',function(req,res){
            db.query('update product set IdProduct=?,NameProduct=?,ProductCost=? where IdProduct=?',[req.body.IdProduct,req.body.NameProduct,req.body.ProductCost,req.body.IdProduct],
             function(err,rows){
                res.end(JSON.stringify(rows));
            });
        });
    
    };
    
    module.exports = product;
    