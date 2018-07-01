import React from 'react';
import { 
  View,
  Text, 
  Image,
  ScrollView, 
  Platform,
  TouchableOpacity,
  DeviceEventEmitter,
  StyleSheet
} from 'react-native';
// import { createStackNavigator } from 'react-navigation';
import Popover, { createPopoverStackNavigator, Rect, Size } from 'react-native-popover-view'; 
import MyTrendingScreen from './MyTrendingScreen';
import { ThemeFlags } from '../config/ThemeConfig';
import WebViewPage from './WebViewPage';
import TimeSpan from '../mode/TimeSpan';

var timeSpanTextArray = [new TimeSpan('今 天', 'since=daily'),
new TimeSpan('本 周', 'since=weekly'), new TimeSpan('本 月', 'since=monthly')];
class TitleView extends React.Component {
  render() {
    return (
      <View contentContainerStyle={{padding: 10,}}>
        {
          timeSpanTextArray.map((val, i, arr)=>{
            return (
              <Text key={i}
                style={{fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginTop: 8, color: '#fff',alignSelf: 'center'}} 
                onPress={()=>{
                DeviceEventEmitter.emit('listenerTrendPopver',val.searchText);
                this.props.navigation.pop();
                }}
                >{arr[i].showText}
                </Text>
            )
          })
        }
        
      </View>
    )
  }
}
// const MyTrendingStack = createStackNavigator({
//   TrendingHome: {
//     screen: MyTrendingScreenWarp,
//   },
//   webViewPage: {
//     screen: WebViewPage,
//   }

// });
const MyTrendingScreenWrap = createPopoverStackNavigator({
  MyTrendingScreen: {
    screen: MyTrendingScreen,
    navigationOptions: ({navigation}) => ({
      title: <TouchableOpacity 
        ref={ref => createPopoverStackNavigator.registerRefForView(ref, 'TitleView')} 
        onPress={() => navigation.navigate('TitleView')} 
        style={{width: 160, alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 18, color: '#fff', fontWeight: '400'}}>趋势</Text>
            <Image  style={{width:12, height: 12, marginLeft: 5}} source={require('../../res/images/ic_spinner_triangle.png')} />
          </View>
        </TouchableOpacity>, 
      headerTintColor: '#FFF',
      headerRight: (
        null
      ),
      headerStyle: {
        backgroundColor: ThemeFlags.Pink,
      }
    })
  },
  TitleView: {
    screen: TitleView,
    // navigationOptions: {title: 'TitleView'},
    popoverOptions: {
      contentContainerStyle: {
        minWidth: 100,
        backgroundColor: '#343434',
        opacity: 0.8,
        arrowStyle: {},
      }
    }
  },
  webViewPage: {
    screen: WebViewPage,
  }
});

class MyTrendingStack extends React.Component {
  state = {
    width: 0,
    height: 0
  }
  render() {
    return (
      <View
        style={{position: 'absolute', left: 0, right: 0, top: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight, bottom: 0, backgroundColor: 'green'}}
        onLayout={evt => this.setState(evt.nativeEvent.layout)}
      > 
        <MyTrendingScreenWrap  screenProps={{showInPopover: true}}/>
      </View>
    );
  }
}
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
