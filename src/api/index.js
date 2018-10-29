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
    window.location.href = '/'
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

    const auth = {
      headers: { Authorization: window.localStorage.getItem('token') }
    }

    var url = config.serverURI + uri

    if (method === 'post') {
      return HTTP.post(url, data)
    } else if (method === 'get') {
      return HTTP.get(url, auth)
    }

  }
}
