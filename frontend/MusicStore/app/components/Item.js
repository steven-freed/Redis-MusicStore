import React from 'react';
import {
  Text, View, StyleSheet, FlatList, Animated
} from 'react-native';

export default class Item extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View>
      <Text>{this.props.name}</Text>
      <Text>{this.props.price}</Text>
      <Text>{this.props.brand}</Text>
      <Text>{this.props.description}</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  image: {

  },
  title: {

  },
  info: {

  }
});
