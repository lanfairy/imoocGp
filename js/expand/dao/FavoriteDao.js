'use strict'
import {
  AsyncStorage,
} from 'react-native';


const FAVORITE_KEY_REFIX = 'favorite_';
export default class FavoriteDao {
  constructor(flag){
    this.flag = flag;
    this.favoriteKey = `${FAVORITE_KEY_REFIX}${flag}`;
  }
/**
 *收藏项目
 *
 * @param {*} key 项目id 或 名称
 * @param {*} value 项目
 * @param {*} callback
 * @memberof FavoriteDao
 */
saveFavoriteItem(key, value, callback){
    AsyncStorage.setItem(key, value, (error)=>{
        if(!error){
            this.updateFavoriteKeys(key, true);
        }
        if(callback){
            callback(!error ? '收藏项目成功' : '收藏项目失败');
        }    
    })
  }

  removeFavoriteItem(key,callback){
      AsyncStorage.removeItem(key,(error)=>{
          if(!error){
              this.updateFavoriteKeys(key, false);
          }
          if(callback){
              callback(!error ? '取消收藏成功' : '取消收藏失败');
          }
      })
  }

  getFavoriteKeys(){
      return new Promise((resolve, reject)=>{
          AsyncStorage.getItem(this.favoriteKey, (error, result) =>{
              if(!error){
                  try{
                      resolve(JSON.parse(result));
                  }catch(e){
                    reject(e);
                  }
              }else{
                  reject(error);
              }
          })
      })
  }
/**
 *
 *
 * @param {*} key
 * @param {*} isAdd 添加或删除 项目
 * @memberof FavoriteDao
 */
updateFavoriteKeys(key,isAdd){
    AsyncStorage.getItem(this.favoriteKey, (error, result)=>{
        console.log(`[favorityKey]  ${this.favoriteKey}`);
        if(!error){
            let favoriteKeys = [];
            if(result){
                favoriteKeys = JSON.parse(result);
            }
            let index = favoriteKeys.indexOf(key);
            if(isAdd){
                if(index === -1)
                    favoriteKeys.push(key);
            }else{
                if(index !== -1)favoriteKeys.splice(index,1);
            }
            
            AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys));
        }
    })
  }
}
