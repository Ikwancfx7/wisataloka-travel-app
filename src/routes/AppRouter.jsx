import HomePage from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Activities from "../pages/Activities";
import ActivityDetail from "../pages/ActivityDetail";
import Cart from "../pages/Cart";
import Transactions from "../pages/Transactions";
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";

import { useAuth } from "../contexts/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole  }) => {
    const { user, token } = useAuth();

    if (!token) {
      return <Navigate to="/login" />
    }

    if (requiredRole && (!user || user.role !== requiredRole)) {
    return <Navigate to="/" replace />; // atau halaman khusus 403 Forbidden
    }
    
    return children;
};

const AdminRoute = ({ children }) => (
  <PrivateRoute requiredRole="admin">{children}</PrivateRoute>
);

const UserRoute = ({ children }) => (
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
        <Route path="/activities/:id" element={
          <UserRoute>
            <ActivityDetail />
          </UserRoute>}/>
        <Route path="/cart" element={
          <UserRoute>
            <Cart />
          </UserRoute>
        } />
        <Route path="/transactions" element={
          <UserRoute>
            <Transactions />
          </UserRoute>
        } />
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