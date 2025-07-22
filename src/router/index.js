import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Article from '../views/Article.vue'
import ArticleForm from "../views/admin/ArticleForm.vue";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import AdminView from "../views/admin/AdminView.vue";


const routes = [
  { path: '/',
    name: 'home',
    component: HomeView
  },
  { path: '/article/:slug',
    name:'detail-article',
    component: Article
  },
  { path: '/login',
    name: 'login',
    component: Login
  },
  { path: '/admin',
    name: 'admin-home',
    component: AdminView, meta: { requiresAuth: true }
  },
  { path: '/admin/articles/new',
    name: 'new-article',
    component: ArticleForm, meta: {requiresAuth: true}
  },
  { path: '/admin/articles/edit/:slug',
    name:'edit-article',
    component: ArticleForm, meta: {requiresAuth: true}
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})
