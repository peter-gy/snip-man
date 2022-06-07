/**
 * Possible UI routes
 */
export enum Path {
  Home = '/',
  App = '/app',
}

/**
 * Model for a UI route
 */
export interface Route {
  label: string;
  path: Path;
}
