import {db} from '../firebase';

import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc,query, where } from 'firebase/firestore';

import { useState, useEffect } from 'react';
import './styles.css';
import 'font-awesome/css/font-awesome.min.css';

import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Button } from 'primereact/button';

export default function Manage(){

  const [officelatitude, setofficelatitude] = useState()
  const [officelongitude, setofficelongitude] = useState()
  const [Employee, setEmployee] = useState([]);




  const acceptvalue = (emp) => {
  
    deleteEmployee(emp.id);
    console.log("acceptvalue is clicked")
    
  };
  
  const rejectvalue = (emp) => {
  
  console.log("rejectvalue is clicked")
    
  };
  
  
  const confirm2 = (event) => {
  
  
    confirmPopup({
      group: 'headless',
        target: event.currentTarget,
        message: 'Do you want to delete this record?',
        icon: 'pi pi-info-circle',
        defaultFocus: 'reject',
        acceptClassName: 'p-button-danger',
    });
  
  
  
  };


  const  VehicleCollectionRef = collection(db, "Vehicle&Driver");


  const updateEmployee = async (id, Age) => {
    const empDoc = doc(db, "Vehicle&Driver", id)
    const newFields = {Age: Age + 1}
    await updateDoc(empDoc, newFields)
  };

  const deleteEmployee = async (id) => {
     const empDoc = doc(db, "Vehicle&Driver", id);
     await deleteDoc(empDoc);
  }



  


  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  


useEffect(() => {

  const officelatitude_local = localStorage.getItem('officelatitude');
  const officelongitude_local= localStorage.getItem('officelongitude')

  setofficelatitude(officelatitude_local);
  setofficelongitude(officelongitude_local);

      const getEmployee = async () => {
      
      const data = await getDocs(VehicleCollectionRef);
      setEmployee(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

     };

     getEmployee();

  },[VehicleCollectionRef]);




    return (

      
      ( Employee.length>0 ? ( <div className='manage'>
   {Employee.map((emp) => {
      return  (

       
         
<ul className='list-group' style={{border:4
}}>



<div class="row">
  <div class="col">
      <div className='list-group-item'>
        
          <h6>Driver Name : {emp.DriverName}</h6>
          <h6>Vehicle ID : {emp.vehicleid}</h6>
          <h6>Vehicle Wheel Count : {emp.Vehicle_Wheel_count}</h6>
          <h6>Driver Phone Number : {emp.Phone_Number_Driver}</h6>
          <h6>Speed : {emp.speed}</h6>
          <h6>latitude : {emp.newlatitude}</h6>
          <h6>longitude:{emp.newlongitude}</h6>
          <h6>Distance from office:{Math.round(getDistanceFromLatLonInKm(emp.newlatitude,emp.newlongitude,officelatitude,officelongitude))} KM</h6>
          <h6>GPS battery percentage: {emp.devicebatterypercentage}</h6>
            
        </div>

        </div>

        <div class="col">

        {" "}
        <button type="button" class=" btn btn-warning"onClick={() => {
          updateEmployee(emp.id, emp.Vehicle_Wheel_count);
          
        }}>
          {" "}
          Update the User</button><br /><br />


          <ConfirmPopup
                          group="headless"
                          content={({message, acceptBtnRef, rejectBtnRef, hide}) => 
                              <div className="bg-gray-900 text-white border-round p-3">
                                  <span>{message}</span>
                                  <div className="flex align-items-center gap-2 mt-3">
                                      <Button ref={acceptBtnRef} label="Delete" onClick={() => {acceptvalue(emp); hide();}} className="btn btn-danger"></Button>
                                      <Button ref={rejectBtnRef} label="Cancel" outlined onClick={() => {rejectvalue(emp); hide();}}className="btn btn-success"></Button>
                                  </div>
                              </div>
                          }
                      />
                    
            <Button onClick={(event) => {confirm2(event,emp); }} icon="pi pi-times"  label='Delete' className="btn btn-danger"></Button>
                  
          
          <br /><br />

          <button type="button" class="btn btn-success" disabled={officelatitude==null} onClick={() => {
            window.open("https://www.google.com/maps/dir/?api=1&origin="+(officelatitude.toString())+","+(officelongitude.toString())+"&destination="+(emp.newlatitude)+","+(emp.newlongitude)+"&travelmode=two-wheeler","_blank")
          }} >
            Go to Map find Distance Between Office & GPS Device
          </button>

          {officelatitude==null ?(<p style={{color:"red"}}>* update the office location to see the map and directions</p>) :(<p></p>)}

        </div>
        </div>
        </ul>

       
      ) ;
    })}





        </div>):<div class="container flex-container"><p>Vehicle and Driver Details is empty.</p></div>  )

    );
};