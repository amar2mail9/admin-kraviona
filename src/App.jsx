import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SignInPage } from "./components/Public/SignIn/SignInPage"
import Dashboard from "./components/admin/Dashboard/Dashboard"
import PageNotFound from "./components/PageNotFound"
import BlogPage from "./components/admin/Blog/BlogPage"
import Layout from "./components/admin/Layout/Layout"

const App = () => {
  return <BrowserRouter>

    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<Layout>
        1
      </Layout>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
}

export default App