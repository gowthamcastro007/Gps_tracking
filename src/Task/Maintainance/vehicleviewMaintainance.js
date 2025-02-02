import {db} from '../../firebase';
import {collection, getDocs, updateDoc, doc, deleteDoc,query,where} from 'firebase/firestore';
import { useState, useEffect ,} from 'react';
import {  useLocation } from 'react-router-dom';
import '../styles.css';
import 'font-awesome/css/font-awesome.min.css';

import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Button } from 'primereact/button';

import { Dialog } from 'primereact/dialog';

import { format } from 'date-fns';


import {Calendar} from 'primereact/calendar';

export default function VehicleViewMaintainance()
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


const [showupdate,setshowupdate]=useState(false);


const [destinatorid,setdestinatorid]=useState("");

const [drivername,setdrivername]=useState("");

const [maintainancecost,setmaintainancecost]=useState("");

const [maintainancevehicleid,setmaintainancevehicleid]=useState("");

const [maintainancevehicledate,setmaintainancevehicledate]=useState(format(new Date(), 'dd-MM-yyyy HH:mm:ss'));


const [errors, setErrors] = useState({});


const validateForm = (data) => {
  const errors = {};

  if (!drivername) {
      errors.drivername = 'Driver Name is required';
  } 

  if (!maintainancecost) {
      errors.maintainancecost = 'Maintainance Cost is required';
  } 

  if(!maintainancevehicleid){

    errors.maintainancevehicleid="Maintainanace Vehicle Id is required"; 
  }

  if (!maintainancevehicledate) {
      errors.maintainancevehicledate = 'Maintainanance Vehicle Date is required';
  } 

  return errors;
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



  const updateUser = async (destinatorid,maintainancecost,maintainancevehicledate) => {

if(!maintainancevehicledate){

  const empDoc = doc(db, "Maintainance", destinatorid)

  await updateDoc(empDoc,  {
    maintainancecost: maintainancecost,
    maintainancevehicledate:format(maintainancevehicledate, 'dd-MM-yyyy HH:mm:ss'),
   })


}else{

  const empDoc = doc(db, "Maintainance", destinatorid)

  await updateDoc(empDoc,  {
    maintainancecost: maintainancecost,
   })

}
   

   }




    return (
<div>


<div class="container jumbotron">
    <h3>Vehicle Maintainance</h3>
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
              
setdestinatorid(emp.id);
setdrivername(emp.maintainancedrivername);
setmaintainancecost(emp.maintainancecost);
setmaintainancevehicleid(emp.maintainancevehicleid);
setmaintainancevehicledate(emp.maintainancevehicledate);
setshowupdate(true);

            }} >

              {" "}
              Update the Maintainance</button><br /><br />





              <Dialog header="Update Maintainance" visible={showupdate} position="center" style={{ width: '50vw' }} onHide={() => {if (!showupdate) return; setshowupdate(false)}} footer={(
                                          
                                          <center>
                                      <Button label="Update Details" icon="pi" onClick={()=>{ 
                                        
                                        const newErrors = validateForm();
              
                      setErrors(newErrors);
              
                      if (Object.keys(newErrors).length === 0) {

                                        updateUser(destinatorid,maintainancecost,maintainancevehicledate);
                                        setshowupdate(false);
                                      
                                      } 
                                        
                                        
                                        
                                        }} className="btn btn-success" />  {"   "}
                                      <Button label="Cancel" icon="pi" onClick={()=>{setshowupdate(false);}} className="btn btn-success" />
                                          </center>
                                      )} draggable={false} resizable={false}>
                                        
                                                  <form>
              
                                                  <div class="row ">
                  <label for="name" class="col-xs-12 col-sm-12 col-md-6 col-lg-6  col-form-label">Maintainanace ID</label>
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <input value={destinatorid} type="name" class="form-control" id="name" readOnly />
                  </div>
                   </div>
              
                  <div class="row ">
                  <label for="name" class="col-xs-12 col-sm-12 col-md-6 col-lg-6  col-form-label">Driver Name</label>
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <input value={drivername} type="name" class="form-control" id="name" placeholder='Enter Destinator Name' readonly />
              
              
                    {errors.drivername && (
                                      <span className="error-message">
                                          {errors.drivername}
                                      </span>
                                  )}
                  </div>
                   </div>
              
              
                    <div class="row">
                  <label for="name" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-form-label">Maintainance Cost</label>
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <input value={maintainancecost} type="name" class="form-control" id="name" placeholder='Enter Maintainance Cost' onChange={(event) => { setmaintainancecost(event.target.value); }} />
              
                    {errors.maintainancecost && (
                                      <span className="error-message">
                                          {errors.maintainancecost}
                                      </span>
                                  )}
              
                    </div></div>
              
                    <div class="row">
                  <label for="name" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-form-label">Maintainanace VehiclId</label>
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <input value={maintainancevehicleid} type="name" class="form-control" id="name" placeholder='Enter Destinator longitude' readonly/>
              
              
                    {errors.maintainancevehicleid && (
                                      <span className="error-message">
                                          {errors.maintainancevehicleid}
                                      </span>
                                  )}
                    </div></div>
              
                    <div class="row">
                  <label for="pnumber" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-form-label">Maintainanace Vehicle Date</label>
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">


                        <Calendar id="calendar-12h" value={maintainancevehicledate} onChange={(e) => setmaintainancevehicledate(e.value)} showTime hourFormat="12" showIcon/>

                </div></div>
              
                    </form>
              </Dialog>


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