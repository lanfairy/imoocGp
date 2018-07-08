import React, { Component } from 'react';
import {  
    View, 
    Text, 
    WebView,
    StyleSheet
} from 'react-native';
import ViewUtils from '../utils/ViewUtils';

const WEBVIEW_REF = 'webview';
export default class WebViewPage extends Component {
    constructor(props){
        super(props);
        let projectModel = this.props.navigation.getParam('projectModel');
        this.state={
            url: projectModel.item.url,
            canGoBack: false,
            isFavorite: projectModel.isFavorite,
            item: projectModel.item,
        }
    }
    componentWillMount(){
        this.props.navigation.setParams({
            onBack: this._onBack,
            onFavoriteProject: this._onFavoriteProject,
          });
    }
    onNavigationStateChange = (navState)=>{
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url
            
        });
    };
    _onBack = ()=>{
        if(this.state.canGoBack){
            this.refs[WEBVIEW_REF].goBack();
        }else{
            this.props.navigation.pop();
        }
    };
    setFavoriteState = (isFavorite)=>{
        this.setState({
          isFavorite: isFavorite,
        })
        let favoriteIcon = (isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png'));
        this.props.navigation.setParams({
          favoriteIcon : favoriteIcon,
        });
      };
      _onFavoriteProject = ()=>{
        this.setFavoriteState(!this.state.isFavorite);
        if(this.props.navigation.getParam("onFavorite", null))
        this.props.navigation.getParam("onFavorite")(this.state.item, !this.state.isFavorite);
      };
  render() {
      
    return (
      <View style={styles.container}>
        <WebView
            ref={WEBVIEW_REF}
            startInLoadingState={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scalesPageToFit={true}
            decelerationRate='normal'
            automaticallyAdjustContentInsets={false}
            source={{uri:this.state.url}}
            onNavigationStateChange={this.onNavigationStateChange}
        />
      </View>
    );
  }
}

WebViewPage.navigationOptions = props=>{
    const { navigation } = props;
    let projectModel = navigation.getParam('projectModel');
    let title = projectModel.item.fullName;
    let favoriteIcon = (projectModel.isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png'));
    favoriteIcon = navigation.getParam('favoriteIcon', favoriteIcon);
    return {
        headerTitle: title,
        headerTintColor: '#FFF',
        headerLeft: (ViewUtils.getLeftBtn(navigation.getParam('onBack'))),
        headerRight: (
            ViewUtils.getRightBtn(
              navigation.getParam('onFavoriteProject'),
              favoriteIcon,
              null,
              {marginRight: 0,}
            )
          ),
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});

