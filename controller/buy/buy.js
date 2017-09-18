'use strict';
var buy = function (app,db){
    
   var CircularJSON = require('circular-json')
    
        app.post('/buy/add',function(req,res){  
            var name = req.body.name;
            var cc = req.body.cc;
            var product = req.body.product;
            var quantity = req.body.quantity;
            var loyalty = req.body.loyalty;

                db.query('select * from client where cc = ?',[cc],  (err,rows)=>{
                    try{
                        if(rows[0].cc){
                            creatSalesCheck(rows[0].cc);                            
                        }
                    }catch(err){
                        creatClient(cc,name);                        
                    }
                });            

                function creatClient(cc,name){
                    db.query('insert into client(cc,name,loyalty) values (?,?,?)',[cc,name,loyalty], function(err,rows){
                        creatSalesCheck(cc);
                    });
                }

                function creatSalesCheck(cc){
                    db.query('insert into SalesCheck(IdCcSales,SaleDate,SaleStatus) values (?,?,?)',[cc,'16/09/2001','por pagar'], function(err,rows){
                    });                  
                    db.query('select * from SalesCheck order by IdSale desc limit 1', function(err,rows){
                        addItems(rows[0].IdSale)
                        //res.end(JSON.stringify(rows[0]));                                                
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

        app.get('/firstService/:IdSaleItem',function(req,res){
            db.query('select * from Item where IdSaleItem = ?',[req.params.IdSaleItem], function(err,rows){
                var Items = rows;
                db.query('select * from Product',[Items], function(err,rows){
                    var total = 0;
                    for(var i = 0; i < rows.length; i++) {
                        var obj = rows[i];
                        for(var item = 0; item < Items.length; item++) {
                            if(rows[i].IdProduct == Items[item].IdProductItem){
                                total +=  rows[i].ProductCost * Items[item].IdProductItem;
                            }
                        }
                    }

                    var check = [];                    
                    check.push('******* Factura : ' + req.params.IdSaleItem + '*******');                        
                    for(var i = 0; i < rows.length; i++) {
                        var obj = rows[i];
                        for(var item = 0; item < Items.length; item++) {
                            if(rows[i].IdProduct == Items[item].IdProductItem){
                                check.push( '[ Producto : ' + rows[i].NameProduct +' | Cantidad : ' + Items[item].IdProductItem+' | Und : ' + rows[i].ProductCost + ' | Venta : ' + (rows[i].ProductCost * Items[item].IdProductItem) +' ]');
                            }
                        }
                    }
                   db.query('select * from SalesCheck where IdSale = ?',[req.params.IdSaleItem],  (err,rows)=>{
                       db.query('select * from client where cc = ?',[rows[0].IdCcSales],  (err,rows)=>{
                        if(rows[0].loyalty == 'Yes' ){
                            res.send(check+('******* Valor total | Fidelizacion : ' + (total - (total * 0.1))+' *******'+ 'Descuento 10% de : ' +total + ' *******'));                                                                                            
                        }else{
                            res.send(check+('******* Valor total :' + total+'*******'));                                                                                                                    
                        }
                       });                     
                   });   
                });               
            });
        });

        app.get('/secondService/:IdSaleItem',function(req,res){
            db.query('select * from Item where IdSaleItem = ?',[req.params.IdSaleItem], function(err,rows){
                var Items = rows;
                db.query('select * from Product',[Items], function(err,rows){
                    var total = 0;
                    for(var i = 0; i < rows.length; i++) {
                        var obj = rows[i];
                        for(var item = 0; item < Items.length; item++) {
                            if(rows[i].IdProduct == Items[item].IdProductItem){
                                total +=  rows[i].ProductCost * Items[item].IdProductItem;
                            }
                        }
                    }

                    var check = [];                    
                    var bags = 0;
                    check.push('******* Factura : ' + req.params.IdSaleItem + '*******');                        
                    for(var i = 0; i < rows.length; i++) {
                        var obj = rows[i];
                        for(var item = 0; item < Items.length; item++) {
                            if(rows[i].IdProduct == Items[item].IdProductItem){
                                check.push( '[ Producto : ' + rows[i].NameProduct +' | Cantidad : ' + Items[item].IdProductItem+' | Und : ' + rows[i].ProductCost + ' | Venta : ' + (rows[i].ProductCost * Items[item].IdProductItem) +' ]');
                                if(rows[i].NameProduct == 'Bolsa'){
                                    bags = Items[item].quantity;
                                }                            
                            }
                        }
                    }

                    if(bags==0){
                        res.send(check+('******* Valor total | 0 bolsas : ' + (total-(total*0.25))+' *******'+ 'Descuento 25% de : ' +total + ' *******'));                                                                                                                                            
                    }else{
                        res.send(check+('******* Valor total :' + total+'*******'));                                                                                                                                                                    
                    }
  
                });               
            });
        });


    };
    
    module.exports = buy;