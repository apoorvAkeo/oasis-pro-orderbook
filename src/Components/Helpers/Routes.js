import { lazy } from 'react';
import Paths from './Paths';
export const Routes = [
  {
    path: Paths.login,
    label: 'Login',
    requireLogin: true,
    ComponentIn: lazy(() => import('../Components/Login'))
  }
];
