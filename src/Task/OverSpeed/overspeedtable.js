import React from 'react';
import Table from 'react-bootstrap/Table';
import {db} from '../../firebase';
import {collection, getDocs,  doc, deleteDoc} from 'firebase/firestore';

import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Button } from 'primereact/button';


function MyTable({ data }) {






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


      const deleteEmployee = async (id) => {
         const empDoc = doc(db, "OverSpeed", id);
         await deleteDoc(empDoc);
      }


  return (

   <div>

<div class=" container jumbotron">
    <h3>List of OverSpeed Vehicle</h3>
    </div>

<Table>


    <thead>
    <tr>
      <th>Driver Name</th>
      <th>Vehicle ID</th>
      <th>Driver Phone Number</th>
      <th>Speed(KM/Hr)</th>
      <th>Access Map</th>
      <th>Delete </th>
    </tr>

    </thead>
    <tbody>
        {
        data.map((emp,index) => (
             <tr key={index}>
        <td>{emp.overspeedDriverName}</td>
        <td>{emp.overspeedvehicleid}</td>
        <td>{emp.overspeedPhone_Number_Driver}</td>
        <td>{emp.overspeedspeed}</td>
        <td><button type="button" class="btn btn-success" onClick={() => {
                window.open("https://www.google.com/maps/dir/?api=1&origin="+(emp.overspeedlatitude.toString())+","+(emp.overspeedlongitude.toString()),"_blank")
              }} >
                Overspeed Location
              </button></td>

        <td> 
          
       
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
        

          </td>
              </tr>
       ))  
       
       }
       
        
      

    </tbody>
  
  </Table>
  </div> 

  );
}

export default MyTable;