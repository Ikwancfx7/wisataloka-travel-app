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
import PromoDetile from "../pages/PromoDetile";
import PromoPage from "../pages/PromoPage";

import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ManageActivities from "../pages/Admin/ManageActivities";
import CreateActivity from "../pages/Admin/CreateActivity";
import UpdateActivity from "../pages/Admin/UpdateActivity";
import ManageUsers from "../pages/Admin/ManageUsers";
import AdminProfile from "../pages/Admin/AdminProfile";
import ManagePayment from "../pages/Admin/ManagePayment";
import ManageBanner from "../pages/Admin/ManageBanner";
import CreateBanner from "../pages/Admin/CreateBanner";
import UpdateBanner from "../pages/Admin/UpdateBanner";
import ManageCategory from "../pages/Admin/Managecategory";

import ProfilePage from "../pages/ProfilePage";

import { useAuth } from "../contexts/AuthContext";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole  }) => {
    const { user, token } = useAuth();
    const location = useLocation();

    if (!token) {
      const currentPath = location.pathname + location.search;
      return <Navigate to={`/login?prevPage=${encodeURIComponent(currentPath)}`} replace />
      // return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (requiredRole && user?.role !== requiredRole) {
      return <Navigate to="/" replace /> // atau halaman khusus 403 Forbidden
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
        <Route path="/profile" element={
          <UserPrivateRoute>
            <ProfilePage />
          </UserPrivateRoute>
        } />
        <Route path="/promo" element={<PromoPage />} />
        <Route path="/promo/:id" element={<PromoDetile />} />
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
        <Route
          path="profile"
          element={
            <AdminRoute>
              <AdminProfile />
            </AdminRoute>
          }
        />
        <Route
          path="transactions"
          element={
            <AdminRoute>
              <ManagePayment />
            </AdminRoute>
          }
        />
        <Route
          path="create-activity"
          element={
            <AdminRoute>
              <CreateActivity />
            </AdminRoute>
          }
        />
        <Route
          path="update-activity/:id"
          element={
            <AdminRoute>
              <UpdateActivity />
            </AdminRoute>
          }
        />
        <Route
          path="banners"
          element={
            <AdminRoute>
              <ManageBanner />
            </AdminRoute>
          }
        />
        <Route
          path="create-banner"
          element={
            <AdminRoute>
              <CreateBanner />
            </AdminRoute>
          }
        />
        <Route
          path="update-banner/:id"
          element={
            <AdminRoute>
              <UpdateBanner />
            </AdminRoute>
          }
        />
        <Route
          path="categories"
          element={
            <AdminRoute>
              <ManageCategory />
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