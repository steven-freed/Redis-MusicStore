import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Animated,
  Alert,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {
   withNavigation
} from 'react-navigation';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(1);

    this.addToCart = this.addToCart.bind(this);
    this.pressIn = this.pressIn.bind(this);
    this.pressOut = this.pressOut.bind(this);
  }

  /*
   *  Adds item to cart (Redis) once clicked on
   */
  addToCart(e)
  {
    let newItem = {
      productid: this.props.productId,
      name: this.props.name,
      price: this.props.price,
      quantity: 1
    };

    fetch('http:127.0.0.1:13013/store/addToCart', {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: 'myUserId',
        item: newItem
      }),
    }).then(res => res.json()
  ).then(data => {
    console.log(data.status);
    if (data.status === 0)
    {
      throw {message: "item may already be in cart"}
    } else {
        Alert.alert('🛒', this.props.name + ' added to cart');
    }
  }).catch((error) => {
     Alert.alert("Something went wrong...", error.message);
  });

  }

  // animates button on let go
  pressOut()
  {
    Animated.spring(this.animatedValue, {
      toValue: 1.0,
      friction: 10,
      tension: 25
    }).start();
  }

  // animates button on click
  pressIn()
  {
    Animated.spring(this.animatedValue, {
      toValue: 0.8,
    }).start();
  }

  render() {

    const animatedStyle = {
      transform: [{ scale: this.animatedValue }],
    }

    return (
      <TouchableWithoutFeedback onPress={this.addToCart} onPressIn={this.pressIn} onPressOut={this.pressOut} >
        <Animated.View style={animatedStyle}>

        <View style={styles.container} >

        <View style={styles.imageView}>
          <Image style={styles.image} source={require('../img/music_note.png')} />
          </View>

          <View style={styles.infoView}>
          <Text style={styles.header}>{this.props.name}</Text>
          <Text style={styles.brand}>{this.props.brand}</Text>
          <Text style={styles.price}>${this.props.price.toFixed(2)}</Text>
          <Text style={styles.description}>{this.props.description}</Text>
          </View>
          </View>

        <View style={styles.seperator} >
        </View>
          </Animated.View>
        </TouchableWithoutFeedback>
    );
  }

}

const styles = StyleSheet.create({
  // Views
  seperator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE",
    padding: 5
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  infoView: {
    width: '75%',
    height: '100%'
  },
  imageView: {
    width: '25%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
  },
  image: {
    height: '50%',
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
  },
  // Item Text
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 2,
    paddingBottom: 2,
  },
  brand: {
    fontSize: 18,
    color: '#d3d3d3',
    paddingBottom: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 2,
  },
  description: {
    fontSize: 16,
    color: '#a9a9a9',
    paddingBottom: 2,
  }
});

// Allows Item component all navigation info
export default withNavigation(Item);
