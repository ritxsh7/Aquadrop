export default [
  {
    name: "Home",
    link: (user) => "/",
    public: true,
  },
  {
    name: "Become a seller >",
    link: (user) => "/seller",
    public: false,
  },
  {
    name: "Cart",
    link: (user) => `/cart/${user}`,
    public: false,
  },
  {
    name: "My orders",
    link: (user) => `/orders/${user}`,
    public: false,
  },
];
