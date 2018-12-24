import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import Category from './Category';

export default class Container extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.largeCol}>
              <Category imageSource={require('../img/instruments.png')}
                        header="Instruments" navigation={this.props.navigation} />

          </View>
          <View style={styles.smallCol}>
              <Category imageSource={require('../img/piano.jpg')}
                        header="Sheet Music" />
          </View>
          <View style={styles.content}>
              <Category imageSource={require('../img/equipment.jpg')}
                        header="Equipment" />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    marginBottom: 10,
  },
  smallCol: {
    flex: 1,
    padding: 5,
  },
  largeCol: {
    flex: 2,
    padding: 5,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  }
});
