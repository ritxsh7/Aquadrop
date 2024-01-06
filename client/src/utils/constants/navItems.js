export default [
  {
    name: "Home",
    link: (user) => "/",
    public: true,
  },
  {
    name: "Become a seller >",
    link: (user) => "/seller/register",
    public: true,
  },
  {
    name: "Cart",
    link: (user) => user && `/cart/${user.name}`,
    public: false,
  },
  {
    name: "My orders",
    link: (user) => user && `/orders/${user.name}`,
    public: false,
  },
];
