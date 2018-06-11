//https://api.github.com/search/repositories?q=ios&sort=stars
const API_URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'

export default class URLConfig {
  static getSearchURL(q){
    return `${API_URL}${q}${QUERY_STR}`;
  }
}
