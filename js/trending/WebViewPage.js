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
    constructor(){
        let url = this.props.navigation.getParam('url');
        this.state={
            url: url,
            canGoBack: false,
        }
    }
    componentWillMount(){
        this.props.navigation.setParams({
            onBack: this._onBack,
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
            source={{uri:url}}
            onNavigationStateChange={this.onNavigationStateChange}
        />
      </View>
    );
  }
}

WebViewPage.navigationOptions = props=>{
    const { navigation } = props;
    let title = navigation.getParam('url');
    return {
        headerTitle: title,
        headerTintColor: '#FFF',
        headerLeft: (ViewUtils.getLeftBtn(navigation.getParam('onBack')))
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});

