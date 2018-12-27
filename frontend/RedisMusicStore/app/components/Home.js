import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
} from 'react-native';

import Category from './Category';
import CompanyLogo from './Company';
import Container from './Container';

export default class Home extends React.Component {

  static navigationOptions = ({ navigation }) => {
     return {
       headerTitle: 'The Music Shoppe',
       headerRight: (
         <Button
           title="🛒"
         />
       ),
     };
   };

  render() {
    return (
        <ScrollView style={styles.container} >
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
