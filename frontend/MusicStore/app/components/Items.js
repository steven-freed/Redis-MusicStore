import React from 'react';
import {
  Text, View, StyleSheet, FlatList, Animated
} from 'react-native';

export default class Items extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount()
  {
    fetch('POST')
  }

  getProducts()

  render() {
    return (
      <View>
              <Instrument
                  info={}
                   />
      </View>
    );
  }

}
