import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
} from 'react-native';
import {
  withNavigation
} from 'react-navigation';

import Category from './Category';
import CompanyLogo from './Company';
import Container from './Container';

class Home extends React.Component {
  constructor(props) {
    super(props);

  }

  // button for navigation to user cart page
  static navigationOptions = ({ navigation }) => {
     return {
       headerTitle: 'The Music Shoppe',
       headerRight: (
         <Button
           title="🛒"
           onPress={() => navigation.navigate('Cart')}
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

// Allows Home component all navigation info
export default withNavigation(Home);
