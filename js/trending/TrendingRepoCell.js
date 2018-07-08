import React, { Component } from 'react';
import {  
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
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
    constructor(props){
        super(props);
        this.state = {
            item: this.props.projectModel.item ? this.props.projectModel.item : this.props.projectModel,
            isFavorite: this.props.projectModel.isFavorite,
            favoriteIcon: this.props.projectModel.isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png'),
        }
    }
    onPressFavorite = ()=>{
        this.favoriteAction(this.props.projectModel.item, !this.state.isFavorite);
    }
    setFavoriteState = (isFavorite)=>{
        this.setState({
          isFavorite: isFavorite,
          favoriteIcon: isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png'),
        })
      };
    favoriteAction = (item, isFavorite)=>{
        this.setFavoriteState(isFavorite);
        this.props.onFavorite(item, isFavorite);
    };
    onSelectRepository=(projectModel)=>{
        const {navigation} = this.props;
        navigation.navigate('trendingDetailPage',{
          projectModel: projectModel,
          onFavorite: (item, isFavorite)=>{
            this.favoriteAction(item, isFavorite);
          },
    
        });
      };
  render() {
    let item = this.state.item;
    let description = `<p>${item.description}</p>`;
    let TouchableElement = TouchableOpacity;
    let favoriteButton=
            <TouchableOpacity
                style={{padding:6}}
                onPress={this.onPressFavorite} 
                underlayColor='transparent'>
                <Image
                    ref='favoriteIcon'
                    style={[{width: 22, height: 22, },{tintColor: '#2196F3'}]}
                    source={this.state.favoriteIcon}/>
            </TouchableOpacity>;
    return (
    <TouchableElement 
        onPress={()=>this.onSelectRepository(this.props.projectModel)}
        // onShowUnderlay={this.props.onHighlight}
        // onHideUnderlay={this.props.onUnhighlight}
        activeOpacity={0.2}
        underlayColor='transparent'
    >
      <View style={GlobalStyles.cell_container}>
        <View>
            <Text style={styles.title}>{item.fullName}</Text>
        </View>
        <HTMLView 
            value={description}
            onLinkPress={(url)=>{
                this.props.navigation.navigate('webViewPage',{url:url});
            }}
            stylesheet={{
                p: styles.description,
                a: [styles.description,styles.description_a],
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
            {favoriteButton}
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
    description_a: {
        color: '#03A9F4',
    },
    author: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    }
});