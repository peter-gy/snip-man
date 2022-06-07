import { Path, Route } from '../types/route.type';

/**
 * Retrieves the route info based on the supplied `Path`
 * @param path the path to retrieve the route info for
 * @returns the `Route` corresponding to the supplied `Path`
 */
export function getRoute(path: Path): Route {
  switch (path) {
    case Path.Home:
      return {
        label: 'Home',
        path: Path.Home,
      };
    case Path.Dashboard:
      return {
        label: 'Dashboard',
        path: Path.Dashboard,
      };
    case Path.Reports:
      return {
        label: 'Reports',
        path: Path.Reports,
      };
    default:
      throw Error('Unknown path: ' + path);
  }
}
