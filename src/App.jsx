import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components

import Dashboard from "./components/admin/Dashboard/Dashboard";
import PageNotFound from "./components/PageNotFound";
import BlogPage from "./components/admin/Blog/BlogPage";
import Layout from "./components/admin/Layout/Layout";
import CreatePost from "./components/admin/Blog/CreateBlog/CreatePost";
import MediaPage from "./components/admin/Media/MediaPage";
import UploadMedia from "./components/admin/Media/UploadMedia";
import DraftPage from "./components/admin/Draft/DraftPage";
import CommentsPage from "./components/admin/Comments/CommentsPage";
import SettingsPage from "./components/admin/Setting/SettingPage";
import UsersPage from "./components/admin/User/UserPage";
import SignInPage from "./components/SignIn/SignInPage";
import CategoryPage from "./components/admin/Category/CategoryPage";
import CreateCategory from "./components/admin/Category/CreateCatedory/CreateCategory";

// 1. Private Route: ONLY allows access if token exists
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  // FIX: return children directly, not { children }
  return token ? children : <Navigate to="/login" replace />;
};

// 2. Public Route: ONLY allows access if token DOES NOT exist (e.g., prevents logged-in users from seeing Login page)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  // If token exists, send them to Dashboard. If not, let them see the login page.
  return token ? <Navigate to="/" replace /> : children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Routes (Wrapped in PublicRoute) --- */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <SignInPage />
            </PublicRoute>
          }
        />

        {/* --- Protected Routes (Wrapped in PrivateRoute) --- */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Media */}
        <Route
          path="/media-file"
          element={
            <PrivateRoute>
              <MediaPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/media-file/upload"
          element={
            <PrivateRoute>
              <UploadMedia />
            </PrivateRoute>
          }
        />

        {/* Blog */}
        <Route
          path="/blog"
          element={
            <PrivateRoute>
              <BlogPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/blog/create"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />

        <Route
          path="/blog/:slug"
          element={
            <PrivateRoute>
              <Layout>
                {/* Placeholder content */}
                <div>Blog View</div>
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Drafts */}
        <Route
          path="/draft"
          element={
            <PrivateRoute>
              <DraftPage />
            </PrivateRoute>
          }
        />

        {/* Comments */}
        <Route
          path="/comment"
          element={
            <PrivateRoute>
              <CommentsPage />
            </PrivateRoute>
          }
        />

        {/* Settings */}
        <Route
          path="/setting"
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />

        {/* Users */}
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
        />

        {/* category  */}
        <Route path="/category" element={<CategoryPage />}></Route>
        <Route path="/category/add" element={<CreateCategory />} />

        {/* 404 Page (Accessible by anyone) */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
