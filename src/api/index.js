import axios from 'axios'
import config from '../config'

const HTTP = axios.create({
  baseURL: config.serverURI,
  headers: {
    'Content-Type': 'application/json',
  }
})

HTTP.interceptors.response.use((response) => { // intercept the global error
  return response
}, function (error) {
  if (error.response.status === 401) { // if the error is 401 and hasent already been retried
    console.log('you managed ti get here');
    this.$router.push('/');
  }
  // Do something with response error
  return Promise.reject(error)
})

export default {
  request(method, uri, data = null) {
    if (!method) {
      console.error('API function call requires method argument')
      return
    }

    if (!uri) {
      console.error('API function call requires uri argument')
      return
    }

    var auth = {};
    if(window.localStorage.getItem('token')){
      auth = {
        headers: { Authorization: window.localStorage.getItem('token') }
      }
    }

    var url = config.serverURI + uri

    if (method === 'post') {
      return HTTP.post(url, data, auth)
    } else if (method === 'get') {
      return HTTP.get(url, auth)
    } else if (method === 'patch'){
      return HTTP.patch(url, data, auth)
    } else if (method === 'delete'){
      return HTTP.delete(url, auth)
    }

  }
}
