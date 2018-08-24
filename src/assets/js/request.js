import {toast} from '../../components/toast'
import {renderException} from '../../components/exception'
import {isProduction} from './utils'
import {Signer} from 'nerio-js-utils'

axios.interceptors.request.use(new Signer(process.env.API_KEY, 16).interceptor())

axios.interceptors.request.use(config => {
  if (config.local !== true) {
    config.baseURL = process.env.API_BASE_URL;
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
  }
  return Promise.reject(error);
});
