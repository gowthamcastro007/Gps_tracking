import React, { useEffect, useState } from "react";

import { MapContainer, Popup, TileLayer, useMap } from "react-leaflet";

import CustomMarker from "./CustomMarker";

import {db} from '../../firebase';

import {collection,getDocs,query,where} from 'firebase/firestore';

import {useLocation} from 'react-router-dom';

const Map123=()=> {

   

    const [setbased_on_vehicleid_latitude,based_on_vehicleid_function_latitude]=useState("");
    const [setbased_on_vehicleid_longitude,based_on_vehicleid_function_longitude]=useState("");

const [userLocation, setUserLocation] = useState(null);

const [mapReady, setMapReady] = useState(false);


  const based_on_vehicleid=async (vehicleid)=>{

      const userRef = query(collection(db, "Vehicle&Driver"), where("vehicleid", "==", vehicleid));
      const findUsers = await getDocs(userRef);
      based_on_vehicleid_function_latitude(((findUsers.docs.map((doc) => ({ ...doc.data(), id: doc.id }))).map((vehicle)=>(vehicle.newlatitude))[0]))
      based_on_vehicleid_function_longitude(((findUsers.docs.map((doc) => ({ ...doc.data(), id: doc.id }))).map((vehicle)=>(vehicle.newlongitude))[0]))

    }
    const location = useLocation();
useEffect(() => {


return () => {

    const locationdata = location.state;
    console.log("location_data")
    console.log(locationdata)

based_on_vehicleid(locationdata.vehicleid);

setMapReady(true);

setUserLocation([setbased_on_vehicleid_latitude, setbased_on_vehicleid_longitude]);

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

{mapReady && (

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

{userLocation && (

<CustomMarker position={userLocation}>

<Popup>This is a custom marker at your current location</Popup>

</CustomMarker>

)}

<UserLocationButton />

</MapContainer>

)}

</div>

);

}


export default Map123;