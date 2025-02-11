import { useState,useEffect } from "react"
import {db} from "../../firebase";
import {collection, getDocs, addDoc,query,where} from 'firebase/firestore';

import '../styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const AddMapDestinator=()=> {


    const [newFirstName, setNewFirstName] = useState("")

    const [newPhoneNumber, setNewPhoneNumber] = useState("")

    const [newlatitude, setNewlatitude] = useState(0)

    const [newlongitude, setNewlongitude] = useState(0)

    const [vehicleid,setVehicleID]=useState([]);

    const [showsave ,setshowsave]=useState(false);

    const  VehicleCollectionRef = collection(db, "Vehicle&Driver");




    const [errors, setErrors] = useState({});




  const createDestinator = async () => {


     const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {

          setshowsave(true);
          const  DestinatorCollectionRef = collection(db, "Destinator&Vehicle");
          await addDoc(DestinatorCollectionRef, {DestinatorName: newFirstName,Destinator_Phone_Number: newPhoneNumber,destinatorlatitude:newlatitude,destinatorlongitude:newlongitude});
      
        } else {
            console.log('Form submission failed due to validation errors.');
        }

  };

  useEffect(() => {


    return () => {
        const getVehicleid = async () => {
            const data = await getDocs(VehicleCollectionRef);
            setVehicleID((data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))).map((vehicle)=>(vehicle.vehicleid)));
           };
      
           getVehicleid();

     
      };
  
       
  
    }, [] );





  const validateForm = (data) => {
    const errors = {};

    if (!newFirstName) {
        errors.destinator = 'Destinator Name is required';
    } else if (newFirstName.length < 4) {
        errors.destinator = 'Destinator Name  must be at least 4 characters long';
    }

    

    if(!newPhoneNumber){

      errors.phonenumber="Destintor Phone number is required"; 
    }

    if (!newlatitude) {
        errors.latitude = 'Destinator Latitude is required';
    } 

    if(!newlongitude){
      errors.longitude = 'Destinator Longitude is required';
    }

  

    return errors;
};

    


  


    return(

      <div className="container">



            <form>


         

    <div class="row ">
    <label for="name" class="col-xs-12 col-sm-12 col-md-6 col-lg-6  col-form-label">Destinator Name</label>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <input type="name" class="form-control" id="name" placeholder='Enter Destinator Name' onChange={(event) => {setNewFirstName(event.target.value);}} />


      {errors.destinator && (
                        <span className="error-message">
                            {errors.destinator}
                        </span>
                    )}
    </div>
     </div>


      <div class="row">
    <label for="name" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-form-label">Destinator Latitude</label>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <input type="name" class="form-control" id="name" placeholder='Enter Destinator latitude' onChange={(event) => {setNewlatitude(event.target.value);}} />

      {errors.latitude && (
                        <span className="error-message">
                            {errors.latitude}
                        </span>
                    )}
      </div></div>


      <div class="row">
    <label for="name" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-form-label">Destinator Longitude</label>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <input type="name" class="form-control" id="name" placeholder='Enter Destinator longitude' onChange={(event) => {setNewlongitude(event.target.value);}} />
      
      {errors.longitude && (
                        <span className="error-message">
                            {errors.longitude}
                        </span>
                    )}

      </div></div>

      <div class="row">
    <label for="pnumber" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-form-label">Destinator Phone Number</label>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <input class="form-control" id="pnumber" placeholder='Enter Driver Phone Number' onChange={(event) => {setNewPhoneNumber(event.target.value);}} />


      {errors.phonenumber && (
                        <span className="error-message">
                            {errors.phonenumber}
                        </span>
                    )}

  </div></div>

      <button type='button' class="btn btn-primary" onClick={()=>{createDestinator()}}>Add Destinator</button><br></br><br></br>

      </form>





      <Dialog header="Destinator Added Successfully" visible={showsave} position="center" style={{ width: '50vw' }} onHide={() => {if (!showsave) return; setshowsave(false) }} footer={(
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

export default AddMapDestinator;
