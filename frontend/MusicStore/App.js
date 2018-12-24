import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import Header from './app/components/Header';
import Category from './app/components/Category';
import CompanyLogo from './app/components/Company';
import Container from './app/components/Container';
import Instruments from './app/components/Instruments';
import Home from './app/components/Home';

export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}

export const AppStack = createStackNavigator({
    Home: Home,
    Category: Category,
    Instruments: Instruments,
    },
    {
      initialRouteName: 'Home'
    }
  );

const AppContainer = createAppContainer(AppStack);
