import { useState } from "react"
import {collection, addDoc} from 'firebase/firestore';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


const Cost=()=> {

    const [fuelcost, setFuelcost] = useState("")
    const [drivingcost, setdrivingcost] = useState("")
    const [driversalary,setDriverSalary] = useState("")

    const [showsave ,setshowsave]=useState(false);

    const [errors, setErrors] = useState({});

  const createEmployee = async () => {

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {

    setshowsave(true)
    localStorage.setItem('costoffuel', fuelcost);
    localStorage.setItem('costofdriving', drivingcost);

    }
    
  };


  const validateForm = (data) => {
    const errors = {};

    if (!fuelcost) {
        errors.fuelcost = 'Fuel Cost is required';
    } 

    if (!drivingcost) {
        errors.drivingcost = 'Driving cost is required';
    } 

    if (!driversalary) {
      errors.driversalary = 'Driver Salary is required';
    } 

  

    return errors;
};


    return(

      <div className="container">
            <form>

    <div class="row col-lg-12 col-md-12 col-sm-12">
    <label for="name" class="col-lg-6 col-md-6 col-sm-6 col-form-label">Cost of Fuel per Liter</label>
    <div class="col-lg-6 col-md-6 col-sm-6">

      <input type="name" class="form-control"  id="name" placeholder='Cost of Fuel' onChange={(event) => {setFuelcost(event.target.value);}} />



      {errors.fuelcost && (
                        <span className="error-message">
                            {errors.fuelcost}
                        </span>
                    )}

    </div>
     </div>

     <div class="row col-lg-12 col-md-12 col-sm-12">
    <label for="name" class="col-lg-6 col-md-6 col-sm-6 col-form-label">Driving Cost per KM</label>
    <div class="col-lg-6 col-md-6 col-sm-6">
      <input type="name" class="form-control" id="name" placeholder='Driving Cost' onChange={(event) => {setdrivingcost(event.target.value);}} />

      {errors.drivingcost && (
                        <span className="error-message">
                            {errors.drivingcost}
                        </span>
                    )}
      </div>
      </div>


      <div class="row col-lg-12 col-md-12 col-sm-12">
    <label for="name" class="col-lg-6 col-md-6 col-sm-6 col-form-label">Driver Salary Per Month/Day</label>
    <div class="col-lg-6 col-md-6 col-sm-6">
      <input type="name" class="form-control" id="name" placeholder='Driver Salary' onChange={(event) => {setDriverSalary(event.target.value);}} />
     
      {errors.driversalary && (
                        <span className="error-message">
                            {errors.driversalary}
                        </span>
                    )}
      </div>
      </div>

      <button type='button' class="btn btn-primary" onClick={()=>{createEmployee();}}>Add Details</button><br></br><br></br>






      </form>


      <Dialog header="Cost Added" visible={showsave} position="center" style={{ width: '50vw' }} onHide={() => {if (!showsave) return; setshowsave(false) }} footer={(
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

export default Cost;


