import client from './client'
import config from './config'

module.exports = {
  login(name, pass) {
    return new Promise((resolve, reject) => {
      if (localStorage.token) {
        resolve()  
      } else {
      client.post('/tokens', {name:name, password:pass}, config)
        .then(res=>{
          localStorage.token = res.data.token
          resolve()
        })
        .catch(err => {
          reject(err)
        })
      }
    })
    
  },

  getToken() {
    return localStorage.token
  },

  logout() {
    delete localStorage.token
  },

  loggedIn() {
    return !!localStorage.token
  },
}

