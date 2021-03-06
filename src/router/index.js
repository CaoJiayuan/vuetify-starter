import Users from '../pages/users/Index.vue'
import Dashboard from '../pages/dashboard/Index.vue'
import Login from '../pages/auth/Login.vue'



const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      title : 'Dashboard',
      icon: 'home'
    }
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    meta: {
      title : 'Users (table & panel example)',
      icon: 'account_box'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title : 'Login',
      guest: true
    }
  },
  {
    path: '*',
    redirect : '/'
  }
]

const router = new VueRouter({
  routes: routes
})

export {
  routes,
  router
}
