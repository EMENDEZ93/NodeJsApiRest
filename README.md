# NodeJsApiRest


1. Gestionar Compras
  
  A. crear compra:
     link: http://localhost:3000/buy/add
     postman : post
     
        {"name":"Cliente 1",
        "cc":2017,
	        "product": [
                {"product" :2, 
                "quantity":1
                },
                {"product" :1, 
                "quantity":100
                }],
                "loyalty":"No"
        }             

  B. actualizar compra (productos):
      link: http://localhost:3000/buy/update
      postman: put

      {"quantity":20,"product":2,"idsaleitem":1}
      
  C. eliminar producto de la compra;
     link: http://localhost:3000/buy/item/delete      
     postman: delete
     
     {"product":1,"idsaleitem":9}
 
 D. Cambiar estado de la factura (por pagar, cancelada, etc):
     link: http://localhost:3000/salescheck/update 
     postman: put     
 
     {"IdSale":9320,"SaleDate":"2017-01-01","SaleStatus":"Cancelada"}
     
2. Uno que permita calcular el valor de cada factura, se cobraran 450 por cada producto, 20 por cada bolsa y un descuento del 10% si el cliente maneja programa de fidelizacion:
    link: http://localhost:3000/firstService/( id de la compra )
    postman: get
    
3. Otro que cree, para una factura existente, un descuento del 25% si el cliente no usa bolsas.
    link: http://localhost:3000/secondService/( id de la compra )
    postman: get
    
4. Uno mas que añada, para una compra, sobrecosto del 10% si hay mas de 100 productos o si el cliente usa mas de 10 bolsas.
    link: http://localhost:3000/thirdService/( id de la compra )    
    postman: get


     
     
     
