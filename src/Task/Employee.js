import { useState } from 'react';
import './Employee.css';
import {db} from '../firebase';
import {collection,  addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import Manage from "./View_vehicle_driver";
import Home from "./Home";
import './styles.css';
import NavBar from './NavBar';
import Register from './Register_vehicle_driver';


function Employee() {

  const [newFirstName, setNewFirstName] = useState("")
  const [newLastName, setNewLastName] = useState("")
  const [newAge, setNewAge] = useState(0)
  const [newPhoneNumber, setNewPhoneNumber] = useState("")

const [Employee, setEmployee] = useState([]);
const  EmployeeCollectionRef = collection(db, "Employee");

const createEmployee = async () => {
await addDoc(EmployeeCollectionRef, { First_Name: newFirstName, Last_Name: newLastName, Age: Number(newAge), Phone_Number: newPhoneNumber});

};



  let component
  switch (window.location.pathname) {
    case "/noki-cargo/components/buttons":
      component = <Home />
      break;

      case "/noki-cargo/components/buttons/register":
        component = <Register />
      break;

      case "/noki-cargo/components/buttons/manage":
        component = <Manage />
    default:
      break;
  }
 


    const updateEmployee = async (id, Age) => {
    const empDoc = doc(db, "Employee", id)
    const newFields = {Age: Age + 1}
    await updateDoc(empDoc, newFields)
  };

     const deleteEmployee = async (id) => {
     const empDoc = doc(db, "Employee", id);
     await deleteDoc(empDoc);
  }
  
  return (
  <div>
    <NavBar />
    <div className="container">
    {component}
    </div>
    
    

  </div>
 
  );

};

export default Employee;
