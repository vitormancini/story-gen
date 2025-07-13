import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layouts/default.tsx", [
    index("routes/home.tsx"),
    route("/breweries", "routes/breweries.tsx", [
      route(":id", "routes/brewery.tsx"),
    ]),
  ]),

  route("/login", "routes/login.tsx"),
] satisfies RouteConfig;
