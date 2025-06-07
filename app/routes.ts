import Home from "./components/common/Home";
import LogIn from "./components/common/LogIn";
import AddProduct from "./components/admin/AddProduct";
import Admin from "./components/admin/Admin";
import CustomerProductList from "./components/customer/CustomerProductList";
import HomePage from "./components/common/HomePage";
import CheckOutPage from "./components/customer/CheckOutPage";
import { Component } from "react";
import ResetPassWordPage from "./components/common/ResetPassWordPage";
import CustomerRegisterPage from "./components/customer/CustomerRegisterPage";

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
      },
      {
        path: "checkout",
        Component: CheckOutPage 
      }
    ]
  },
  {
    path: "login",
    Component: LogIn,
  },
  {
    path: "resetpassword",
    Component: ResetPassWordPage
  },
  {
    path: "registercustomer",
    Component: CustomerRegisterPage
  }
,
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
