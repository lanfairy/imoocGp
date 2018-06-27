//https://api.github.com/search/repositories?q=ios&sort=stars
const API_URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'

const API_URL_TRENDING = 'https://github.com/trending/';

export default class URLConfig {
  static getSearchURL(q){
    return `${API_URL}${q}${QUERY_STR}`;
  }

  static getTrendingUrl(timeSpan, category) {//objective-c?since=daily
      return API_URL_TRENDING + category + '?' + timeSpan;
  }
}
