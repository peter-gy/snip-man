/**
 * Possible UI routes
 */
export enum Path {
  Home = '/',
  Dashboard = '/dashboard',
  Reports = '/reports',
}

/**
 * Model for a UI route
 */
export interface Route {
  label: string;
  path: Path;
}
