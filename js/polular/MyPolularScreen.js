import React from 'react';
import { View, Image, StyleSheet, Text, TextInput, Alert, ListView} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'

import {MyNavScreen,CommonNavScreen} from '../commonComponents/MyNavScreen';
import HttpUtils from '../utils/HttpUtils';
import URLConfig from '../config/URLConfig';
import {ThemeFlags} from '../config/ThemeConfig';
import GlobalStyles from '../../res/style/GlobalStyles';
import RepositoryCell from '../commonComponents/RepositoryCell';

class PopularTab extends React.Component{
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      result: '',
      dataSource: ds.cloneWithRows([]),
    }
  }
  render(){
    let content = <ListView
          ref='listView'
          renderRow={this._renderRow}
                renderFooter={()=> {
                    return <View style={{height: 50}}/>
                }}
                enableEmptySections={true}
                dataSource={this.state.dataSource}
      />;
    return (
      <View style={[GlobalStyles.listView_container,{paddingTop: 0}]}>
        {content}
      </View>
    );
  }
  // <View style={[GlobalStyles.cell_container]}>
  //   <Text style={GlobalStyles.cell_text_full_name}>{rowData.full_name}</Text>
  //   <Text style={GlobalStyles.cell_text_description}>{rowData.description}</Text>
  //   <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: 200}}>
  //     <Text>Icon</Text>
  //     <Image source={{uri:rowData.owner.avatar_url}} style={GlobalStyles.cell_img_owner_avatar} />
  //   </View>
  // </View>
  _renderRow = (rowData)=>{
    return(
      <RepositoryCell rowData={rowData}/>
    )
  };
  componentDidMount(){
    this._onLoad();
  }
  _onLoad = ()=>{
    let URL = URLConfig.getSearchURL(this.props.TabText);

    HttpUtils.get(URL)
      .then((result)=>{
        // Alert.alert('result');
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(result.items),
        })
      })
      .catch((error=>{
        this.setState({
          result: JSON.stringify(error),
        })
      }))
  };
}

export default class MyPolularScreen extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      languages: [
                  {name:'iOS'},
                  {name:'Android'},
                  {name:'Web'},
                  {name:'Python'}
                ],
    }
  }



  render(){
    const { navigation } = this.props;

    var content = this.state.languages.length > 0 ?
            <ScrollableTabView
                tabBarUnderlineColor='#fff'
                tabBarInactiveTextColor='mintcream'
                tabBarActiveTextColor='white'
                tabBarBackgroundColor={ThemeFlags.Polular}
                ref="scrollableTabView"
                initialPage={0}
                page={0}
                tabBarUnderlineStyle = {{height:2, backgroundColor:'mintcream'}}
                renderTabBar={() => <ScrollableTabBar style={{height: 40,borderWidth:0,elevation:2}} tabStyle={{height: 39}}
                                                      underlineHeight={2}/>}
            >
                {this.state.languages.map((result, i, arr)=> {
                    let language = result;
                    return language &&
                        <PopularTab key={i} TabText={language.name}
                                    tabLabel={language.name}/>;
                })}
            </ScrollableTabView>
            : null;
    return (
      <CommonNavScreen navigation={navigation}>
        <View style={[GlobalStyles.listView_container,{paddingTop: 0}]}>
          {content}
        </View>
      </CommonNavScreen>
    )
  }
}
MyPolularScreen.navigationOptions = props => {
  const { navigation } = props;
  const { state, setParams } = navigation;
  const { params } = state;
  return {
    headerTitle: `最热`,
    headerTintColor: '#FFF',
    headerRight: (
      null
    ),
    headerStyle: {
      backgroundColor: ThemeFlags.Polular,
    }
  };
};
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    backgroundColor:'skyblue',
    flex:1,
  },
  tips: {
    fontSize: 40,
  },
  textInput: {
    height: 20,
    backgroundColor: '#FFF',
  }
});
