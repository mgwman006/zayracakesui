import Home from "./components/Home";
import LogIn from "./components/LogIn";
import AddProduct from "./components/AddProduct";
import Admin from "./components/Admin";
import CustomerProductList from "./components/CustomerProductList";
import HomePage from "./components/HomePage";

const routes = [
  {
    path: "/",
    Component: Home,
    children: [
      {
        path:"homepage",
        Component: HomePage
      },
      {
        path: "", // This will render the component at the root path
        Component: CustomerProductList
      }
    ]
  },
  {
    path: "login",
    Component: LogIn,
  },

  {
    path:"addproduct",
    Component: AddProduct
  },
  {
    path: "admin",
    Component: Admin
  }
];

export default routes;
