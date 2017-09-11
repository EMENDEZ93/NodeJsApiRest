var models = function (app,db){

    app.get('/clientTable',(req,res)=>{
        let sql = 'CREATE TABLE client(cc int, name VARCHAR(50),PRIMARY KEY (cc))';
        db.query(sql,(err,result)=>{
            if(err)throw err;
            console.log(result);
            res.send('Client table created');
        });

    });

    app.get('/salescheckTable',(req,res)=>{
        let sql = 'CREATE TABLE SalesCheck(IdSale int NOT NULL AUTO_INCREMENT, SaleDate DATETIME,SaleStatus VARCHAR(50),PRIMARY KEY (IdSale))';
        db.query(sql,(err,result)=>{
            if(err)throw err;
            console.log(result);
            res.send('Sales Check table created');
        });

    });


};

module.exports = models;







