import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Checkout from './components/Checkout';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import PaymentMethod from './components/PaymentMethod';
import PaymentSuccess from './components/PaymentSuccess';
import SideBar from './staffpages/SideBar';
import Headerv2 from './staffpages/Headerv2';
import DashBoard from './staffpages/DashBoard';
import AllProduct from './staffpages/AllProduct';
import AddProduct from './staffpages/AddProduct';
import UpdateProduct from './staffpages/UpdateProduct';
import ManagementUser from './staffpages/ManagementUser';
import UserDetail from './staffpages/UserDetail';
import UserOrders from './staffpages/UserOrders';
import OrderList from './staffpages/OrderList';
import OrderDetail from './staffpages/OrderDetail';
import SideBarv2 from './adminpages/SideBarv2';
import Dashboard from './adminpages/Dashboard';
import ManagementStaff from './adminpages/ManagementStaff';
import StaffDetail from './adminpages/StaffDetail';
import Headerv3 from './adminpages/Headerv3';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Header />
              <Register />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header />
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Header />
              <Checkout />
              <Footer />
            </>
          }
        />
        <Route
          path="/product-detail/:id"
          element={
            <>
              <Header />
              <ProductDetail />
              <Footer />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Header />
              <Cart />
              <Footer />
            </>
          }
        />
        <Route
          path="/payment-method"
          element={
            <>
              <Header />
              <PaymentMethod />
              <Footer />
            </>
          }
        />
        <Route
          path="/payment-success"
          element={
            <>
              <Header />
              <PaymentSuccess />
              <Footer />
            </>
          }
        />

        {/* Staff routes */}
        <Route
          path="/staff/dashboard"
          element={
            <div className="flex">
              <SideBar />
              <div className="flex-1">
                <Headerv2 />
                <DashBoard />
              </div>
            </div>
          }
        />
        <Route
          path="/staff/all-products"
          element={
            <div className="flex">
              <SideBar />
              <div className="flex-1">
                <Headerv2 />
                <AllProduct />
              </div>
            </div>
          }
        />
        <Route
          path="/staff/add-product"
          element={
            <div className="flex">
              <SideBar />
              <div className="flex-1">
                <Headerv2 />
                <AddProduct />
              </div>
            </div>
          }
        />
        <Route
          path="/staff/update-product/:id"
          element={
            <div className="flex">
              <SideBar />
              <div className="flex-1">
                <Headerv2 />
                <UpdateProduct />
              </div>
            </div>
          }
        />
        <Route
          path="/staff/management-user"
          element={
            <div className="flex">
              <SideBar />
              <div className="flex-1">
                <Headerv2 />
                <ManagementUser />
              </div>
            </div>
          }
        />
        <Route
          path="/staff/management-user/user-detail/:id"
          element={
            <div className="flex">
              <SideBar />
              <div className="flex-1">
                <Headerv2 />
                <UserDetail />
              </div>
            </div>
          }
        />
        <Route
          path="/staff/management-user/user-orders/:id"
          element={
            <div className="flex">
              <SideBar />
              <div className="flex-1">
                <Headerv2 />
                <UserOrders />
              </div>
            </div>
          }
        />
        <Route
          path="/staff/order-list"
          element={
            <div className="flex">
              <SideBar />
              <div className="flex-1">
                <Headerv2 />
                <OrderList />
              </div>
            </div>
          }
        />
        <Route
          path="/staff/order-list/order-detail/:id"
          element={
            <div className="flex">
              <SideBar />
              <div className="flex-1">
                <Headerv2 />
                <OrderDetail />
              </div>
            </div>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <div className="flex">
              <SideBarv2 />
              <div className="flex-1">
                <Headerv3 />
                <Dashboard />
              </div>
            </div>
          }
        />
        <Route
          path="/admin/management-staff"
          element={
            <div className="flex">
              <SideBarv2 />
              <div className="flex-1">
                <Headerv3 />
                <ManagementStaff />
              </div>
            </div>
          }
        />
        <Route
          path="/admin/staff-detail/:id"
          element={
            <div className="flex">
              <SideBarv2 />
              <div className="flex-1">
                <Headerv3 />
                <StaffDetail />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
