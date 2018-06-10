import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import MyPolularStack from './polular/MyPolularStack';
import MyTrendingScreen from './trending/MyTrendingScreen';
import MyFavoriteScreen from './favorite/MyFavoriteScreen';
import MyMineScreen from './mine/MyMineScreen';



const MainTabs = createBottomTabNavigator(
  {
    Polular: {
      screen: MyPolularStack,
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
