import { useState } from "react"
import {db} from "../firebase";
import {collection, addDoc,query,where,getDocs} from 'firebase/firestore';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import { Message } from 'primereact/message';

import 'bootstrap/dist/css/bootstrap.css';
const Register=()=> {

    const [newFirstName, setNewFirstName] = useState("")
    const [newLastName, setNewLastName] = useState("")
    const [newAge, setNewAge] = useState(0)
    const [newPhoneNumber, setNewPhoneNumber] = useState("")

    const [newSpeed, setNewSpeed] = useState(0)
    const [newlatitude, setNewlatitude] = useState(0)
    const [newlongitude, setNewlongitude] = useState(0)

    const [showsave ,setshowsave]=useState(false);
    const [existvehicleid ,existvehicleidshow]=useState(false);

    const [batterypercentage, setBatteryPercentage] = useState(0)
    const [vehicleidexist,setvehicleidexist]=useState(false);
    const  VehicleCollectionRef = collection(db, "Vehicle&Driver");

//form validation

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
});

const [errors, setErrors] = useState({});




  const createEmployee = async () => {


    const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {

          setshowsave(true);
            // Form submission logic here
            console.log({ DriverName: newFirstName, vehicleid: newLastName, Vehicle_Wheel_count: Number(newAge), Phone_Number_Driver: newPhoneNumber,speed:newSpeed,newlatitude:newlatitude,newlongitude:newlongitude,devicebatterypercentage:batterypercentage})
            await addDoc(VehicleCollectionRef, { DriverName: newFirstName, vehicleid: newLastName, Vehicle_Wheel_count: Number(newAge), Phone_Number_Driver: newPhoneNumber,speed:newSpeed,newlatitude:newlatitude,newlongitude:newlongitude,devicebatterypercentage:batterypercentage});
        } else {
            console.log('Form submission failed due to validation errors.');
        }


    
  };



  const validateForm = (data) => {
    const errors = {};

    if (!newFirstName.trim()) {
        errors.drivername = 'Driver Name is required';
    } else if (newFirstName.length < 4) {
        errors.drivername = 'Driver Name must be at least 4 characters long';
    }

    if (!newLastName.trim()) {
        errors.vehicleid = 'VehicleID is required';
    } 

    if (!Number(newAge)) {
        errors.newage = 'Vehicle_Wheel_count is required';
    } 

    if(!newPhoneNumber.trim()){
      errors.phonenumber = 'Phone_Number_Driver is required';
    }

  

    return errors;
};




  const CheckVehicleIDExist = async (vehicleid_params) => {
          const userRef = query(collection(db, "Vehicle&Driver"), where("vehicleid", "==", vehicleid_params));
          const findUsers = await getDocs(userRef);
          setvehicleidexist(findUsers.size>0);
  }



  

    return(

      <div className="container">

<div class=" container jumbotron">
    <h3>Add Vehicle & Driver</h3>
    </div>
            <form>
    <div class="row">
    <label for="name" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-form-label">Driver Name</label>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <input type="name" class="form-control" id="name" placeholder='Enter Driver Name' onChange={(event) => {setNewFirstName(event.target.value);}} />

      {errors.drivername && (
                        <span className="error-message">
                            {errors.drivername}
                        </span>
                    )}
      
    </div>
     </div>

     <div class="row">
    <label for="name" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-form-label">VehicleID</label>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <input type="name" class="form-control" id="name" placeholder='Enter VehicleID' onChange={(event) => {setNewLastName(event.target.value);}} />


      {errors.vehicleid && (
                        <span className="error-message">
                            {errors.vehicleid}
                        </span>
                    )}
                    
      </div></div>

      <div class="row">
    <label for="age" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-form-label">Vehicle Wheel Count</label>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <input type="number" class="form-control" id="age"  placeholder='Enter Vehicle Wheel Count' onChange={(event) => {setNewAge(event.target.value);}} />

      {errors.newage && (
                        <span className="error-message">
                            {errors.newage}
                        </span>
                    )}
      </div></div>

      <div class="row">
    <label for="pnumber" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-form-label">Driver Phone Number</label>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <input class="form-control" id="pnumber" placeholder='Enter Driver Phone Number' onChange={(event) => {setNewPhoneNumber(event.target.value);}} />

      {errors.phonenumber && (
                        <span className="error-message">
                            {errors.phonenumber}
                        </span>
                    )}
      

  </div></div>

      <button type='button' class="btn btn-primary" onClick={()=>{CheckVehicleIDExist(newLastName);if (!vehicleidexist){createEmployee()}else{existvehicleidshow(true)}}}>Add Vehicle and Driver</button><br></br><br></br>

      </form>


      <Dialog header="Vehicle Added" visible={showsave} position="center" style={{ width: '50vw' }} onHide={() => {if (!showsave) return; setshowsave(false) }} footer={(
              <center>
          <Button label="Ok" icon="pi" onClick={()=>{setshowsave(false); }} autoFocus className="btn btn-success" />
              </center>
          )} draggable={false} resizable={false}>
                      <p className="m-0">
                          Saved SuccessFully
                      </p>
      </Dialog>


      <Dialog header="VehicleID Already Existed" visible={existvehicleid} position="center" style={{ width: '50vw' }} onHide={() => {if (!existvehicleid) return; existvehicleidshow(true) }} footer={(
              <center>
          <Button label="Ok"  onClick={()=>{existvehicleidshow(false);}} autoFocus className="btn btn-success" />
              </center>
          )} draggable={false} resizable={false}>

<Message severity="error" text="Error Message" />
                     
      </Dialog>



        </div>
    );
}

export default Register;


