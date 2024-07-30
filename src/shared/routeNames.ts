/**
 * be aware:
 * when you add a new route to the router,
 * sometimes you might skip the "page" parameter.
 * In this case, the "page" paramer will default to the route name.
 * That's why some of the route names here are referencing to the nextjs page names
 */
export enum ROUTE_NAMES {
  INDEX = "index",
  ROOT = "/",
  LOGIN = "/login",
  SIGNUP = "/signup",
  DASHBOARD = "/dashboard",
  FORGOTPASSWORD = "/forgotpassword",
  DEALS = "/deals",
  COMINGSOON = "/comingsoon",
  SCHEDULE_POST = "/schedulePost",
  ACCELERATOR = "/accelerator",

  WEB_URL = "https://www.socialmotion.ai/privacy",
}
