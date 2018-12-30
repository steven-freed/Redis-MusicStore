# Redis Music Store

Music store mobile application created using React Native. The application has a page of departments and allows users to add items to a cart and place orders. The products and orders are stored in a MySQL database. Redis is used as a shopping cart to store products for a user.

## Frontend

Created using React Native and tested using the Expo client. React Navigation is used to transition between screens.

## Backend

REST Api created using Express via Node.js. MySQL database used to hold orders and products. Redis used to hold products for a user shopping cart. Triggers, table creation commands, and sample data for MySQL in '/backend/MySQL\ Scripts/schema.sql'.

## App Sample Screen Shots

| ![Alt text](/appScreenShots/home.PNG?raw=true) |
|:--:|
| *Home Page* |

| ![Alt text](/appScreenShots/products.PNG?raw=true) |
|:--:|
| *Products* |

| ![Alt text](/appScreenShots/networkError.PNG?raw=true) |
|:--:|
| *Network Error Handling* |

| ![Alt text](/appScreenShots/cart.PNG?raw=true) |
|:--:|
| *Shopping Cart* |

| ![Alt text](/appScreenShots/delete.PNG?raw=true) |
|:--:|
| *Delete from Shopping Cart* |

| ![Alt text](/appScreenShots/order.PNG?raw=true) |
|:--:|
| *Order* |

## Running The Project

### Frontend:
1. Install all node packages with
```
$ npm install
```
2. Run app using expo
```
$ expo start
```

NOTE: If using Expo to run the app change the api host to your machines IP. The code shows the host as local (127.0.0.1) for api calls.

### Backend:
1. Set up a MySQL database and run table creation commands, trigger creation command, and load with sample data.

2. Run a Redis server
   Products are stored in Redis (shopping cart) as a 'Sorted Set'
   Sorted Set: Score is used to represent the quantity of a specific product. Member name is a string of attributes delimited by a colon.<br />
   ex.<br />
      member:   "productId:name:price" <br />
      score:    2 <br />

3. Install all node packages with
```
$ npm install
```

4. Run api
```
$ npm start
```

NOTE: Change MySQL and Redis port and host in Express code as needed.
