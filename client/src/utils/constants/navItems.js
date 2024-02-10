export default [
  {
    name: "Home",
    icon: "home",
    link: (user) => "/",
    public: true,
  },
  {
    name: "Become a seller >",
    icon: "person-add-sharp",
    link: (user) => "https://dealer-aquadrop.web.app",
    public: true,
  },
  {
    name: "Cart",
    icon: "cart",
    link: (user) => user && `/cart/${user.name}`,
    public: false,
  },
  {
    name: "My orders",
    icon: "bag",
    link: (user) => user && `/orders/${user.name}`,
    public: false,
  },
];
