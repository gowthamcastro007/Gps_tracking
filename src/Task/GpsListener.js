

import React, { useState,useEffect,useRef } from "react";
import queryString from "query-string";

import {db} from '../firebase';
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc,query, where } from 'firebase/firestore';

const GPSListener = () => {

    const [vehicleid, setVehicleID] = useState("");
    const [latitude, setlatitude] = useState("");
    const[longitude,setlongitude]=useState("");
    const [speed,setspeed]=useState("");



    const firstRender = useRef(true);


    // https://localhost:3000/gpslistener?vehicleid=123567&latitude=11.20&longitude=11.30&speed=60&battery=50


    const updateUser = async (vehicleid_params,latitude_params,longitude_params,speed_params,battery) => {
        
        const userRef = query(collection(db, "Vehicle&Driver"), where("vehicleid", "==", vehicleid_params));
        const findUsers = await getDocs(userRef);

        console.log(findUsers);

        if(speed_params>50){



            findUsers.docs.map((doc) => ({ ...doc.data(), id: doc.id })).map(async (emp) => {

                const data123 = await getDocs(collection(db, "OverSpeed"));

                if((data123.docs.map((doc) => ({ ...doc.data(), id: doc.id })).map((vehicle)=>(vehicle.overspeedvehicleid))).includes(emp.vehicleid)){

                const userRefoverspeed = query(collection(db, "OverSpeed"), where("overspeedvehicleid", "==", emp.vehicleid));
                const findUsersoverspeed = await getDocs(userRefoverspeed);

                findUsersoverspeed.forEach( async (user) => {

                 const getUser = doc(db, 'OverSpeed', user.id);

                 await updateDoc(getUser, {
                    overspeedDriverName: emp.DriverName,
                    overspeedspeed: emp.speed,
                    overspeedlatitude:emp.newlatitude,
                    overspeedlongitude:emp.newlongitude,
                 });
        
                });
                    


                }else{

                    console.log(emp);
                    try {
                        const docRef = await addDoc(collection(db, "OverSpeed"), { overspeedDriverName: emp.DriverName, overspeedvehicleid: emp.vehicleid, overspeedPhone_Number_Driver: emp.Phone_Number_Driver,overspeedspeed:emp.speed,overspeedlatitude:emp.newlatitude,overspeedlongitude:emp.newlongitude});
                        console.log("Document written with ID:", docRef.id);
                    }catch (e) {
                        console.error("Error adding document: ", e);
                    }

                }
            
                
            });
           
        }

        findUsers.forEach( async (user) => {

         const getUser = doc(db, 'Vehicle&Driver', user.id);

         await updateDoc(getUser, {
             speed:speed_params,
             newlatitude:latitude_params,
             newlongitude:longitude_params,
             devicebatterypercentage:battery
         });


        });

       }

    useEffect(() => {

        if (firstRender.current) {
            // Do something only on the first render
            firstRender.current = false;
          } else {
            const queries = queryString.parse(window.location.search);
       
            setVehicleID(queries.vehicleid || "");
            setlatitude(queries.latitude|| "");
            setlongitude(queries.longitude||"");
            setspeed(queries.speed|| "" );
    
    
            updateUser(queries.vehicleid,queries.latitude ,queries.longitude, queries.speed ,queries.battery)
                
           
          }

       

       
      }, []);


    return (
        <div style={{ margin: 200 }}>

            <p> vehicleid: {vehicleid} </p>
            <p> latitude: {latitude} </p>
            <p> longitude: {longitude} </p>
            <p> speed: {speed} </p>

<p>updated to database</p>

        </div>
    );
};

export default GPSListener;