import React from 'react';
import { Text, Image, StyleSheet} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MyMineScreen from './MyMineScreen';
import { ThemeFlags } from '../config/ThemeConfig';

const MyMineStack = createStackNavigator({
  MineHome: {
    screen: MyMineScreen,
  },

});
MyMineStack.navigationOptions = {

    tabBarLabel: ({ tintColor, focused }) => {
      let color = focused ? ThemeFlags.Indigo : tintColor;
      return <Text style={[{color: color, fontSize: 11,marginBottom: 3}]}>我的</Text>;
    },
    tabBarIcon: ({ tintColor, focused }) => {
      let color = focused ? ThemeFlags.Indigo : tintColor;
    return  <Image source={require('../../res/images/ic_my.png')} style={[{ tintColor: color},styles.tabbarIcon]}/>
    },

};

const styles = StyleSheet.create({
  tabbarIcon: {
    width:25,
    height:25
  },
});
export default MyMineStack;
