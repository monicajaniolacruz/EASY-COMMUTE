import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@/views/system/DashboardView.vue";
import FareView from "@/views/system/FareView.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import VerifyEmail from "../views/VerifyEmail.vue";
import Profile from "../views/Profile.vue";
import MapView from "../views/MapView.vue";
import RidesView from "@/views/system/RidesView.vue";
import RouteListMulticab from "../views/RouteListMulticab.vue";
import RouteListTricycle from "../views/RouteListTricycle.vue";
import RouteDetailView from "../views/RouteDetailView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import ContactView from "@/views/system/ContactView.vue";

import { supabase } from '../supabase';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "default",
      component: LoginView,
    },
    {
      path: "/dashboard",
      name: "dasboard",
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: "/fare",
      name: "fare",
      component: FareView,
      meta: { requiresAuth: true },
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
      meta: { requiresAuth: true },
    },
    {
      path: "/sign-in",
      name: "sign in",
      component: SignIn,
    },
    {
      path: "/sign-up",
      name: "sign up",
      component: SignUp,
    },
    {
      path: "/verify-email",
      name: "verify-email",
      component: VerifyEmail,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: { requiresAuth: true },
    },
    {
      path: "/map",
      name: "map",
      component: MapView,
      meta: { requiresAuth: true },
    },
    {
      path: "/rides",
      name: "rides",
      component: RidesView,
      meta: { requiresAuth: true },
    },
    {
      path: "/route-list/multicab",
      name: "route-list-multicab",
      component: RouteListMulticab,
      meta: { requiresAuth: true },
    },
    {
      path: "/route-list/tricycle",
      name: "route-list-tricycle",
      component: RouteListTricycle,
      meta: { requiresAuth: true },
    },
    {
      path: "/route-detail/:routeId/:vehicleType",
      name: "route-detail",
      component: RouteDetailView,
      props: true,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
    // Get the current authenticated user from Supabase
    const { data: { user }, error } = await supabase.auth.getUser();
  
    // If the route requires authentication and the user is not logged in
    if (to.meta.requiresAuth && !user) {
      return next({ name: 'sign in' }); // Redirect to sign-in page if not authenticated
    }
  
    // If the user is already logged in and tries to access the /sign-in or /sign-up page
    if ((to.name === 'sign in' || to.name === 'sign up') && user) {
      return next({ name: 'dashboard' }); // Redirect to home if already logged in
    }
  
    // Check if the URL fragment contains an access_token
    const urlHash = window.location.hash;
    const urlParams = new URLSearchParams(urlHash.slice(1)); // Strip '#' and parse parameters
  
    if (urlParams.has('access_token')) {
      const token = urlParams.get('access_token');
      
      // Store the token (if needed) or use it to authenticate the user
      await supabase.auth.setSession(token);
  
      // Redirect to the sign-in page after the token is handled
      return next({ name: 'sign-in' });
    }
  
    next(); // Allow navigation if no conditions are met
  });
  
  


export default router;
