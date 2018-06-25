'use strict';

import {
    AsyncStorage,
} from 'react-native';

export default class DataRepository{
  fetchRepository(url){
    return new Promise((resolve,reject)=>{
      //获取本地数据
      this.fetchLocalRepository(url)
          .then(result=>{
            if(result){
              resolve(result);
            }else {
              this.fetchNetRepository(url)
                  .then(result=>{
                    resolve(result);
                  })
                  .catch(error=>{
                    reject(error);
                  })
            }

          })
          .catch(error=>{
            this.fetchNetRepository(url)
                .then(result=>{
                  resolve(result);
                })
                .catch(error=>{
                  reject(error);
                })
          })
    });
  }
  fetchLocalRepository(url) {
          return new Promise((resolve, reject)=> {
              AsyncStorage.getItem(url, (error, result)=> {

                  if (!error) {
                      try {
                          resolve(JSON.parse(result));
                      } catch (e) {
                          reject(e);
                          // console.error(e);
                      }
                  } else {
                      reject(error);
                      // console.error(error);
                  }
              });
          });
      }

  fetchNetRepository(url){
    return new Promise((resolve,reject)=>{
      fetch(url)
          .then(response=>response.json())
          .then(result=>{
            if(!result){
              reject(new Error('responseData is null'));
            return;
          }
            resolve(result);
            this.saveRepository(url,result.items);
          })
          .catch(error=>{
            reject(error);
          })
    });
    // return new Promise((resolve,reject)=>{
    //   fetch(url)
    //     .then(response=>response.json())
    //     .then(result=>{
    //       resolve(result);
    //       this.saveRepository(url,result.items);
    //     })
    //     .catch(error=>{
    //       reject(error);
    //     })
    // })
  }

  saveRepository(url, items, callback) {
        if (!items || !url)return;
        let wrapData={items:items,date:new Date().getTime()};
        AsyncStorage.setItem(url, JSON.stringify(wrapData), callback);
        console.log('保存获取到的网络数据');
    }

  removeRepository(url) {
        AsyncStorage.removeItem(url, (error, result)=> {
            if(error)console.log(error);
        });
    }

  checkDate(longTime) {
      let currentDate = new Date();
      let targetDate = new Date();
      targetDate.setTime(longTime);
      if (currentDate.getMonth() !== targetDate.getMonth())return false;
      if (currentDate.getDate() !== targetDate.getDate())return false;
      if (currentDate.getHours() - targetDate.getHours() > 4)return false;
      if (currentDate.getMinutes() - targetDate.getMinutes() > 1)return false;
      return true;
  }

}
