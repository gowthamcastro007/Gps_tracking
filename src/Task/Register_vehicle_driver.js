import { useState } from "react"
import {db} from "../firebase";
import {collection, addDoc} from 'firebase/firestore';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import 'bootstrap/dist/css/bootstrap.css';
const Register=()=> {

    const [newFirstName, setNewFirstName] = useState("")
    const [newLastName, setNewLastName] = useState("")
    const [newAge, setNewAge] = useState(0)
    const [newPhoneNumber, setNewPhoneNumber] = useState("")

    const [newSpeed, setNewSpeed] = useState(0)
    const [newlatitude, setNewlatitude] = useState(11.519588)
    const [newlongitude, setNewlongitude] = useState(79.325157)

    const [officelatitude, setofficelatitude] = useState(0)
    const [officelongitude, setofficelongitude] = useState(0)

  const [Employee, setEmployee] = useState([]);
  const  VehicleCollectionRef = collection(db, "Vehicle&Driver");

  const createEmployee = async () => {
    await addDoc(VehicleCollectionRef, { DriverName: newFirstName, VehicleID: newLastName, Vehicle_Wheel_count: Number(newAge), Phone_Number_Driver: newPhoneNumber,speed:newSpeed,newlatitude:newlatitude,newlongitude:newlongitude});
  };


    return(

      <div className="container">
            <form>
    <div class="row mb-3">
    <label for="name" class="col-sm-2 col-form-label">Driver Name</label>
    <div class="col-sm-5">
      <input type="name" class="form-control" id="name" placeholder='Enter Driver Name' onChange={(event) => {setNewFirstName(event.target.value);}} />
    </div>
     </div>

     <div class="row mb-3">
    <label for="name" class="col-sm-2 col-form-label">VehicleID</label>
    <div class="col-sm-5">
      <input type="name" class="form-control" id="name" placeholder='Enter VehicleID' onChange={(event) => {setNewLastName(event.target.value);}} />
      </div></div>

      <div class="row mb-3">
    <label for="age" class="col-sm-2 col-form-label">Vehicle Wheel Count</label>
    <div class="col-sm-5">
      <input type="number" class="form-control" id="age"  placeholder='Enter Vehicle Wheel Count' onChange={(event) => {setNewAge(event.target.value);}} />
      </div></div>

      <div class="row mb-3">
    <label for="pnumber" class="col-sm-2 col-form-label">Driver Phone Number</label>
    <div class="col-sm-5">
      <input class="form-control" id="pnumber" placeholder='Enter Driver Phone Number' onChange={(event) => {setNewPhoneNumber(event.target.value);}} /><br /><br/>
  </div></div>

      <button type='button' class="btn btn-primary" onClick={createEmployee}>Add User</button><br></br><br></br>

      </form>
        </div>
    );
}

export default Register;


