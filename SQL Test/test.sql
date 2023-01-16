-- MySQL Syntax
-- 1. Total sale for each Sale
Select SaleName, sum(price) From Sale as S, SaleOrder as O, SaleOrderDetail as D WHERE
S.saleid = O.Saleid AND O.orderId  = D.OrderId group by S.SaleID

-- 2. Top 3 products, Q1,Q2
Select orderdate, ProductName, sum(price*qty) as TotalPrice from saleorder as S,saleorderdetail as O,product as P 
WHERE (orderdate BETWEEN '1/1/2020' AND '30/6/2020') AND s.orderID = O.orderID AND O.productID = p.productID group by p.productid order by totalprice DESC LIMIT 3

-- 3. VIP customer purchase details
SELECT CustomerName, ProductName, Qty, Price from Customer as C, SaleOrder as S, SaleOrderDetail as O, Product as P
WHERE C.customerId = S.customerId AND S.orderID = O.OrderID AND O.productID = P.productId AND C.customerType = 'VIP'
ORDER BY C.customerName

-- 4. Add new customer
INSERT INTO Customer (customerid,CustomerCode,CustomerName,CustomerType) VALUES (
  'C05',
  'C005',
  'Teeranai',
  'General'
)