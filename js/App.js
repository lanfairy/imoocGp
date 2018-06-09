import type {
  NavigationScreenProp,
  NavigationEventSubscription,
} from 'react-navigation';

import React from 'react';
import { Platform, ScrollView, StatusBar, View, Image, StyleSheet} from 'react-native';
import { SafeAreaView, createBottomTabNavigator } from 'react-navigation';
import { Button } from './commonComponents/ButtonWithMargin';
import SampleText from './commonComponents/SampleText';
import MyPolularScreen from './polular/MyPolularScreen';
import MyTrendingScreen from './trending/MyTrendingScreen';
import MyFavoriteScreen from './favorite/MyFavoriteScreen';
import MyMineScreen from './mine/MyMineScreen';



const MainTabs = createBottomTabNavigator(
  {
    Polular: {
      screen: MyPolularScreen,
      path: '',
    },
    Trending: {
      screen: MyTrendingScreen,
      path: 'trending',
    },
    Favorite: {
      screen: MyFavoriteScreen,
      path: 'favorite',
    },
    Mine: {
      screen: MyMineScreen,
      path: 'mine',
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',
    },
  }
);
const styles = StyleSheet.create({
  tabbarIcon: {
    width:25,
    height:25
  },
});


export default MainTabs;
