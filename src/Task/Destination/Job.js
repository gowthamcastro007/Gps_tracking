import { useState,useEffect } from "react"
import {db} from "../../firebase";
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc,query, where } from 'firebase/firestore';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import { Dropdown } from 'primereact/dropdown';



const Job=()=> {


  const [destinationlatitude, setlatitude] = useState(0);
  const [destinationlongitude, setlongitude] = useState(0);

  const [selectedCity,setSelectedCity]=useState(0);

  const [Employee, setEmployee] = useState([]);


  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
];


  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };



  const  VehicleCollectionRef = collection(db, "Vehicle&Driver");

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


    const getVehicle = async () => {
        const data = await getDocs(VehicleCollectionRef);
        setEmployee(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
       };
  
       getVehicle();


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
    <h1>Destination Distance Calculation</h1>
    </div>

    <div class="row">

<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
<div class="header">
    <h5>Manual view</h5>
    </div>
    
<div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <label for="name" class="col-lg-5 col-md-5 col-sm-12 col-xs-12 col-form-label">Destination Latitude</label>
    <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
      <input type="name" class="form-control" id="name" placeholder='Destination Latitude' />
    </div>
     </div>

     <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <label for="name" class="col-lg-5 col-md-5 col-sm-12 col-xs-12 col-form-label">Destination Longitude</label>
    <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
      <input type="name" class="form-control" id="name" placeholder='Destination Longitude'  />
      </div></div>

      <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <label for="name" class="col-lg-5 col-md-5 col-sm-12 col-xs-12 col-form-label">Vehicle ID</label>
    <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">

    <div className="card flex justify-content-center">
      <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
    editable placeholder="Select the Vehicle ID" className="w-full md:w-18rem" />
    </div>
</div>
</div>



<div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <button type="button" class="btn btn-success"  >
        Manual View
    
          </button>
</div>
</div>

</div>
<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">


<div class="header">
    <h5>Latitude update from Destinator phone</h5>
    </div>


    <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <label for="name" class="col-lg-5 col-md-5 col-sm-12 col-xs-12 col-form-label">Vehicle ID</label>
    <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">

    <div className="card flex justify-content-center">
      <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
    editable placeholder="Select the Vehicle ID" className="w-full md:w-18rem" />


   </div>
</div></div>


<div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <label for="name" class="col-lg-5 col-md-5 col-sm-12 col-xs-12 col-form-label">Destinator Name</label>
    <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">

    <div className="card flex justify-content-center">
      <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
     editable placeholder="Destinator Name" className="w-full md:w-18rem" />

</div>
</div></div>


<div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <button type="button" class="btn btn-success"  >
        Auto updated View
      
          </button>
</div>
</div>

    </div>

    </div>
    

      </form>
        </div>
    );
}

export default Job;






