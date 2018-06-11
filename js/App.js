import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import MyPolularStack from './polular/MyPolularStack';
import MyTrendingStack from './trending/MyTrendingStack';
import MyFavoriteStack from './favorite/MyFavoriteStack';
import MyMineStack from './mine/MyMineStack';



const MainTabs = createBottomTabNavigator(
  {
    Polular: {
      screen: MyPolularStack,
      path: '',
    },
    Trending: {
      screen: MyTrendingStack,
      path: 'trending',
    },
    Favorite: {
      screen: MyFavoriteStack,
      path: 'favorite',
    },
    Mine: {
      screen: MyMineStack,
      path: 'mine',
    },
  },
  {
    tabBarOptions: {
      // activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',
    },
  }
);



export default MainTabs;
