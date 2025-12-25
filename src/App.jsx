import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SignInPage } from "./components/Public/SignIn/SignInPage"
import Dashboard from "./components/admin/Dashboard/Dashboard"
import PageNotFound from "./components/PageNotFound"
import BlogPage from "./components/admin/Blog/BlogPage"
import Layout from "./components/admin/Layout/Layout"
import CreatePost from "./components/admin/Blog/CreateBlog/CreatePost"
import MediaPage from "./components/admin/Media/MediaPage"
import UploadMedia from "./components/admin/Media/UploadMedia"
import DraftPage from "./components/admin/Draft/DraftPage"
import CommentsPage from "./components/admin/Comments/CommentsPage"
import SettingsPage from "./components/admin/Setting/SettingPage"
import UsersPage from "./components/admin/User/UserPage"

const App = () => {
  return <BrowserRouter>

    <Routes>
      {/* home page  */}
      <Route path="/" element={<Dashboard />} />

      {/* login page */}
      <Route path="/login" element={<SignInPage />} />

      {/* media */}
      <Route path="/media-file" element={<MediaPage />} />
      <Route path="/media-file/upload" element={<UploadMedia />} />

      {/* blog page  */}
      <Route path="/blog" element={<BlogPage />} />

      {/* add blog */}
      <Route path="/blog/create" element={<CreatePost />} />

      {/* draft */}
      <Route path="/draft" element={<DraftPage />} />

      {/* view blog */}
      <Route path="/blog/:slug" element={<Layout>
        1
      </Layout>} />

      {/* comments */}
      <Route path="/comment" element={<CommentsPage />} />

      {/* setting page */}
      <Route path="/setting" element={<SettingsPage />} />

      {/* user */}
      <Route path="/user" element={<UsersPage />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
}

export default App