var models = function (app,db){

    app.get('/clientTable',(req,res)=>{
        let sql = 'CREATE TABLE client(cc int, name VARCHAR(50), loyalty VARCHAR(50),PRIMARY KEY (cc))';
        db.query(sql,(err,result)=>{
            if(err)throw err;
            console.log(result);
            res.send('Client table created');
        });

    });

    app.get('/salescheckTable',(req,res)=>{
        let sql = 'CREATE TABLE SalesCheck(IdSale int NOT NULL AUTO_INCREMENT,IdCcSales int, SaleDate DATETIME,SaleStatus VARCHAR(50),PRIMARY KEY (IdSale),FOREIGN KEY (IdCcSales) REFERENCES client(cc))';
        db.query(sql,(err,result)=>{
            if(err)throw err;
            console.log(result);
            res.send('Sales Check table created');
        });

    });

    app.get('/productTable',(req,res)=>{
        let sql = 'CREATE TABLE Product(IdProduct int NOT NULL AUTO_INCREMENT, NameProduct VARCHAR(50), ProductCost int, PRIMARY KEY (IdProduct))';
        db.query(sql,(err,result)=>{
            if(err)throw err;
            console.log(result);
            res.send('Product table created');
        });

    });

    app.get('/itemTable',(req,res)=>{
        let sql = 'CREATE TABLE Item(IdSaleItem int,IdProductItem int, FOREIGN KEY (IdSaleItem) REFERENCES SalesCheck(IdSale), FOREIGN KEY (IdProductItem) REFERENCES Product(IdProduct), quantity int)';
        db.query(sql,(err,result)=>{
            if(err)throw err;
            console.log(result);
            res.send('Item table created');
        });

    });


/* Crear tota las tablas */
    app.get('/createAllTable',(req,res)=>{

            let sql = 'CREATE TABLE client(cc int, name VARCHAR(50), loyalty VARCHAR(50),PRIMARY KEY (cc))';
            db.query(sql,(err,result)=>{
                if(err)throw err;
                console.log(result);
                console.log('Client table created');
            });
        
            let sql1 = 'CREATE TABLE SalesCheck(IdSale int NOT NULL AUTO_INCREMENT,IdCcSales int, SaleDate DATETIME,SaleStatus VARCHAR(50),PRIMARY KEY (IdSale),FOREIGN KEY (IdCcSales) REFERENCES client(cc))';
            db.query(sql1,(err,result)=>{
                if(err)throw err;
                console.log(result);
                console.log('Sales Check table created');
            });
        
            let sql2 = 'CREATE TABLE Product(IdProduct int NOT NULL AUTO_INCREMENT, NameProduct VARCHAR(50), ProductCost int, PRIMARY KEY (IdProduct))';
            db.query(sql2,(err,result)=>{
                if(err)throw err;
                console.log(result);
                console.log('Product table created');
            });
    
    
            let sql3 = 'CREATE TABLE Item(IdSaleItem int,IdProductItem int, FOREIGN KEY (IdSaleItem) REFERENCES SalesCheck(IdSale), FOREIGN KEY (IdProductItem) REFERENCES Product(IdProduct), quantity int)';
            db.query(sql3,(err,result)=>{
                if(err)throw err;
                console.log(result);
                console.log('Item table created');
            });
    
    
            var defaultProduct = [{"IdProduct" : 1,"NameProduct":"DefaultProduct","ProductCost":450},{"IdProduct" : 2,"NameProduct":"Bolsa","ProductCost":20}];
                for(var i = 0; i < defaultProduct.length; i++) {
                    var obj = defaultProduct[i];
                    db.query('insert into Product(IdProduct,NameProduct,ProductCost) values (?,?,?)',[obj.IdProduct,obj.NameProduct,obj.ProductCost], function(err,rows){
                    });
                }



    });

};

module.exports = models;







