import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
            layout: 'DashboardLayout'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginOld'),
        meta: {
            isLogout: true
        }
    },
    {
        path: '/users',
        name: 'UserList',
        component: () => import('../components/UserList'),
        meta: {
            layout: 'DashboardLayout'
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

// let roleRedirect;
// if (localStorage.getItem('user')) {
//   switch (JSON.parse(localStorage.getItem('user')).user_rol_id) {
//     case 1:
//       roleRedirect = '/admin';
//       break;
//     case 2:
//       roleRedirect = '/user';
//       break;
//     case 4:
//       roleRedirect = '/reception'
//   }
// }

router.beforeEach(async (to, from, next) => {

//   if (to.meta.isAuthenticated) {

//     if (localStorage.getItem('token')) {


//       if (to.meta.roleAdmin) {
//         if (JSON.parse(localStorage.getItem('user')).user_rol_id === 1) {
//           next()
//         } else {
//           next(roleRedirect);
//         }
//       } else {
//         next();
//       }


//       if (to.meta.roleUser) {
//         if (JSON.parse(localStorage.getItem('user')).user_rol_id === 2) {
//           next()
//         } else {
//           next(roleRedirect);
//         }
//       } else {
//         next();
//       }

//       if (to.meta.roleReception) {
//         if (JSON.parse(localStorage.getItem('user')).user_rol_id === 4) {
//           next()
//         } else {
//           next(roleRedirect);
//         }
//       } else {
//         next();
//       }


//     } else {
//       localStorage.removeItem('user');
//       next('/login');
//     }


//   } else {
//     next()
//   }


  if (to.meta.isLogout) {
    if (store.getters["auth/getToken"]) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }

})

export default router