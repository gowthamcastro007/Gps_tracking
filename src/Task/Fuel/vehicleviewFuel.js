import {db} from '../../firebase';
import {collection, getDocs, updateDoc, doc, deleteDoc,query,where} from 'firebase/firestore';
import { useState, useEffect ,} from 'react';
import {  useLocation } from 'react-router-dom';
import '../styles.css';
import 'font-awesome/css/font-awesome.min.css';

import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Button } from 'primereact/button';

export default function VehicleViewFuel()
{

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

  const location = useLocation();
  const locationdata = location.state;

  const [Employee, setEmployee] = useState([]);

  const [setbased_on_vehicleid,based_on_vehicleid_function]=useState([]);

  const  MaintainanceCollectionRef = collection(db, "Maintainance");

  const updateEmployee = async (id, Age) => {
    const empDoc = doc(db, "Maintainance", id)
    const newFields = {Age: Age + 1}
    await updateDoc(empDoc, newFields)
  };

  const deleteEmployee = async (id) => {
     const empDoc = doc(db, "Maintainance", id);
     await deleteDoc(empDoc);
  }

  const based_on_vehicleid=async (vehicleid)=>{
      const userRef = query(collection(db, "Vehicle&Driver"), where("vehicleid", "==", vehicleid));
      const findUsers = await getDocs(userRef);
      return   based_on_vehicleid_function(((findUsers.docs.map((doc) => ({ ...doc.data(), id: doc.id }))).map((vehicle)=>(vehicle.DriverName))[0]))}

useEffect(() => {
    
      const getEmployee = async () => {
      const data = await getDocs(MaintainanceCollectionRef);
      setEmployee(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
     };

     getEmployee();

     based_on_vehicleid(locationdata.vehicleid);

  },[MaintainanceCollectionRef]);




    return (

<div>

<div class="container jumbotron">
    <h3>Vehicle FuelCost</h3>
    <h4>Driver name: {setbased_on_vehicleid}</h4>
    <h4>Vehicle ID: {locationdata.vehicleid}</h4>
</div>
      
      { Employee.length>0 ? ( 

      <div className='manage'>

   {Employee.map((emp) => {
    
 if(emp.maintainancevehicleid==locationdata.vehicleid){

  return  (

    <ul className='list-group' style={{border:4}}>
    <div class="row">
      <div class="col">
          <div className='list-group-item'>
            {/* {maintainancedrivername:value,maintainancecost: Maintainancecost,maintainancevehicleid:newLastName,maintainancevehicledate: format(datetime12h, 'dd-MM-yyyy HH:mm:ss')} */}
              <h6>Maintainance Cost: {emp.maintainancecost}$</h6>
              <h6>Maintainance Date : {emp.maintainancevehicledate}</h6>
            </div>
    
            </div>
    
            <div class="col">
    
            {" "}
            
            <button type="button" class=" btn btn-warning"onClick={() => {
              updateEmployee(emp.id, emp.Vehicle_Wheel_count);
            }}>

              {" "}
              Update the Maintainance</button><br /><br />


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
    
            </div>
            </div>
            </ul>
  
          );

 }

    }
    
    
    )}

        </div>):<div class="container flex-container"><p>Vehicle and Driver Details is empty.</p></div>}
        </div>
    );
};