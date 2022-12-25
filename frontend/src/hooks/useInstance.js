import axios from "axios"

const useInstance = () => {

  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  })

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')
      if (token) 
        config.headers["Authorization"] = `Token ${token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  
  // instance.interceptors.response.use(
  //   (res) => {
  //     return res
  //   },
  //   async (err) => {
  //     const originalConfig = err.config
  
  //     if(refreshToken === null)
  //       return Promise.reject(err)
      
  //     if (err.response.status === 401 && !originalConfig._retry) {
  //       originalConfig._retry = true
  //       try {
  //         refresh(instance)
  //         return instance(originalConfig)
  //       } 
  //       catch (_error) {
  //         return Promise.reject(_error)
  //       }
  //     }
  
  //     return Promise.reject(err)
  //   }
  // )
  
  return instance
}

export default useInstance