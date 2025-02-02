import { useState,useEffect } from "react"
import {db} from "../../firebase";
import {collection, getDocs, addDoc,query,where} from 'firebase/firestore';
import '../styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Dropdown } from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';
import { FloatLabel } from 'primereact/floatlabel';

import { format } from 'date-fns';


import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import 'bootstrap/dist/css/bootstrap.css';


import {  useLocation } from 'react-router-dom';

const Assigntrip=()=> {



  const location = useLocation();
  const locationdata = location.state;


  const [showsave ,setshowsave]=useState(false);

    const [newFirstName, setNewFirstName] = useState("")

    const [newLastName, setNewLastName] = useState("")

    const [newdestinatorname, setdestinatorname] = useState("")

    const [vehicleid,setVehicleID]=useState([]);

    const [destinator,setDestinator]=useState([]);

    const [datetime12h, setDateTime12h] = useState(new Date());
    
  const  VehicleCollectionRef = collection(db, "Vehicle&Driver");

  const  DestinatorCollectionRef = collection(db, "Destinator&Vehicle");

  const [errors, setErrors] = useState({});

  const [setbased_on_vehicleid,based_on_vehicleid_function]=useState([]);



  const validateForm = (data) => {

    const errors = {};

    if (!newFirstName.trim()) {
        errors.tripid = 'Trip ID is required';
    }

    if (!newLastName.trim()) {
        errors.trip_vehicleid = 'trip vehicleid is required';
    } 

    if(!newdestinatorname.trim()){
      errors.destinator = 'Destinator is required';
    }

    return errors;
};









  const createDestinator = async () => {


    const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {

          setshowsave(true);
          
    const  TripCollectionRef = collection(db, "Trip");

    const drivername=based_on_vehicleid(newLastName);

    drivername.then(async  value => {

      const docRef= await addDoc(TripCollectionRef, {tripid:newFirstName,tripvehicleid: newLastName,tripdriver:value,tripdestinator: newdestinatorname,tripvehicledate: format(datetime12h, 'dd-MM-yyyy HH:mm:ss')});

      console.log("Document written with ID:", docRef.id);
      console.log(value) 
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

        const getVehicleid = async () => {
            const data = await getDocs(VehicleCollectionRef);
            setVehicleID((data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))).map((vehicle)=>(vehicle.vehicleid)));
           };

           getVehicleid();

           const getDestinator=async()=>{
            const data = await getDocs(DestinatorCollectionRef);
            setDestinator((data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))).map((vehicle)=>(vehicle.DestinatorName)));
           }

           getDestinator();

           based_on_vehicleid_driver(locationdata.vehicleid);

           setNewLastName(locationdata.vehicleid);


           based_on_vehicleid("test123");
          
      };
  
       
  
    }, [] );

    return(

      <div className="container">

<div class="container jumbotron">
    <h3>Assign Trip</h3>
    <h4>Driver name: {setbased_on_vehicleid}</h4>
    <h4>Vehicle ID: {locationdata.vehicleid}</h4>
</div>

            <form>

    <div class="row ">
    <label for="name" class="col-xs-12 col-sm-12 col-md-6 col-lg-6  col-form-label">Trip ID</label>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <input type="name" class="form-control" id="name" placeholder='Enter TripID' onChange={(event) => {setNewFirstName(event.target.value);}} />



      {errors.tripid && (
                        <span className="error-message">
                            {errors.tripid}
                        </span>
                    )}

    </div>
    </div>

     <div class="row">
    <label for="name" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-form-label">Vehicleid</label>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <input type="name" class="form-control" value={newLastName} readOnly />


{errors.trip_vehicleid && (
                        <span className="error-message">
                            {errors.trip_vehicleid}
                        </span>
                    )}

      </div>
      </div>

    <div class="row">
    <label for="name" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-form-label">Destinator</label>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
    <Dropdown  value={newdestinatorname} onChange={(event) => {setdestinatorname(event.target.value);}} options={destinator} optionLabel="name" 
             placeholder="Select the Destinator" className="w-full md:w-18rem" />


{errors.destinator && (
                        <span className="error-message">
                            {errors.destinator}
                        </span>
                    )}

   </div>
   </div>



   <div class="row">
    <label for="name" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-form-label">Trip Time</label>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
    <Calendar id="calendar-12h" value={datetime12h} onChange={(e) => setDateTime12h(e.value)} showTime hourFormat="12" showIcon/>
   </div>
   </div>


      <button type='button' class="btn btn-primary" onClick={()=>{createDestinator()}}>Add Trip</button><br></br><br></br>

      </form>



       <Dialog header="Trip Added Successfully" visible={showsave} position="center" style={{ width: '50vw' }} onHide={() => {if (!showsave) return; setshowsave(false) }} footer={(
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

export default Assigntrip;
