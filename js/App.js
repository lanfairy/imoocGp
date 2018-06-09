import type {
  NavigationScreenProp,
  NavigationEventSubscription,
} from 'react-navigation';

import React from 'react';
import { Platform, ScrollView, StatusBar, View, Image, StyleSheet} from 'react-native';
import { SafeAreaView, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from './commonComponents/ButtonWithMargin';
import SampleText from './commonComponents/SampleText';

const MyNavScreen = ({ navigation, banner }) => (
  <SafeAreaView forceInset={{ horizontal: 'always', top: 'always' }}>
    <SampleText>{banner}</SampleText>
    <Button
      onPress={() => navigation.navigate('Polular')}
      title="Go to Polular tab"
    />
    <Button
      onPress={() => navigation.navigate('Mine')}
      title="Go to Mine tab"
    />
    <Button onPress={() => navigation.goBack(null)} title="Go back" />
    <StatusBar barStyle="default" />
  </SafeAreaView>
);

const MyPolularScreen = ({ navigation }) => (
  <MyNavScreen banner="polular Tab" navigation={navigation} />
);

MyPolularScreen.navigationOptions = {
  tabBarTestIDProps: {
    testID: 'TEST_ID_POLULAR',
    accessibilityLabel: 'TEST_ID_POLULAR_ACLBL',
  },
  tabBarLabel: '最热',
  tabBarIcon: ({ tintColor, focused }) => (
    <Image source={require('../res/images/ic_polular.png')} style={[{ tintColor: tintColor},styles.tabbarIcon]}/>
  ),
};

type MyTrendingScreenProps = {
  navigation: NavigationScreenProp<*>,
};
class MyTrendingScreen extends React.Component<MyTrendingScreenProps> {
  _s0: NavigationEventSubscription;
  _s1: NavigationEventSubscription;
  _s2: NavigationEventSubscription;
  _s3: NavigationEventSubscription;

  static navigationOptions = {
    tabBarLabel: '趋势',
    tabBarIcon: ({ tintColor, focused }) => (
      <Image source={require('../res/images/ic_trending.png')} style={[{ tintColor: tintColor},styles.tabbarIcon]}/>
    ),
  };
  componentDidMount() {
    this._s0 = this.props.navigation.addListener('willFocus', this._onEvent);
    this._s1 = this.props.navigation.addListener('didFocus', this._onEvent);
    this._s2 = this.props.navigation.addListener('willBlur', this._onEvent);
    this._s3 = this.props.navigation.addListener('didBlur', this._onEvent);
  }
  componentWillUnmount() {
    this._s0.remove();
    this._s1.remove();
    this._s2.remove();
    this._s3.remove();
  }
  _onEvent = a => {
    console.log('EVENT ON Trending TAB', a.type, a);
  };
  render() {
    const { navigation } = this.props;
    return <MyNavScreen banner="Trending Tab" navigation={navigation} />;
  }
}

type MyFavoriteScreenProps = {
  navigation: NavigationScreenProp<*>,
};
class MyFavoriteScreen extends React.Component<MyFavoriteScreenProps> {
  _s0: NavigationEventSubscription;
  _s1: NavigationEventSubscription;
  _s2: NavigationEventSubscription;
  _s3: NavigationEventSubscription;

  static navigationOptions = {
    tabBarLabel: '收藏',
    tabBarIcon: ({ tintColor, focused }) => (
      <Image source={require('../res/images/ic_favorite.png')} style={[{ tintColor: tintColor},styles.tabbarIcon]}/>
    ),
  };
  componentDidMount() {
    this._s0 = this.props.navigation.addListener('willFocus', this._onEvent);
    this._s1 = this.props.navigation.addListener('didFocus', this._onEvent);
    this._s2 = this.props.navigation.addListener('willBlur', this._onEvent);
    this._s3 = this.props.navigation.addListener('didBlur', this._onEvent);
  }
  componentWillUnmount() {
    this._s0.remove();
    this._s1.remove();
    this._s2.remove();
    this._s3.remove();
  }
  _onEvent = a => {
    console.log('EVENT ON Favorite TAB', a.type, a);
  };
  render() {
    const { navigation } = this.props;
    return <MyNavScreen banner="Favorite Tab" navigation={navigation} />;
  }
}

const MyMineScreen = ({ navigation }) => (
  <MyNavScreen banner="Mine Tab" navigation={navigation} />
);

MyMineScreen.navigationOptions = {
  tabBarLabel: '我的',
  tabBarIcon: ({ tintColor, focused }) => (
    <Image source={require('../res/images/ic_my.png')} style={[{ tintColor: tintColor},styles.tabbarIcon]}/>
  ),
};

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
