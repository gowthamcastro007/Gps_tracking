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
import GPSListener from "./Task/GpsListener"
import Job from "./Task/Destination/Job"
import ViewDestinatorDetails from "./Task/Destination/view-destinator-details"
import AddMapDestinator from "./Task/Destination/Add-Map-Destinator"
import OverSpeed from "./Task/OverSpeed/overspeed"
import Assigntrip from "./Task/Trip/assigntrip"
import Cost from "./Task/Cost/cost"
import OwnerOnly from "./Task/Owner-only/owner-only"
import VehicleViewTrip from "./Task/Trip/vehicleviewtrip"
import Viewtrip from "./Task/Trip/viewtrip"
import AddMaintaince from "./Task/Maintainance/AddMaintaince"
import ViewMaintaince from "./Task/Maintainance/ViewMaintaince"
import VehicleViewMaintainance from "./Task/Maintainance/vehicleviewMaintainance"
import AddFuel from "./Task/Fuel/AddFuel"
import VehicleViewFuel from "./Task/Fuel/vehicleviewFuel"
import ViewFuel from "./Task/Fuel/ViewFuel"
import EntireVehicle from "./Task/Entire-Vehicle/Entire-Vehicle"




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
                  key={2}
                  path="/noki-cargo/map/vehicle"
                  exact={true}
                  element={<BaseLayout>

         
          <Map123/>
      
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
                  path="/noki-cargo/components/assigntrip"
                  exact={true}
                  element={<BaseLayout>
                    <Assigntrip/>
                      </BaseLayout>}
                />



<Route
                  key={4}
                  path="/noki-cargo/components/viewtrip"
                  exact={true}
                  element={<BaseLayout>
                    <Viewtrip/>
                      </BaseLayout>}
                />



<Route
                  key={4}
                  path="/noki-cargo/components/viewtrip/viewvehicletrip"
                  exact={true}
                  element={<BaseLayout>
                    <VehicleViewTrip/>
                      </BaseLayout>}
                />


<Route
                  key={4}
                  path="/noki-cargo/components/viewtrip/viewvehiclefuel"
                  exact={true}
                  element={<BaseLayout>
                    <VehicleViewFuel/>
                      </BaseLayout>}
                />

<Route
                  key={4}
                  path="/noki-cargo/components/viewMaintainance/viewvehicleMaintainance"
                  exact={true}
                  element={<BaseLayout>
                    <VehicleViewMaintainance/>
                      </BaseLayout>}
                />

<Route
                  key={4}
                  path="/noki-cargo/add-maintainance"
                  exact={true}
                  element={<BaseLayout>
                    <AddMaintaince/>
                      </BaseLayout>}
                />

<Route
                  key={4}
                  path="/noki-cargo/view-maintainance"
                  exact={true}
                  element={<BaseLayout>
                    <ViewMaintaince/>
                      </BaseLayout>}
                />



<Route
                  key={4}
                  path="/noki-cargo/add-fuel"
                  exact={true}
                  element={<BaseLayout>
                    <AddFuel/>
                      </BaseLayout>}
                />

<Route
                  key={4}
                  path="/noki-cargo/view-fuel"
                  exact={true}
                  element={<BaseLayout>
                    <ViewFuel/>
                      </BaseLayout>}
                />


<Route
                  key={4}
                  path="/dashboard/entire-vehicle"
                  exact={true}
                  element={<BaseLayout>
                    <EntireVehicle/>
                      </BaseLayout>}
                />


<Route
                  key={4}
                  path="/noki-cargo/components/viewtrip/viewvehicletrip"
                  exact={true}
                  element={<BaseLayout>
                    <VehicleViewTrip/>
                      </BaseLayout>}
                />

<Route
                  key={4}
                  path="/noki-cargo/components/view-destinator"
                  exact={true}
                  element={<BaseLayout>
                    <ViewDestinatorDetails/>
                      </BaseLayout>}
                />


<Route
                  key={4}
                  path="/noki-cargo/components/add-destinator"
                  exact={true}
                  element={<BaseLayout>
                    <AddMapDestinator/>
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
<Route
                  key={4}
                  path="noki-cargo/components/badge"
                  exact={true}
                  element={<BaseLayout>
                    <Manage/>
                      </BaseLayout>}
                />

<Route
                  key={4}
                  path="/dashboard/overspeed"
                  exact={true}
                  element={<BaseLayout>
                    <OverSpeed/>
                      </BaseLayout>}
                />


<Route
                  key={4}
                  path="/dashboard/cost"
                  exact={true}
                  element={<BaseLayout>
                    <OverSpeed/>
                      </BaseLayout>}
                />

<Route
                  key={4}
                  path="noki-cargo/fuelcost"
                  exact={true}
                  element={<BaseLayout>
                    <Cost/>
                      </BaseLayout>}
                />

<Route
                  key={4}
                  path="noki-cargo/owner-only"
                  exact={true}
                  element={<BaseLayout>
                    <OwnerOnly/>
                      </BaseLayout>}
                />






</Route>














              <Route path="/signup" element={<Signup/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />
              <Route path="/gps-listener/noki-cargo" element={<GPSListener/>} />

            </Routes>
          </AuthProvider>
        </Router>

  )
}

export default App