import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
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



export default MainTabs;
