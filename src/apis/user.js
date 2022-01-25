import {TOKEN_CACHE_NAME,TOKEN_EXPIRE_NAME} from '@/constant';
import {functions} from 'nerio-js-utils';
const axios = window.axios
let {Storage} = functions
function Token() {

}
Token.prototype.access_token = null;
Token.prototype.expires_in = 0;
Token.prototype.type = null;
let storage = new Storage();

const UserApi = {
    getUser() {
        return axios.get('/user').then(response => response.data)
    },
    login(credentials){
        return axios.post('/login', credentials, {
            guest : true
        }).then(response =>{
            return this.afterLogin(response.data)
        })
    },
    logout(){
        return axios.post('/logout').then(response => {
            this.clearToken();
            return response.data;
        })
    },
    clearToken(){
        storage.remove(TOKEN_EXPIRE_NAME);
        storage.remove(TOKEN_CACHE_NAME);
    },
    afterLogin(token){
        storage.put(TOKEN_CACHE_NAME, token.access_token);
        if ( token.expires_in > 0 ) {
            storage.put(TOKEN_EXPIRE_NAME, new Date().getTime() + token.expires_in * 1000 - 5000);
        }
        return token;
    },
    refresh(){
        let token = storage.get(TOKEN_CACHE_NAME);
        return axios.post('/refresh', {}, {
            guest : true,
            headers : {
                Authorization : 'Bearer ' + token
            },
            toast : false
        }).then(response =>{
            return this.afterLogin(response.data)
        })
    },
    readyToRefresh(ttl, cb){
        setTimeout(() => {
            typeof cb === 'function' || (cb = token => token);
            this.refresh().then(cb);
        }, ttl)
    }
};
export default UserApi;
