import HomePage from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Activities from "../pages/Activities";
import ActivityDetail from "../pages/ActivityDetail";
import Cart from "../pages/Cart";
import Transactions from "../pages/Transactions";
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import Checkout from "../pages/Checkout";
import TransactionDetile from "../pages/TransactionDetile";

import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ManageActivities from "../pages/Admin/ManageActivities";
import ManageUsers from "../pages/Admin/ManageUsers";

import { useAuth } from "../contexts/AuthContext";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole  }) => {
    const { user, token } = useAuth();
    const location = useLocation();

    if (!token) {
      return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (requiredRole && (!user || user.role !== requiredRole)) {
    return <Navigate to="/" replace />; // atau halaman khusus 403 Forbidden
    }
    
    return children;
};

const AdminRoute = ({ children }) => (
  <PrivateRoute requiredRole="admin">{children}</PrivateRoute>
);

const UserPrivateRoute = ({ children }) => (
  <PrivateRoute requiredRole="user">{children}</PrivateRoute>
);

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/activities" element={
            <Activities />
        } />
        <Route path="/activities/:id" element={<ActivityDetail />}/>
        <Route path="/cart" element={
          <UserPrivateRoute>
            <Cart />
          </UserPrivateRoute>
        } />
        <Route path="/checkout" element={
          <UserPrivateRoute>
            <Checkout />
          </UserPrivateRoute>
        } />
        <Route path="/transactions" element={
          <UserPrivateRoute>
            <Transactions />
          </UserPrivateRoute>
        } />
        <Route path="/transaction/:id" element={
          <UserPrivateRoute>
            <TransactionDetile />
          </UserPrivateRoute>
        } />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route
          index
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="activities"
          element={
            <AdminRoute>
              <ManageActivities />
            </AdminRoute>
          }
        />
        <Route
          path="users"
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          }
        />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;