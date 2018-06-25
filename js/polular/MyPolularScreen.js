import React from 'react';
import {
  View,
  RefreshControl,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  ListView,
  DeviceEventEmitter,
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Toast, { DURATION } from 'react-native-easy-toast';
import LanguageDao, { FLAG_LANGUAGE } from '../expand/dao/LanguageDao';

import {MyNavScreen,CommonNavScreen} from '../commonComponents/MyNavScreen';
import HttpUtils from '../utils/HttpUtils';
import URLConfig from '../config/URLConfig';
import {ThemeFlags} from '../config/ThemeConfig';
import GlobalStyles from '../../res/style/GlobalStyles';
import RepositoryCell from '../commonComponents/RepositoryCell';
import DataRepository from '../expand/dao/DataRepository';

var dataRepository = new DataRepository();
class PopularTab extends React.Component{
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // this.dataRepository = new DataRepository();
    this.state = {
      result: '',
      isLoading: false,
      isLoadingFail: false,
      dataSource: ds.cloneWithRows([]),
    }
  }

  render(){
    let toast = <Toast
            ref="toast"
            style={{backgroundColor:ThemeFlags.Polular}}
            position='bottom'
            positionValue={250}
            fadeInDuration={750}
            fadeOutDuration={1200}
            opacity={0.95}
            textStyle={{color:'#fff'}}
        />;
    let content = <ListView
          ref='listView'
          renderRow={this._renderRow}
                renderFooter={()=> {
                    return <View style={{height: 50}}/>
                }}
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                refreshControl={
                  <RefreshControl
                      // title='拼命加载中...'
                      refreshing={this.state.isLoading}
                      onRefresh={this._onRefresh}
                      tintColor={ThemeFlags.Polular}
                      colors={[ThemeFlags.Polular,ThemeFlags.Polular,ThemeFlags.Polular]}
                    />
                }
      />;
    return (
      <View style={[GlobalStyles.listView_container,{paddingTop: 0}]}>
        {content}
        {toast}
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
  componentDidMount(){
    this._loadData(true);
  }
  componentWillUnmount(){

  }
  _renderRow = (rowData)=>{
    return(
      <RepositoryCell rowData={rowData}/>
    )
  };
  _onRefresh = ()=>{
    this._loadData(true);
  };
  _loadData = (isRefresh)=>{
    this.setState({
      isLoading: true,
    })
    let URL = URLConfig.getSearchURL(this.props.tabLabel);


    dataRepository.fetchRepository(URL)
                  .then((result)=>{
                    this.refs.toast.show(`获取到 ${result.items.length} 条数据`);
                    let items = result&&result.items ? result.items : result ? result : [];
                    this.setState({
                      dataSource: this.state.dataSource.cloneWithRows(items),
                      isLoading: false,
                      isLoadingFail: false,
                    });
                    if(result&&result.date&&!dataRepository.checkDate(result.date)){
                      return dataRepository.fetchNetRepository(URL);
                    }
                    // return dataRepository.fetchNetRepository(URL);
                  })
                  .then((result)=>{
                    console.log(`----- ${result}`);
                    if(!result || !result.items || result.items.length==0)return;
                      this.refs.toast.show(`网络数据获取到 ${result.tems.length} 条数据`);
                      // Alert.alert(`获取到 ${result.items.length} 条数据`);
                      this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(result.items),
                        isLoading: false,
                        isLoadingFail: false,
                      })
                  })
                  .catch(error=>{
                    this.refs.toast.show(error);
                    this.setState({
                      result: JSON.stringify(error),
                      isLoading: false,
                      isLoadingFail: true,
                    })
                  });
  };

}

export default class MyPolularScreen extends React.Component{
  constructor(props){
    super(props);
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.state = {
      languages: [],
    }
  }

  componentDidMount(){
    this.loadLanguages();
  }
  loadLanguages(){
    this.languageDao.fetch()
        .then((languages)=>{
          this.setState({
            languages: languages,
          })
        }).catch((error)=>{

        });
  }
  render(){
    const { navigation } = this.props;

    let content = this.state.languages.length > 0 ?
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
                    return language && language.checked ?
                        <PopularTab key={i} tabLabel={language.name}/> : null;
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
