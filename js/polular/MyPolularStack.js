import React from 'react';
import { Text, Image, StyleSheet} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MyPolularScreen from './MyPolularScreen';
import {ThemeFlags} from '../config/ThemeConfig';
import RepositoryDetailPage from './RepositoryDetail';

const MyPolularStack = createStackNavigator({
  PolularHome: {
    screen: MyPolularScreen,
  },
  RepositoryDetail: {
    screen: RepositoryDetailPage,
  }

});
MyPolularStack.navigationOptions = ({navigation})=>{
  let tabBarVisible = true;
  if(navigation.state.index > 0)
    tabBarVisible = false;

    return {
      tabBarVisible: tabBarVisible,
      tabBarLabel: ({ tintColor, focused }) => {
        let color = focused ? ThemeFlags.Polular : tintColor;
        return <Text style={[{color: color, fontSize: 11,marginBottom: 3}]}>最热</Text>;
      },
    
      tabBarIcon: ({ tintColor, focused }) => {
        let color = focused ? ThemeFlags.Polular : tintColor;
        return <Image source={require('../../res/images/ic_polular.png')} style={[{ tintColor: color},styles.tabbarIcon]}/>
        },
    };
  
};

const styles = StyleSheet.create({
  tabbarIcon: {
    width:25,
    height:25,
  },
});
export default MyPolularStack;
