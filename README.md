# Redis Music Store

Music store mobile application created using React Native. The application has a page of departments and allows users to add items to a cart and place orders. The products and orders are stored in a MySQL database. Redis is used as a shopping cart to store products for a user.

## Frontend

Created using React Native and tested using the Expo client. React Navigation is used to transition between screens.

## Backend

REST Api created using Express via Node.js. MySQL database used to hold orders and products. Redis used to hold products for a user shopping cart. Triggers, table creation commands, and sample data for MySQL in '/backend/MySQL\ Scripts/schema.sql'.

### App Sample Screen Shots

Home Page
![Alt text](/appScreenShots/home.PNG?raw=true)

Products
![Alt text](/appScreenShots/products.PNG?raw=true)

Network Error Handling
![Alt text](/appScreenShots/networkError.PNG?raw=true)

Shopping Cart
![Alt text](/appScreenShots/cart.PNG?raw=true)

Delete from Shopping Cart
![Alt text](/appScreenShots/cart.PNG?raw=true)

Order
![Alt text](/appScreenShots/order.PNG?raw=true)

#### Running The Project

Frontend:
install all node packages with
```
$ npm install
```
run app using expo
```
$ expo start
```

NOTE: If using Expo to run the app change the api host to your machines IP. The code shows the host as local (127.0.0.1) for api calls.

Backend:
set up a MySQL database and run table creation commands, trigger creation command, and load with sample data.

run a Redis server

install all node packages with
```
$ npm install
```

run api
```
$ npm start
```

NOTE: Change MySQL and Redis port and host in Express code as needed.
