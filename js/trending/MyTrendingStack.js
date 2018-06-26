import React from 'react';
import { Text, Image, StyleSheet} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MyTrendingScreen from './MyTrendingScreen';
import { ThemeFlags } from '../config/ThemeConfig';

const MyTrendingStack = createStackNavigator({
  TrendingHome: {
    screen: MyTrendingScreen,
  },

});
MyTrendingStack.navigationOptions = ({navigation})=> {
  let tabBarVisible = true;
  if(navigation.state.index > 0)
    tabBarVisible = false;

    return {
      tabBarLabel: ({ tintColor, focused }) => {
        let color = focused ? ThemeFlags.Pink : tintColor;
        return <Text style={[{color: color, fontSize: 11,marginBottom: 3}]}>趋势</Text>;
      },
      tabBarIcon: ({ tintColor, focused }) => {
        let color = focused ? ThemeFlags.Pink : tintColor;
      return  <Image source={require('../../res/images/ic_trending.png')} style={[{ tintColor: color},styles.tabbarIcon]}/>
      },
    };
};

const styles = StyleSheet.create({
  tabbarIcon: {
    width:25,
    height:25
  },
});
export default MyTrendingStack;
