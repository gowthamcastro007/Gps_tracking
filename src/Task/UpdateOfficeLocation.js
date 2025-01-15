import { useState,useEffect } from "react"
import {db} from "../firebase";
import {collection, addDoc} from 'firebase/firestore';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

const UpdateOffice=()=> {



  const officelocationupdate = async () => {
    
  };


  const [getlatitude, setlatitude] = useState(0);
  const [getlongitude, setlongitude] = useState(0);

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
 

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, error, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, error, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setlatitude(latitude);
    setlongitude(longitude);

    localStorage.setItem('officelatitude', latitude);
    localStorage.setItem('officelongitude', longitude);

    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }


  function error() {
    console.log("Unable to retrieve your location");
  }


    return(

      <div className="container">
            <form>

    <div class="jumbotron">
    <h1>Update Office Location for Distance Calculation</h1>
    </div>
    
    <div class="row mb-3">
    <label for="name" class="col-sm-2 col-form-label">Office Latitude</label>
    <div class="col-sm-5">
      <input type="name" class="form-control" value={getlatitude} id="name" placeholder='Office Latitude' readOnly/>
    </div>
     </div>

     <div class="row mb-3">
    <label for="name" class="col-sm-2 col-form-label">Office Longitude</label>
    <div class="col-sm-5">
      <input type="name" class="form-control" value={getlongitude} id="name" placeholder='Office Longitude'  readOnly/>
      </div></div>

      <button type='button' class="btn btn-primary" onClick={officelocationupdate}>Update Office Location</button><br></br><br></br>


      </form>
        </div>
    );
}

export default UpdateOffice;






