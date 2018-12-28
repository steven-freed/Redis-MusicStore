const redisdb = require('redis');
const mysqldb = require("mysql");
const express = require('express'); // Backend config

// Create Express router to route to index.js express app
const router = express.Router();

// redis client
var redisPORT = '6379';
var sqlPORT = '3306';
var HOST = '127.0.0.1'
let redis = redisdb.createClient(redisPORT, HOST, {no_ready_check: true});

// MySQL
var mysql = mysqldb.createConnection({
 host: HOST,
 user: 'root',
 password: 'password',
 database: 'MusicStore',
 port: sqlPORT
});

mysql.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Successful connection to MySQL on port ' + sqlPORT)
  }
});

redis.on('connect', function() {
  console.log('Successful connection to Redis on port ' + redisPORT);
});

/*
 *  Gets a users cart (Redis Cache)
 */
router.post('/cart', function(req, res) {
  let id = req.body.id;

  redis.zrange('cart_' + id, 0, -1, 'WITHSCORES', function(err, obj) {
    if (obj)
    {
      let cart = listToCart(obj);
      let jsonCart = parseson(cart);
      res.json(jsonCart);
    } else {
      res.json(err);
    }
  });
});

/*
 *  Adds Item to Cart (Redis)
 *    - holds "productid:name:price" as value (delimited in Redis by colons)
 *    - holds "quantity" as score (sorted list in Redis)
 */
router.post('/addToCart', function(req, res) {
  let id = req.body.id;
  let item = req.body.item;
  let productInfo = item.productid + ":" + item.name + ":" + item.price;

  // if item is NOT in cache
  if (checkScore(id, productInfo) === 0)
  {

		redis.zadd('cart_' + id, item.quantity, productInfo, function(err, obj) {
      if (obj)
      {
        res.status(200).json(obj);
      } else {
        res.status(400).json(err);
      }
  });

// if item IS already in cache
} else {

 if (incQuantity(id, productInfo) === 0)
 {
    res.status(400).json({
      error: 'Something went wrong...'
    });
  } else {
    res.status(200).json(1);
  }

}

});

/*
 *  Checks if item is already in Redis Cache
 */
function checkScore(id, value)
{
  redis.ZSCORE('cart_' + id, value, function(err, obj) {
    if (obj > 0)
    {
        return 1;
    } else {
      return 0;
    }
  });
}

/*
 *  Increments the quantity of an item in Redis Cache
 */
function incQuantity(id, product)
{
    redis.ZINCRBY("cart_" + id, 1, product, function(err, obj) {
        if (obj)
        {
          return 1;
        } else {
          return 0;
        }
      });
}

/*
 *  Removes item from Redis Cache
 */
router.post('/removeFromCart', function(req, res) {
  let id = req.body.id;
  let item = req.body.item;

  console.log(item);

  redis.zrem('cart_' + id, item, function(err, obj) {
    if (obj)
    {
      res.json(obj);
    } else {
      res.json({
        status: obj
      })
    }
  });

});

/*
 *  Clears a users Redis shopping cart
 */
router.post('/clearCart', function(req, res) {
  let id = req.body.id;
  redis.del('cart_' + id, function(err, obj) {
    if (obj)
    {
      res.json(obj);
    } else {
      res.json({
        status: obj
      });
    }
  });
});

/*
 *  Gets all products from MySQL database
 */
router.post('/products', function(req, res){

  let department = req.body.department;
  let query = "SELECT * FROM Products WHERE department = '" + department + "'";

  mysql.query(query, function(error, results, fields) {

      if (error)
      {
        res.status(400).json(error);
      } else {
        res.status(200).json(results);
      }
});
});

/*
 *  Converts Sorted Set to a list of string encoded json objects
 */
function listToCart(list)
{
  var cart = [];
  var i, q;
  for (i = 0, q = 1; i < list.length; i+=2, q+=2)
  {
    let productDetail = list[i].split(":");

    var product = {
        productid: parseInt(productDetail[0]),
        name: productDetail[1],
        price: (Math.round(productDetail[2] * 100) / 100),
        quantity: list[q]
    };
    cart.push(JSON.stringify(product));
  }

  return cart;
}

/*
 *  Parses Redis List of String encoded json objects
 *  and returns a list of json objects
 */
function parseson(list)
{
  var newList = [];

  list.forEach(function(value) {
      newList.push(JSON.parse(value));
  })
  return newList;
}

module.exports = router;
