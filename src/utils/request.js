import {toast} from '@/components/toast'
import {renderException} from '@/components/exception'
import {isProduction} from './utils'
import {BrowserStorage} from 'nerio-js-utils'
import {TOKEN_CACHE_NAME, API_BASE_URL} from '@/constant'
import router from '@/router'
const axios = window.axios
const bs = new BrowserStorage()

axios.interceptors.request.use(config => {
  if (config.local !== true) {
    config.url.indexOf('http') !== 1 && (config.baseURL = API_BASE_URL);
  }

  let token = bs.get(TOKEN_CACHE_NAME)
  if (token) {
    config.headers.Authorization = "Bearer " + token
  }

  return config;
});

axios.interceptors.response.use(response => response, error => {
  if (error.response) {
    let data = error.response.data

    if (!isProduction() && error.response.status >= 500) {
      renderException(error.response.data);
    } else {
      if (data && typeof data === 'object') {
        toast(data.message, 'error')
      }
    }

    if (error.response.status === 401) {
      router.push('/login')
    }
  }
  return Promise.reject(error);
});
