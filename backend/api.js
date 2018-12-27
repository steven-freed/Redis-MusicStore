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

router.post('/cart', function(req, res) {
  let id = req.body.id;

  redis.zrange('cart_' + id, 0, -1, 'WITHSCORES', function(err, obj) {
    if (obj)
    {
      let cart = listToCart(obj);
      let jsonCart = parseson(cart);
      res.json({
        items: jsonCart
      });
    } else {
      res.json(err);
    }
  });
});

router.post('/addToCart', function(req, res) {
  let id = req.body.id;
  let item = req.body.item;

  // quantity is stored as Redis score, productid is stored as Redis value
  let args = [item.quantity, item.productid];
  args.unshift('cart_' + id);
  args.join("','");

		redis.zadd(...args, function(err, obj) {
      if (obj)
      {
        console.log('if');
        res.json(obj);
      } else {
        console.log('else')

       if (checkQuantity(id, item.productid) === 0) {
          res.status(400).json({
            error: 'Something went wrong...'
          });
        } else {
          res.status(200).json(1);
        }
      }
  });

});

function checkQuantity(id, productid)
{
  var flag = 0;
  var score = 0;
/*
  redis.zscore('cart_' + id, productid, function(err, obj) {
      if (obj > 0)
      {
        score = obj;
      }
    });
*/
  //  console.log('ZINCRBY cart_' + id + ' 1 ' + productid);

      redis.ZINCRBY('cart_' + id, 1, parseInt(productid), function(err, obj) {
        console.log('obj = ' + obj);
        if (obj)
        {
          flag = 1;
        }
      });

  return flag;
}

router.post('/removeFromCart', function(req, res) {
  let id = req.body.id;
  let item = req.body.item.productid;

  redis.zrem('cart_' + id, item, function(err, obj) {
    if (obj)
    {
      res.json(obj);
    } else {
      res.json({
        error: err,
        status: obj
      })
    }
  });

});

router.post('/clearCart', function(req, res) {
  let id = req.body.id;
  redis.del('cart_' + id, function(err, obj) {
    if (obj)
    {
      res.json(obj);
    } else {
      res.json({
        error: err,
        status: obj
      });
    }
  });
});

router.post('/products', function(req, res){

  let department = req.body.department;
  let query = "SELECT * FROM Products WHERE department = '" + department + "'";

  mysql.query(query, function(error, results, fields) {

      if (error)
      {
        res.status(400).json(error);
      } else {
        res.status(200).json(results);
        //res.status(200).send(JSON.stringify(results));
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
    var product = {
        productid: list[i],
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
