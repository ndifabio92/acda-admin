import { ComponentType, lazy, LazyExoticComponent } from 'react';
interface Route {
  path: string;
  name?: string;
  icon?: string;
  element: LazyExoticComponent<ComponentType<object>> | ComponentType<object>;
}

const Home = lazy(() => import('../pages/home'));
const Login = lazy(() => import('../pages/login'));
const Events = lazy(() => import('../pages/events'));
const RegisteredUser = lazy(() => import('../pages/registeredUsers'));
const Membership = lazy(() => import('../pages/membership'));
const Subscription = lazy(() => import('../pages/subscription'));

export const routes: { public: Route[]; protected: Route[] } = {
  public: [{ path: '/login', element: Login }],
  protected: [
    { path: '/', name: 'Dashboard', element: Home },
    { path: '/events', name: 'Eventos', element: Events },
    { path: '/events/:id', element: RegisteredUser },
    { path: '/membership', name: 'Cuota Mensual', element: Membership },
    { path: '/subscription', name: 'Suscripción Mensual', element: Subscription },
  ],
};
