import React from "react"
import Signup from "./components/Signup"
import { AuthProvider } from "./context/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./components/dashboard"
import Login from "./components/Login"
import PrivateRoute from "./context/PrivateRoute"
import ForgotPassword from "./components/ForgotPassword"
import UpdateProfile from "./components/UpdateProfile"
import Map123 from "./components/map/Map123"

import './App.css';
import BaseLayout from "./components/dashboard_component/BaseLayout"


import Buttons from "./components/dashboard_component/views/Components/ButtonsContainer";
import Badge from "./components/dashboard_component/views/Components/BadgeContainer";
import Card from "./components/dashboard_component/views/Components/CardsContainer";
import Alert from "./components/dashboard_component/views/Components/AlertContainer";
import ProgressBar from "./components/dashboard_component/views/Components/ProgressBarContainer";
import Loader from "./components/dashboard_component/views/Components/LoaderContainer";

import Widgets from "./components/dashboard_component/views/Widgets/WidgetsContainer"
import Employee from "./Task/Employee"
import Register from "./Task/Register_vehicle_driver"
import Manage from "./Task/View_vehicle_driver"
import UpdateOffice from "./Task/UpdateOfficeLocation"
import MapGrid from "./components/map/MapGrid-component/MapGrid"




function App() {
  return (
    
      
        <Router>
          <AuthProvider>
            <Routes>
               
            <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<Dashboard/>}/>
            <Route exact path="/update-profile" element={<UpdateProfile/>}/>

      

<Route
                  key={1}
                  path="/noki-cargo/widgets"
                  exact={true}
                  element={<BaseLayout>
                        <Widgets/>
                      </BaseLayout>}
                />



<Route
                  key={1}
                  path="/noki-cargo/updateprofile"
                  exact={true}
                  element={<BaseLayout>
                       <UpdateProfile/>
                      </BaseLayout>}
                />


<Route
                  key={2}
                  path="/noki-cargo/map"
                  exact={true}
                  element={<BaseLayout>

         
          <MapGrid/>
      
                        {/* <Map123/> */}
                      </BaseLayout>}
                  
                />

<Route
                  key={3}
                  path="/noki-cargo/components/buttons"
                  exact={true}
                  element={<BaseLayout>
                    <Register/>
                      </BaseLayout>}
                />


<Route
                  key={4}
                  path="/noki-cargo/components/badge"
                  exact={true}
                  element={<BaseLayout>
                    <Manage/>
                      </BaseLayout>}
                />


<Route
                  key={4}
                  path="noki-cargo/components/card"
                  exact={true}
                  element={<BaseLayout>
                    <UpdateOffice/>
                      </BaseLayout>}
                />


</Route>

              <Route path="/signup" element={<Signup/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />

            </Routes>
          </AuthProvider>
        </Router>

  )
}

export default App