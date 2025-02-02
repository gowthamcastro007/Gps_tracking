import { useState,useEffect } from "react"
import {db} from "../firebase";
import {collection, addDoc} from 'firebase/firestore';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';


import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const UpdateOffice=()=> {

  const [getlatitude, setlatitude] = useState();
  const [getlongitude, setlongitude] = useState();

  const [showsave ,setshowsave]=useState(false);
 

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            // navigator.geolocation.getCurrentPosition(success, error, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            // navigator.geolocation.getCurrentPosition(success, error, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);


  const [errors, setErrors] = useState({});


  const validateForm = (data) => {



    

    const errors = {};

    if (!getlatitude) {
        errors.latitude = 'Office latitude is required';
    }

    if (!getlongitude) {
        errors.longitude = 'Office Longitude is required';
    } 

    return errors;
};


const officelocationupdate = async () => {

  const newErrors = validateForm();
  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {

    setshowsave(true);

    localStorage.setItem('officelatitude', getlatitude);
    localStorage.setItem('officelongitude', getlongitude);

  } else {
    console.log('Form submission failed due to validation errors.');
}
    
};



    return(

      <div className="container">
            <form>

    <div class="jumbotron">
    <h1>Update Office Location for Distance Calculation</h1>
    <p>manual updation must for best accuracy</p>
    </div>
    
    <div class="row mb-3">
    <label for="name" class="col-sm-2 col-form-label">Office Latitude</label>
    <div class="col-sm-5">
      <input type="name" class="form-control" value={getlatitude} id="name" placeholder='Office Latitude' onChange={(event) => {setlatitude(event.target.value);}} />


      {errors.latitude && (
                        <span className="error-message">
                            {errors.latitude}
                        </span>
                    )}

    </div>
     </div>

     <div class="row mb-3">
    <label for="name" class="col-sm-2 col-form-label">Office Longitude</label>
    <div class="col-sm-5">
      <input type="name" class="form-control" value={getlongitude} id="name" placeholder='Office Longitude' onChange={(event) => {setlongitude(event.target.value);}} />

      {errors.longitude && (
                        <span className="error-message">
                            {errors.longitude}
                        </span>
                    )}
      </div></div>

      <button type='button' class="btn btn-primary" onClick={officelocationupdate}>Update Office Location</button><br></br><br></br>


      </form>



       <Dialog header="Office Location is updated Successfully" visible={showsave} position="center" style={{ width: '50vw' }} onHide={() => {if (!showsave) return; setshowsave(false) }} footer={(
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

export default UpdateOffice;






