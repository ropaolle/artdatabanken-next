/**
 * Keys from object as const
 */
const routes = {
  home: "/",
  admin: "/admin",
  user: "/user",
} as const;

type RouteKeys = keyof typeof routes;

type Route = (typeof routes)[RouteKeys];

const goToRoute = (route: Route) => {};

goToRoute(routes.admin);
