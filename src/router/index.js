import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NewsPage from '../views/NewsPage.vue'
import AboutPage from '../views/AboutPage.vue'
import SolutionPage from '../views/solutions/SolutionPage.vue'
import SolDetails from '../views/solutions/SolDetails.vue'
import ServiceDetails from '../views/service/ServiceDetails.vue'
import ContatPage from '../views/ContatPage.vue'

import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'

import adminHome from '../views/admin/adminHome.vue'
import adminNews from '../views/admin/adminNews.vue'
import adminAbout from '../views/admin/adminAbout.vue'
import adminSolutions from '../views/admin/adminSolutions.vue'
import adminCustomer from '../views/admin/adminCustomer.vue'
import adminServices from '../views/admin/adminServices.vue'
import adminContact from '../views/admin/adminContact.vue'

// firebase imports
import { auth } from '@/firebase/config'

const requireAuth = (to, from, next) => {
  let user = auth.currentUser
  if (!user) {
    next({ name: 'login' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage
  },
  {
    path: '/news',
    name: 'news',
    component: NewsPage
  },
  {
    path: '/solutions',
    name: 'solutions',
    component: SolutionPage
  },
  {
    path: '/soldetails/:id',
    name: 'soldetails',
    component: SolDetails,
    props:true
  },
  {
    path: '/servicedetails/:id',
    name: 'servicedetails',
    component: ServiceDetails,
    props:true
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContatPage
  },
  {
    path: '/auth',
    name: 'login',
    component: Login
  },
  {
    path: '/auth/signup',
    name: 'signup',
    component: Signup,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/home',
    name: 'adminhome',
    component: adminHome,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/news',
    name: 'adminnews',
    component: adminNews,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/about',
    name: 'adminabout',
    component: adminAbout,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/solutions',
    name: 'adminsolutions',
    component: adminSolutions,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/customer',
    name: 'admincustomer',
    component: adminCustomer,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/services',
    name: 'adminservices',
    component: adminServices,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/contact',
    name: 'admincontact',
    component: adminContact,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

