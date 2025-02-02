import { useState,useEffect } from "react"
import {db} from "../../firebase";
import {collection, getDocs, addDoc,query,where} from 'firebase/firestore';
import '../styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Dropdown } from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';

import { format } from 'date-fns';

import 'bootstrap/dist/css/bootstrap.css';


import {  useLocation } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';



const AddMaintaince=()=> {

  const location = useLocation();
  const locationdata = location.state;

  const [setbased_on_vehicleid,based_on_vehicleid_function]=useState([]);


    const [newLastName, setNewLastName] = useState("")

    const [Maintainancecost, setMaintainanceCost] = useState("")

    const [vehicleid,setVehicleID]=useState([]);

    const [datetime12h, setDateTime12h] = useState(new Date());

    const [showsave ,setshowsave]=useState(false);
    
  const  VehicleCollectionRef = collection(db, "Vehicle&Driver");

  const [errors, setErrors] = useState({});


  const createMaintancecost = async () => {

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {

      setshowsave(true);
    const  MaintainanceCollectionRef = collection(db, "Maintainance");

    const drivername=based_on_vehicleid(newLastName);

    drivername.then(async  value => {

      const docRef= await addDoc(MaintainanceCollectionRef, {maintainancedrivername:value,maintainancecost: Maintainancecost,maintainancevehicleid:newLastName,maintainancevehicledate: format(datetime12h, 'dd-MM-yyyy HH:mm:ss')});

      console.log("Document written with ID:", docRef.id);
     
    });

  } else {

    console.log('Form submission failed due to validation errors.');

}

  };


  

  const based_on_vehicleid=async (vehicleid)=>{

    const userRef = query(collection(db, "Vehicle&Driver"), where("vehicleid", "==", vehicleid));
    const findUsers = await getDocs(userRef);
    return ((findUsers.docs.map((doc) => ({ ...doc.data(), id: doc.id }))).map((vehicle)=>(vehicle.DriverName))[0]);

  }


  const based_on_vehicleid_driver=async (vehicleid)=>{
    const userRef = query(collection(db, "Vehicle&Driver"), where("vehicleid", "==", vehicleid));
    const findUsers = await getDocs(userRef);
    return   based_on_vehicleid_function(((findUsers.docs.map((doc) => ({ ...doc.data(), id: doc.id }))).map((vehicle)=>(vehicle.DriverName))[0]))}


  useEffect(() => {

    return () => {

           const getDriverName = async () => {
            const data = await getDocs(VehicleCollectionRef);
            setVehicleID((data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))).map((vehicle)=>(vehicle.vehicleid)));
           };

           getDriverName();

           based_on_vehicleid_driver(locationdata.vehicleid);

           setNewLastName(locationdata.vehicleid);

      };
  
    }, [VehicleCollectionRef] );



    const validateForm = (data) => {

      const errors = {};
  
      if (!newLastName) {
          errors.vehicleid = 'Vehicle id is required';
      }
  
   
      if(!Maintainancecost){
        errors.maintainancecost="Maintainance cost is required"; 
      }
  
      return errors;
  };



    return(

      <div className="container">


<div class="container jumbotron">
    <h3>Add Maintainance Cost</h3>
    <h4>Driver name: {setbased_on_vehicleid}</h4>
    <h4>Vehicle ID: {locationdata.vehicleid}</h4>
</div>

            <form>
     <div class="row">

    <label for="name" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-form-label">VehicleID</label>

    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
    <input type="name" value={newLastName} class="form-control" id="name" readOnly/>


{errors.vehicleid && (
                        <span className="error-message">
                            {errors.vehicleid}
                        </span>
                    )}
      </div>
      </div>

      <div class="row ">
    <label for="name" class="col-xs-12 col-sm-12 col-md-6 col-lg-6  col-form-label">Maintainance Cost</label>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">


      <input type="name" value={Maintainancecost} class="form-control" id="name" placeholder='Enter Maintance Cost' onChange={(event) => {setMaintainanceCost(event.target.value);}} />



      {errors.maintainancecost && (
                        <span className="error-message">
                            {errors.maintainancecost}
                        </span>
                    )}
                    
    </div>
    </div>


   <div class="row">
    <label for="name" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-form-label">Maintaince Date Time</label>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
    <Calendar id="calendar-12h" value={datetime12h} onChange={(e) => setDateTime12h(e.value)} showTime hourFormat="12" showIcon/>
   </div>
   </div>

      <button type='button' class="btn btn-primary" onClick={()=>{createMaintancecost()}}>Add Maintaince</button><br></br><br></br>

      </form>


       <Dialog header="Maintainance Cost Added Successfully" visible={showsave} position="center" style={{ width: '50vw' }} onHide={() => {if (!showsave) return; setshowsave(false) }} footer={(
                          <center>
                      <Button label="Ok" icon="pi" onClick={()=>{setshowsave(false); }} autoFocus className="btn btn-success" />
                          </center>
                      )} draggable={false} resizable={false}>
                                  <p className="m-0">
                                      Saved SuccessFully
                                  </p>
                  </Dialog>


        </div>
        
    );

}

export default AddMaintaince;
