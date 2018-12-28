import React from 'react';
import {
  Text, View, StyleSheet, FlatList, Animated
} from 'react-native';

import Item from './Item';

export default class Items extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };

  }

  componentDidMount()
  {

    var department = this.props.navigation.getParam('header').toLowerCase();

    fetch('http:192.168.1.3:13013/store/products', {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'department': department
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
      department={item.department}
      productId={item.productId}
      name={item.name}
      price={item.price}
      brand={item.brand}
      description={item.description}
      />
    );

    _keyExtractor = (item, index) => item.productId.toString();

    static navigationOptions = ({ navigation }) => {
       return {
         headerTitle: navigation.getParam('header')
       };
     };

  render() {
    return (
      <View>
      <FlatList
          style={styles.list}
          data={this.state.items}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  list: {
    width: '100%',
    height: '100%'
  }
});
