import Users from '../pages/users/Index.vue'

const routes = [
  {
    path: '/',
    name: 'users',
    component: Users,
    meta: {
      title : 'Users (table & panel example)',
      icon: 'account_box'
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
