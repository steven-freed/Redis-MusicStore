import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import Header from './Header';
import Category from './Category';
import CompanyLogo from './Company';
import Container from './Container';
import Instruments from './Instruments';

export default class Home extends React.Component {
  render() {
    return (
        <ScrollView style={styles.container} >
          <Header />
          <CompanyLogo />
          <Container />
        </ScrollView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
  });
