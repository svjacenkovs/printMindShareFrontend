import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '../components/NotFound.vue';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import SignUp from '../views/Signup.vue';
import Materials from '../views/Materials.vue';
import Paletizer from '../views/Paletizer.vue';
import MaterialDetails from '../components/materials/MaterialDetails.vue';
import NewMaterial from '../components/materials/NewMaterial.vue';
import MaterialItemCreateUpdate from '../components/materials/MaterialItemCreateUpdate.vue';

import store from '../store/index';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    {
      name: 'home',
      path: '/home',
      component: Home,
    },
    {
      name: 'login',
      path: '/login',
      component: Login,
    },
    {
      name: 'signup',
      path: '/signup',
      component: SignUp,
    },
    {
      name: 'paletizer',
      path: '/paletizer',
      component: Paletizer,
      meta: { requiresAuth: true },
    },
    {
      name: 'materials',
      path: '/materials',
      component: Materials,
      children: [
        {
          path: ':materialId', // /materials/materialId
          component: MaterialDetails,
          props: true,
        },
        {
          name: 'newMaterialItem',
          path: ':materialId/new', // /materials/materialId/new
          component: MaterialItemCreateUpdate,
          props: true,
        },
        {
          name: 'editMaterialItem',
          path: ':materialItemId/edit', // /materials/materialItemId/new
          component: MaterialItemCreateUpdate,
          props: true,
        },
      ],
      meta: { requiresAuth: true },
    },
    {
      name: 'newMaterial',
      path: '/materials/new',
      component: NewMaterial,
      meta: { requiresAuth: true },
    },
    {
      name: 'notFound',
      path: '/:catchAll(.*)',
      component: NotFound,
    },
  ],
});

router.beforeEach(async function(to, _, next) {
  // Ja ir nepieciešama autentifikācija && lietotājs nav autorizējies
  if (to.meta.requiresAuth && !store.getters['authModule/isAuthenticated']) {
    const authorised = await store.dispatch('authModule/tryLogin');
    if (authorised) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
