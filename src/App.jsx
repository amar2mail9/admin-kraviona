import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SignInPage } from "./components/Public/SignIn/SignInPage"
import Dashboard from "./components/admin/Dashboard/Dashboard"

const App = () => {
  return <BrowserRouter>

    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<SignInPage />} />
    </Routes>
  </BrowserRouter>
}

export default App