export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  OTP: "/login/otp/:sessionId",
  FLOW: "/login/flow",
  SOCIAL_LOGIN: "/social-login",
  PANEL: "/panel",
  ACCOUNT: "/panel/account",
  PERSONALDATA: "/panel/account/personal-data",
  CONTACTS: "/panel/account/contacts",
  SHIPPING: "/panel/account/shipping",
  PAYMENT: "/panel/account/payment",
  DOCUMENTS: "/panel/account/documents",
  RESETPASSWORD: "/panel/account/reset-password",
  PARKANDRIDE: "/panel/account/park-and-ride",
  DELETEACCOUNT: "/panel/account/delete",
  TRIPS: "/panel/trips",
  RECEIPTS: "/panel/receipts",
  PASSES: "/panel/passes",
  BUY_PASS:"/panel/passes/buy",
  VOUCHERS: "/panel/vouchers",
  FORGOT_PASSWORD: "/forgot-password",
  NOT_FOUND: "*",
};

export const NavigationMenuItems = [{ title: "Panel", path: ROUTES.PANEL }];

export const SideMenuItems = [
  { title: "Panel", path: ROUTES.PANEL },
  { title: "Manage account", path: ROUTES.ACCOUNT },
  { title: "Trips", path: ROUTES.TRIPS },
  { title: "Receipts", path: ROUTES.RECEIPTS },
  { title: "Manage passes", path: ROUTES.PASSES },
  
];

export const ManageAccountItems = [
  { title: "Personal data", path: ROUTES.PERSONALDATA },
  { title: "Contacts", path: ROUTES.CONTACTS },
  { title: "Shipping addres", path: ROUTES.SHIPPING },
  { title: "Payment", path: ROUTES.PAYMENT },
  { title: "Documents", path: ROUTES.DOCUMENTS },
  { title: "Reset password", path: ROUTES.RESETPASSWORD },
  { title: "Delete account", path: ROUTES.DELETEACCOUNT },
];
