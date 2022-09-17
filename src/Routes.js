import React,{Fragment} from 'react'
import {BrowserRouter, Route,Routes } from "react-router-dom"
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Cart from './core/Cart'
import ProductDesc from './user/Productdesc'
import UserDashboard from './user/UserDashBoard'
import AdminDashboard from './user/AdminDashBoard'
import UserEditProfile from './Userpro/UserEdiprof'
import Addcategory from './admin/AddCategory'
import UpdateCategory from './admin/UpdateCategory'
import ManageCategories from './admin/ManageCategories'
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'
import UserProfile from './Userpro/UserProfile'
import UserOrder from './Userpro/UserOrders'
import Orders from './admin/Orders'
import UserUpdateOders from './Userpro/UserUpdateOders'
import Signupbyadmin from './user/Signupbyadmin'

export default function Routing() {
    return (
        <BrowserRouter>
        <Fragment>
        <Routes>
    <Route exact path="/" element={<Home />}></Route>
    <Route exact path="/signup" element={<Signup />}></Route>
    <Route exact path="/cart" element={<Cart />}></Route>
    <Route exact path="/signin" element={<Signin />}></Route>
    <Route path="/order" element={<UserOrder />}></Route>
    <Route path="user/dashboard" element={<UserDashboard />}></Route>
    <Route path="user/edit/orders" element={<UserDashboard />}></Route>
    <Route path="/profile" element={<UserProfile />}></Route>
    <Route path="/edit/profile" element={<UserEditProfile />}></Route>
    <Route path="user/edit/profile" element={<UserDashboard />}></Route>
    <Route path="/admin/add/admin" element={<Signupbyadmin />}></Route>
    <Route path="admin" element={<AdminDashboard/>}></Route>
    <Route path="admin/create/category" element={<Addcategory/>}></Route>
    <Route path="admin/manage/order" element={<Orders/>}></Route>
    <Route path="admin/admin/category" element={<ManageCategories/>}></Route>
    <Route path="admin/create/product" element={<AddProduct/>}></Route>
    <Route path="admin/manage/product" element={<ManageProducts/>}></Route>
    <Route path="admin/product/update/:productId" element={<UpdateProduct/>}></Route>
    <Route path="product/:productId" element={<ProductDesc/>}></Route>
    <Route path="admin/category/update/:categoryId" element={<UpdateCategory/>}></Route>
    <Route path="/order/update/:orderId" element={<UserUpdateOders/>}></Route>
</Routes>       

        </Fragment>
        </BrowserRouter>
    )
}