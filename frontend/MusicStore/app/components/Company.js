import React from 'react';
import {
  StyleSheet,
  Image,
} from 'react-native';

export default class Company extends React.Component {
  render() {
    return (
      <Image source={require('../img/companyLogo.gif')}
        style={styles.logo} />
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
