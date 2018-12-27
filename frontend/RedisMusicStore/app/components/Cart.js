import React from 'react';
import {
  Text, View, StyleSheet, FlatList, Animated
} from 'react-native';

import Item from './Item';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };

  }

  componentDidMount()
  {
    var userId = 'myUserId';

    fetch('http:192.168.1.3:13013/store/cart', {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': userId
      }),
    }).then(res => res.json()
  ).then(data => {
    this.setState({ items: data });
  }).catch((error) => {
     alert(error.message);
  });

  }

  _renderItem = ({item}) => (
    <Item
      name={item.productid}
      brand={item.quantity}
      productId={item.productId}
      />
    );

    _keyExtractor = (item, index) => item.productid;

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Cart 🛒'
    };
  };

  render() {
    return (
    <View>
      <FlatList
        data={this.state.items}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        />
    </View>
  );
  }
}
