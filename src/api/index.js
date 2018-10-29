import axios from 'axios'
import config from '../config'

const HTTP = axios.create({
  baseURL: config.serverURI,
  headers: {
    'Content-Type': 'application/json',
  }
})

export default {
  request (method, uri, data = null) {
    if (!method) {
      console.error('API function call requires method argument')
      return
    }

    if (!uri) {
      console.error('API function call requires uri argument')
      return
    }

    const auth = {
      headers: {Authorization: window.localStorage.getItem('token')} 
    }

    var url = config.serverURI + uri
    
    if(method === 'post'){
      return HTTP.post(url, data)
    }else if(method === 'get'){
      return HTTP.get(url, auth)
    }
    
  }
}
