const redis = require('redis');
const express = require('express'); // Backend config

// Create Express router to route to index.js express app
const router = express.Router();

// redis client
var PORT = '6379';
var HOST = '127.0.0.1'
let client = redis.createClient(PORT, HOST, {no_ready_check: true});

client.on('connect', function() {
  console.log('Successful connection to Redis on port ' + PORT);
})

router.post('/cart', function(req, res) {
  let id = req.body.id;

  client.zrange('cart_' + id, 0, -1, 'WITHSCORES', function(err, obj) {
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

		client.zadd(...args, function(err, obj) {
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

router.post('/removeFromCart', function(req, res) {
  let id = req.body.id;
  let item = req.body.item.productid;

  client.zrem('cart_' + id, item, function(err, obj) {
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
  client.del('cart_' + id, function(err, obj) {
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

router.get('/products', function(req, res){

  client.lrange('products', 0, -1, function(err, obj) {
    if (obj)
    {
      res.json(parseson(obj));
    } else {
      res.json({
        error: err,
        status: obj
      });
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
