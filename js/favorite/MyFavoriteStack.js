import React from 'react';
import { Text, Image, StyleSheet} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MyFavoriteScreen from './MyFavoriteScreen';
import { ThemeFlags } from '../config/ThemeConfig';

const MyFavoriteStack = createStackNavigator({
  FavoriteHome: {
    screen: MyFavoriteScreen,
  },

});
MyFavoriteStack.navigationOptions = {

    tabBarLabel: ({ tintColor, focused }) => {
      let color = focused ? ThemeFlags.Purple : tintColor;
      return <Text style={[{color: color, fontSize: 11,marginBottom: 3}]}>收藏</Text>;
    },
    tabBarIcon: ({ tintColor, focused }) => {
      let color = focused ? ThemeFlags.Purple : tintColor;
    return  <Image source={require('../../res/images/ic_favorite.png')} style={[{ tintColor: color},styles.tabbarIcon]}/>
    },

};

const styles = StyleSheet.create({
  tabbarIcon: {
    width:25,
    height:25
  },
});
export default MyFavoriteStack;
