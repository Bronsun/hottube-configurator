export const ROUTES = {
  HOME: "/",
  CONFIGURATOR: "/configurator",
  HOTTUB_DETAIL: "/configurator/:hottubId",
  ADMIN: "/admin",
  JSON_VIEWER: "/json-viewer",
  NOT_FOUND: "*",
};

export const NavigationMenuItems = [
  { title: "Modele wanien", path: ROUTES.CONFIGURATOR },
  { title: "JSON Viewer", path: ROUTES.JSON_VIEWER },
  { title: "Admin Panel", path: ROUTES.ADMIN }
];
