import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router'
import App from '../App'
import Home from '../pages/Home'
import VendorListing from '../pages/VendorListing'
import VendorDetails from '../pages/VendorDetails'
import Contact from '../pages/Contact'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

const rootRoute = createRootRoute({ component: App })

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const vendorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/vendors',
  component: VendorListing,
})

const vendorDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/vendors/$id',
  component: VendorDetails,
})

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
})

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: Signup,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  vendorsRoute,
  vendorDetailRoute,
  contactRoute,
  dashboardRoute,
  loginRoute,
  signupRoute,
])

export const router = createRouter({ routeTree })
