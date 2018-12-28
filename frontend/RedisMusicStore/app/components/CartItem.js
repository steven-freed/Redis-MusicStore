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

export default class CartItem extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
        <View>
        <View style={styles.container} >

        <View style={styles.imageView}>
          <Image style={styles.image} source={require('../img/music_note.png')} />
          </View>

          <View style={styles.infoView}>
          <Text style={styles.header}>{this.props.name}</Text>
          <Text style={styles.price}>${this.props.price.toFixed(2)}</Text>
          <Text style={styles.quantity}>{this.props.quantity}</Text>
          </View>

        </View>
        <View style={styles.seperator} />
        </View>
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
  quantity: {
    fontSize: 16,
    color: '#a9a9a9',
    paddingBottom: 2,
  }
});
