export const menuConfigs = [
  {
    display: "Home",
    path: (id) => `/`,
    icon: "home",
  },
  {
    display: "Register Shop",
    path: (id) => `/dealer/register-shop`,
    icon: "storefront",
  },
  {
    display: "Add Products",
    path: (id) => `/dealer/${id}/inventory`,
    icon: "bag-add",
  },
];
