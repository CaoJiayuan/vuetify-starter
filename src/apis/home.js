import { routes } from '@/router'
// import axios from 'axios'
const Home = {
  getNavigation () {
    return getNavFromRoutes()
    //return axios.get('/navigation').then(response => response.data)
  },
}


export function getNavFromRoutes () {
  let result = []
  routes.forEach(route => {
    route.path !== '*' && route?.meta?.guest !== true && result.push({
      path: route.path,
      name: route.path,
      display_name: route?.meta.title,
      icon: route?.meta.icon,
    })
  })

  return Promise.resolve(result)
}

export default Home
