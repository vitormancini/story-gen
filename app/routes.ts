import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/breweries", "routes/breweries.tsx", [
    route(":id", "routes/brewery.tsx"),
  ]),
  route("/login", "routes/login.tsx"),
] satisfies RouteConfig;
