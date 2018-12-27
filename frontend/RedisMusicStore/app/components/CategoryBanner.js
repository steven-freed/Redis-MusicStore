import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class CategoryBanner extends React.Component {
  render() {

    let header = this.props.header ?
    <Text style={styles.overlayCategory}>{this.props.header}</Text>
    : null;

    return (
      <View>
          { header }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlayCategory: {
    elevation: 1,
    alignSelf: 'center',
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    fontWeight: 'bold'
  }
});
