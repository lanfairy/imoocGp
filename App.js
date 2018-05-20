/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict'
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const CHANNEL = 'channel';
const FIND = 'find';
const MINE = 'mine';
  
type Props = {};
export default class App extends Component<Props> {
  // let homePage = {<View style={styles.channelPage}></View>};
  // let findPage = <View style={styles.channelPage}></View>;
  // let minePage = <View style={styles.channelPage}></View>;

  constructor(props){
    super(props);
    this.state = {
      selectedTab: CHANNEL
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === CHANNEL}
            title="频道"
            renderIcon={() => <Image source={require('./res/images/channel.png')} />}
            renderSelectedIcon={() => <Image source={require('./res/images/channel_selected.png')} />}
            badgeText="1"
            onPress={() => this.setState({ selectedTab: CHANNEL })}>
            <View style={styles.channelPage}></View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === FIND}
            title="发现"
            renderIcon={() => <Image source={require('./res/images/find.png')} />}
            renderSelectedIcon={() => <Image source={require('./res/images/find_selected.png')} />}
            // renderBadge={() => <CustomBadgeView />}
            onPress={() => this.setState({ selectedTab: FIND })}>
            <View style={styles.findPage}></View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === MINE}
            title="我的"
            renderIcon={() => <Image source={require('./res/images/mine.png')} />}
            renderSelectedIcon={() => <Image source={require('./res/images/mine_selected.png')} />}
            // renderBadge={() => <CustomBadgeView />}
            onPress={() => this.setState({ selectedTab: MINE })}>
            <View style={styles.minePage}></View>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  channelPage: {
    flex: 1,
    backgroundColor: 'red'
  },
  findPage: {
    flex: 1,
    backgroundColor: 'green'
  },
  minePage: {
    flex: 1,
    backgroundColor: 'orange'
  }
});
