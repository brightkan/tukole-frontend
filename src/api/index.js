import axios from 'axios'
import config from '../config'

const HTTP = axios.create({
  baseURL: config.serverURI,
  headers: {
    'Content-Type': 'application/json',
  }
})

// todo: figure this put
function createAxiosResponseInterceptor(){
  const interceptor = HTTP.interceptors.response.use(
    response => response,
    error => {
      // Reject promise if usual error
      if (errorResponse.status !== 401) {
        console.log('here keman')
        return Promise.reject(error);
      }

      /* 
       * When response code is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response
       */
      HTTP.interceptors.response.eject(interceptor);
      console.log('katuula')
      return HTTP.post('/api/token/refresh', {
        "refresh": window.localStorage.getItem('refreshToken')
      }).then(response => {
        localStorage.setItem('token', "Bearer " + tokenRefreshResponse.data.access);
        error.response.config.headers['Authorization'] = 'Bearer ' + response.data.access_token;
        return HTTP(error.response.config);
      }).catch(error => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('refreshToken');
        window.localStorage.removeItem('remember_me');
        this.router.push('/login');
        return Promise.reject(error);
      }).finally(createAxiosResponseInterceptor);
    }
  );
}

export default {
  request(method, uri, data = null) {
    createAxiosResponseInterceptor();
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

    if (window.localStorage.getItem('token')) {
      if (method === 'post') {
        return HTTP.post(url, data, auth)
      } else if (method === 'get') {
        return HTTP.get(url, auth)
      } else if (method === 'patch') {
        return HTTP.patch(url, data, auth)
      } else if (method === 'delete') {
        return HTTP.delete(url, auth)
      }
    } else {
      if (method === 'post') {
        return HTTP.post(url, data)
      } else if (method === 'get') {
        return HTTP.get(url)
      } else if (method === 'patch') {
        return HTTP.patch(url, data)
      } else if (method === 'delete') {
        return HTTP.delete(url)
      }
    }
  }
}
