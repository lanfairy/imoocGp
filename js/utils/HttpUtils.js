export default class HttpUtils {
  static get(url){
    return new Promise((resolve,reject)=>{
      fetch(url)
        .then(response=>response.json())
        .then(result=>{
          resolve(result);
        })
        .catch(error=>{
          reject(error);
        })
    })
  }

  static post(url,body){
    return new Promise((resolve,reject)=>{
      fetch(url, {
        method: 'POST',
        header: {
          'Accept': 'appliction/json',
          'Content-Type': 'appliction/json',
        },
        body: JSON.stringify(body)
      })
      .then(response=>response.json())
      .then(result=>{
        resolve(result);
      })
      .catch(error=>{
        reject(error);
      })
    })
  }
}
