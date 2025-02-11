import React, { useEffect, useState } from "react";
import { MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import CustomMarker from "./CustomMarker";
import {db} from '../../firebase';
import {collection,getDocs} from 'firebase/firestore';


const All_vehicle_map=()=> {

const [userLocation, setUserLocation] = useState(null);

const [mapReady, setMapReady] = useState(false);

const [Employee, setEmployee] = useState([]);

const  VehicleDriverCollectionRef = collection(db, "Vehicle&Driver");


useEffect(() => {


return () => {


    const getEmployee = async () => {
        const data = await getDocs(VehicleDriverCollectionRef);
        setEmployee(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
       };
  
    getEmployee();

setMapReady(true);


}

}, []);






const UserLocationButton = () => {

const map = useMap();

const handleGoToUserLocation = () => {

if (userLocation) {

map.flyTo(userLocation, 13); // Fly to the user’s location with a zoom level of 13

}

};

return (

<button

onClick={handleGoToUserLocation}

style={{

position: "absolute",

top: "90px",

left: "12px",

zIndex: 1000,

padding: "5px",

}}

>

<img

src="https://www.svgrepo.com/show/315096/current-location.svg"

alt="logo"

width="16px"

/>

</button>

);

};




return (

<div>

   { Employee.length>0 ? ( <div>

    <MapContainer

    center={userLocation || [51.505, -0.09]}
    
    zoom={userLocation ? 13 : 3} // Zoom out if user location is not available
    
    scrollWheelZoom={true} // Enable mouse scroll zoom
    
    style={{ height: "100vh", width: "100%" }} // Specify map container dimensions
    
    >
    
    <TileLayer
    
    attribution='&copy; <a href=”https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    
    />
    
   { Employee.map((emp) => {
      return  (


    <CustomMarker position={[emp.newlatitude,emp.newlongitude]}>
    
    <Popup>This is a custom marker at your current location</Popup>
    
    </CustomMarker>
    

      ) ;
    }) }

<UserLocationButton />

</MapContainer>

        </div>):<div class="container flex-container"><p>Vehicle and Driver Details is empty.</p></div>  }


</div>

);

}


export default All_vehicle_map;