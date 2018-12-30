import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  Alert,
  Animated,
  View,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import Items from './Items';
import CategoryBanner from './CategoryBanner';

class Category extends React.Component {
 constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(1);

    this.pressIn = this.pressIn.bind(this);
    this.pressOut = this.pressOut.bind(this);
    this.seeCategory = this.seeCategory.bind(this);
  }

  /*
   *  Navigates to Category once clicked on
   */
  seeCategory(e)
  {
    this.props.navigation.navigate('Items', {header: this.props.header});
  }

  // animates button on let go
  pressOut()
  {
    Animated.spring(this.animatedValue, {
      toValue: 1.0,
      friction: 3,
      tension: 25
    }).start();
  }

  // animates button on click
  pressIn()
  {
    Animated.spring(this.animatedValue, {
      toValue: 0.75,
    }).start();
  }

  render() {

    // animation for Category Touchable
    const animatedStyle = {
      transform: [{ scale: this.animatedValue }],
      width: '100%',
      height: 200,
      alignItems: 'center',
      justifyContent: 'center'
    }

    return (
          <TouchableWithoutFeedback onPress={this.seeCategory} onPressIn={this.pressIn} onPressOut={this.pressOut} >
            <Animated.View style={animatedStyle}>
            <ImageBackground source={this.props.imageSource}
                       style={styles.button} >
              <CategoryBanner
                header={this.props.header}/>
            </ImageBackground>
            </Animated.View>
          </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

// Allows Category component all navigation info
export default withNavigation(Category);
