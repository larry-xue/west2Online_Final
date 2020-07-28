import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    redirect: 'index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../components/index.vue'),
      },
      {
        path: '/social',
        name: 'social',
        component: () => import('../views/Social.vue'),
        children: [
          {
            path: '/social/likeTrend',
            name: 'likeTrend',
            component: () => import('../components/social/likeTrend.vue'),
          },
          {
            path: '/social/hotTrend',
            name: 'hotTrend',
            component: () => import('../components/social/hotTrend.vue'),
          },
          {
            path: '/social/friendTrend',
            name: 'friendTrend',
            component: () => import('../components/social/friendTrend.vue'),
          },
        ],
      },
      {
        path: '/user/:id',
        name: 'user',
        component: () => import('../views/User.vue'),
        children: [
          {
            path: '/user/:id/gameshow',
            name: 'gameShow',
            component: () => import('../components/user/gameShow.vue'),
          },
          {
            path: '/user/:id/activities',
            name: 'activities',
            component: () => import('../components/user/activities.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue'),
    children: [
      {
        path: '/account/login',
        name: 'login',
        component: () => import('../components/account/login.vue'),
      },
      {
        path: '/account/register',
        name: 'register',
        component: () => import('../components/account/register.vue'),
      },
      {
        path: '/account/recover',
        name: 'recover',
        component: () => import('../components/account/recover.vue'),
      },
      {
        path: '/account/settings',
        name: 'settings',
        component: () => import('../components/account/settings.vue'),
        children: [
          {
            path: '/account/settings/profile',
            name: 'profile',
            component: () => import('../components/user/profile.vue'),
          },
          {
            path: '/account/settings/password',
            name: 'password',
            component: () => import('../components/user/password.vue'),
          },
        ],
      },
    ],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
