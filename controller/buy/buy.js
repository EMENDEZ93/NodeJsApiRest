'use strict';
var buy = function (app,db){
    
   var CircularJSON = require('circular-json')
    
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
    
        app.post('/buy/add',function(req,res){  
            var name = req.body.name;
            var cc = req.body.cc;
            var product = req.body.product;
            var quantity = req.body.quantity;
            
                db.query('select * from client where cc = ?',[cc],  (err,rows)=>{
                    try{
                        if(rows[0].cc){
                            creatSalesCheck(rows[0].cc);                            
                        console.log('Primero');
                        }
                    }catch(err){
                        creatClient(cc,name);                        
                        console.log('Segundo');                        
                    }
                });            

                function creatClient(cc,name){
                    db.query('insert into client(cc,name) values (?,?)',[cc,name], function(err,rows){
                        creatSalesCheck(cc);
                    });
                }

                function creatSalesCheck(cc){
                    db.query('insert into SalesCheck(IdCcSales,SaleDate,SaleStatus) values (?,?,?)',[cc,'16/09/2001','por pagar'], function(err,rows){
                    });                  
                    db.query('select * from SalesCheck order by IdSale desc limit 1', function(err,rows){
                        addItems(rows[0].IdSale)
                        res.end(JSON.stringify(rows[0]));                                                
                    });                    
                }

                function addItems(IdSale){

                    for(var i = 0; i < product.length; i++) {
                        var obj = product[i];
                        db.query('insert into Item(IdSaleItem,IdProductItem,quantity) values (?,?,?)',[IdSale,obj.product,obj.quantity], function(err,rows){
                        });   
                    }
                }

            });

        app.put('/buy/update',function(req,res){
            db.query('update Item set quantity=?  where IdProductItem = ? and IdSaleItem = ?',[req.body.quantity,req.body.product,req.body.idsaleitem],
             function(err,rows){
                res.end(JSON.stringify(rows));
            });
        });
    
        app.delete('/buy/item/delete',function(req,res){
            db.query('delete from Item where IdProductItem = ? and IdSaleItem = ?',[req.body.product,req.body.idsaleitem],
             function(err,rows){
                res.end(JSON.stringify(rows));
            });
        });



    };
    
    module.exports = buy;