import React from "react"
import Signup from "./components/Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "./context/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./components/dashboard"
import Login from "./components/Login"
import PrivateRoute from "./context/PrivateRoute"
import ForgotPassword from "./components/ForgotPassword"
import UpdateProfile from "./components/UpdateProfile"


function App() {
  return (
    
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
               
            <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<Dashboard/>}/>
            <Route exact path="/update-profile" element={<UpdateProfile/>}/>

          </Route>

           
              <Route path="/signup" element={<Signup/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
  
  )
}

export default App