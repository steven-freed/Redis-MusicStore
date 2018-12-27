import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
  withNavigation
} from 'react-navigation';

import Cart from './app/components/Cart';
import Category from './app/components/Category';
import CompanyLogo from './app/components/Company';
import Container from './app/components/Container';
import Items from './app/components/Items';
import Home from './app/components/Home';

export default class App extends React.Component {

  render() {
    return (
      <AppContainer />
    );
  }
}

export const AppStack = createStackNavigator({
    Home: Home,
    Category: Category,
    Items: Items,
    Cart: Cart
    },
    {
      initialRouteName: 'Home'
    }
  );

const AppContainer = createAppContainer(AppStack);
