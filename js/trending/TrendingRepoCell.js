import React, { Component } from 'react';
import {  
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    View,
    Alert, 
} from 'react-native';
import HTMLView from 'react-native-htmlview'

import GlobalStyles from '../../res/style/GlobalStyles';
/**
 * fullName
 * url
 * description
 * language
 * meta
 * contributors
 * contributorsUrl
 * starCount
 * forkCount
 * : require('../../res/images/ic_unstar_transparent.png')
 */
export default class TrendingRepoCell extends Component {
    constructor(){
        this.state = {
            favoriteIcon:  require('../../res/images/ic_star.png'),
        }
    }
    onPressFavorite(){

    }
    
  render() {
    let item = this.props.rowData;
    let description = `<p>${item.description}</p>`;
    let TouchableElement = TouchableHighlight;
    
    return (
    <TouchableElement 
        onPress={this.props.onSelect}
        onShowUnderlay={this.props.onHighlight}
        underlayColor='transparent'
        onHideUnderlay={this.props.onUnhighlight}
    >
      <View style={GlobalStyles.cell_container}>
        <View>
            <Text style={styles.title}>{item.fullName}</Text>
        </View>
        <HTMLView 
            value={describe}
            onLinkPress={(url)=>{
                this.props.navigation.navigate('webViewPage',{url:url});
            }}
            stylesheet={{
                p: styles.description,
                a: styles.description,
            }}
        />
        <Text style={[styles.description,{fontSize: 14}]}>{item.meta}</Text>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.author}>Built by </Text>
                {
                    item.contributors.map((result,index,arr)=>{
                        return <Image 
                            key={index}
                            source={{uri:result}}
                            style={{width:22,height:22,margin:2}}
                        />
                    })
                }
            </View>
            <TouchableHighlight
                style={{padding: 6,}} 
                onPress={()=>this.onPressFavorite()} 
                underlayColor='transparent'
             >
                <Image source={this.state.favoriteIcon} style={{width:22, height:22}}/>
            </TouchableHighlight>
        </View>
      </View>
    </TouchableElement>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121'
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
    author: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    }
});