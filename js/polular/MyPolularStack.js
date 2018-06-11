import React from 'react';
import { Text, Image, StyleSheet} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MyPolularScreen from './MyPolularScreen';
import {ThemeFlags} from '../config/ThemeConfig';

const MyPolularStack = createStackNavigator({
  PolularHome: {
    screen: MyPolularScreen,
  },

});
MyPolularStack.navigationOptions = {
  tabBarTestIDProps: {
    testID: 'TEST_ID_POLULAR',
    accessibilityLabel: 'TEST_ID_POLULAR_ACLBL',
  },
  tabBarLabel: ({ tintColor, focused }) => {

    let color = focused ? ThemeFlags.Polular : tintColor;
    return <Text style={[{color: color, fontSize: 11,marginBottom: 3}]}>最热</Text>;
  },
  tabBarIcon: ({ tintColor, focused }) => {
    let color = focused ? ThemeFlags.Polular : tintColor;
    return <Image source={require('../../res/images/ic_polular.png')} style={[{ tintColor: color},styles.tabbarIcon]}/>
    },
};
const styles = StyleSheet.create({
  tabbarIcon: {
    width:25,
    height:25
  },
});
export default MyPolularStack;
