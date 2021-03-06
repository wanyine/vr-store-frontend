import axios from 'axios'
import auth from './auth'
import config from './config'

const clientWithToken = axios.create(config)

clientWithToken.interceptors.request.use(config => {
  config.headers['Authorization'] = `Bearer ${auth.getToken()}`
  return config
})

clientWithToken.interceptors.response.use(response => {
  return response
}, err => {
  if(err.response){
      err.message = err.response.data
    // if(err.response.status == 401){
    // } else if(err.response.status == 400){
    //   err.message = 'login failed, please check name and password'
    // }
  }
  return Promise.reject(err)
})

export default clientWithToken;
