import { createRouter, createWebHashHistory } from 'vue-router'
import Article from '../views/Article.vue'
import ArticleForm from "../views/admin/ArticleForm.vue";
import HomeView from "../views/HomeView.vue";
import Login from "../views/admin/Login.vue";
import AdminView from "../views/admin/AdminView.vue";
import About from "../views/About.vue";
import ContactView from "../views/ContactView.vue";
import AllArticles from "../views/AllArticles.vue";


const routes = [
  { path: '/',
    name: 'home',
    component: HomeView
  },
  { path: '/about',
    name: 'about',
    component: About
  },
  { path: '/contact',
    name: 'contact',
    component: ContactView
  },
  { path: '/blog',
    name: 'blog',
    component: AllArticles
  },
    //DETAIL
  { path: '/article/:slug',
    name:'detail-article',
    component: Article
  },
    //ADMIN
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
