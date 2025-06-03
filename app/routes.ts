import path from "path";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import AddProduct from "./components/AddProduct";
import Admin from "./components/Admin";
import CustomerProductList from "./components/CustomerProductList";

const routes = [
  {
    path: "/",
    Component: Home,
  },
  {
    path: "login",
    Component: LogIn,
  },
  {
    path: "productlist",
    Component: CustomerProductList
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
