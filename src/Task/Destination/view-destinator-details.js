import {db} from '../../firebase';

import {collection, getDocs,  updateDoc, doc, deleteDoc,query,where } from 'firebase/firestore';
import { useState, useLayoutEffect } from 'react';
import '../styles.css';
import 'font-awesome/css/font-awesome.min.css';

import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Button } from 'primereact/button';

import { Dialog } from 'primereact/dialog';


export default function ViewDestinatorDetails(){

const [Employee, setEmployee] = useState([]);

const  DestinatorCollectionRef = collection(db, "Destinator&Vehicle");

const [showupdate,setshowupdate]=useState(false);

const [destinatorid,setdestinatorid]=useState("");

const [destinatorname,setdestinatorname]=useState("");

const [destinatorlatitude,setdestinatorlatitude]=useState("");

const [destinatorlongitude,setdestinatorlongitude]=useState("");

const [destinatorphonenumber,setdestinatorphonenumber]=useState("");


const [errors, setErrors] = useState({});


const validateForm = (data) => {
  const errors = {};

  if (!destinatorname) {
      errors.destinator = 'Destinator Name is required';
  } 

  if (!destinatorlatitude) {
      errors.destinatorlatitude = 'Destinator latitude is required';
  } 

  if(!destinatorlongitude){

    errors.destinatorlongitude="Destintor longitude is required"; 
  }

  if (!destinatorphonenumber) {
      errors.destinatorphonenumber = 'Destinator phone number is required';
  } 

  return errors;
};


const acceptvalue = (emp) => {
  deleteEmployee(emp.id);

};

const rejectvalue = (emp) => {

};


const confirm2 = (event) => {

  confirmPopup({
    group: 'headless',
      target: event.currentTarget,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      showupdate:false,
  });

};


const [map, setMap] = useState(new Map());

  const updateEmployee = async (id, Age) => {
    const empDoc = doc(db, "Destinator&Vehicle", id)
    const newFields = {Age: Age + 1}
    await updateDoc(empDoc, newFields)
  };

  const deleteEmployee = async (id) => {
     const empDoc = doc(db, "Destinator&Vehicle", id);
     await deleteDoc(empDoc);
  }


  

  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  



  let hashmap=new Map();
  

  useLayoutEffect(() => {


    const getEmployee = async () => {

        const data = await getDocs(DestinatorCollectionRef);

        data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).map(async (emp) => {

            const userRef = query(collection(db, "Vehicle&Driver"), where("vehicleid", "==", emp.mappedvehicleid));
            const findUsers = await getDocs(userRef);
           
            hashmap.set(emp.mappedvehicleid+"latitude",((findUsers.docs.map((doc) => ({ ...doc.data(), id: doc.id }))).map((vehicle)=>(vehicle.newlatitude))[0]))
            hashmap.set(emp.mappedvehicleid+"longitude",((findUsers.docs.map((doc) => ({ ...doc.data(), id: doc.id }))).map((vehicle)=>(vehicle.newlongitude))[0]))
            hashmap.set(emp.mappedvehicleid+"driver",((findUsers.docs.map((doc) => ({ ...doc.data(), id: doc.id }))).map((vehicle)=>(vehicle.DriverName))[0]))


            setMap(hashmap);


            });

            
        
        setEmployee(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        
       };
    

   
   
       getEmployee();


  }, [DestinatorCollectionRef] );
  


  const updateUser = async (destinatorid,destinatorname,destinatorlatitude,destinatorlongitude,destinatorphonenumber) => {

    const empDoc = doc(db, "Destinator&Vehicle", destinatorid)
    
    await updateDoc(empDoc,  {
      DestinatorName: destinatorname,
      Destinator_Phone_Number: destinatorphonenumber,
      destinatorlatitude:destinatorlatitude,
      destinatorlongitude:destinatorlongitude
     })

   }


    return (
      <div>


      
      {Employee.length>0 ? ( <div className='manage'>
   {Employee.map((emp) => {





      return  (

       
         
<ul className='list-group' style={{border:4
}}>



<div class="row">
  <div class="col">
      <div className='list-group-item'>
        
          <h6>Destinator(client) Name: {emp.DestinatorName}</h6>
          <h6>Destinator Phone Number : {emp.Destinator_Phone_Number}</h6>
          <h6>Destinator latitude : {emp.destinatorlatitude}</h6>
          <h6>Destinator longitude:{emp.destinatorlongitude}</h6>
          
          <h6>Distance from Destinator:{Math.round(getDistanceFromLatLonInKm(emp.destinatorlatitude,emp.destinatorlongitude,map.get(emp.mappedvehicleid+"latitude"),map.get(emp.mappedvehicleid+"longitude")))} KM</h6>
          <h6>Vehicle GPS Latitude:{map.get(emp.mappedvehicleid+"latitude")}</h6>
          <h6>Vehicle GPS Longitude:{map.get(emp.mappedvehicleid+"longitude")}</h6>
          <h6>Driver Name:{map.get(emp.mappedvehicleid+"driver")}</h6>

        </div>

        </div>

        <div class="col">

       
        {" "}
        <button type="button" class=" btn btn-warning"onClick={() => {

setdestinatorid(emp.id);
setdestinatorname(emp.DestinatorName);
setdestinatorlatitude(emp.destinatorlatitude);
setdestinatorlongitude(emp.destinatorlongitude);
setdestinatorphonenumber(emp.Destinator_Phone_Number);
          
          setshowupdate(true);
          
        }}>



          {" "}
          Update the Destinator</button><br /><br />


<Dialog header="Update Destinator" visible={showupdate} position="center" style={{ width: '50vw' }} onHide={() => {if (!showupdate) return; setshowupdate(false)}} footer={(
                            
                            <center>
                        <Button label="Update Details" icon="pi" onClick={()=>{ 
                          
                          const newErrors = validateForm();

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
                      
                          updateUser(destinatorid,destinatorname,destinatorlatitude,destinatorlongitude,destinatorphonenumber);
                          setshowupdate(false);
                        
                        } 
                          
                          
                          
                          }} className="btn btn-success" />  {"   "}
                        <Button label="Cancel" icon="pi" onClick={()=>{setshowupdate(false);}} className="btn btn-success" />
                            </center>
                        )} draggable={false} resizable={false}>
                          
                                    <form>

                                    <div class="row ">
    <label for="name" class="col-xs-12 col-sm-12 col-md-6 col-lg-6  col-form-label">Destinator ID</label>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <input value={destinatorid} type="name" class="form-control" id="name" readOnly />
    </div>
     </div>

    <div class="row ">
    <label for="name" class="col-xs-12 col-sm-12 col-md-6 col-lg-6  col-form-label">Destinator Name</label>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <input value={destinatorname} type="name" class="form-control" id="name" placeholder='Enter Destinator Name' onChange={(event) => {setdestinatorname( event.target.value) ;}} />


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
      <input value={destinatorlatitude} type="name" class="form-control" id="name" placeholder='Enter Destinator latitude' onChange={(event) => { setdestinatorlatitude(event.target.value); }} />

      {errors.destinatorlatitude && (
                        <span className="error-message">
                            {errors.destinatorlatitude}
                        </span>
                    )}

      </div></div>

      <div class="row">
    <label for="name" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-form-label">Destinator Longitude</label>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <input value={destinatorlongitude} type="name" class="form-control" id="name" placeholder='Enter Destinator longitude' onChange={(event) => { setdestinatorlongitude(event.target.value); }} />


      {errors.destinatorlongitude && (
                        <span className="error-message">
                            {errors.destinatorlongitude}
                        </span>
                    )}
      </div></div>

      <div class="row">
    <label for="pnumber" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-form-label">Destinator Phone Number</label>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <input value={destinatorphonenumber} class="form-control" id="pnumber" placeholder='Enter Driver Phone Number' onChange={(event) => { setdestinatorphonenumber(event.target.value);  }} />


      {errors.destinatorphonenumber && (
                        <span className="error-message">
                            {errors.destinatorphonenumber}
                        </span>
                    )}
  </div></div>

      </form>
</Dialog>



{/* <Dialog header="Update Destinator" visible={this.state.showupdate} position="center" style={{ width: '50vw' }} onHide={() => {if (!this.state.showupdate) return; this.setState({ showupdate: false }) }} footer={(
                            
                            <center>
                        <Button label="Update Details" icon="pi" onClick={()=>{ this.setState({ showupdate: false }) }} autoFocus className="btn btn-success" />
                        <Button label="Cancel" icon="pi" onClick={()=>{this.setState({ showupdate: false }) }} autoFocus className="btn btn-success" />
                            </center>
                        )} draggable={false} resizable={false}>
                          
                                    <form>
    <div class="row ">
    <label for="name" class="col-xs-12 col-sm-12 col-md-6 col-lg-6  col-form-label">Destinator Name</label>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <input value={emp.DestinatorName} type="name" class="form-control" id="name" placeholder='Enter Destinator Name' onChange={(event) => { this.setState({ destinator_name: event.target.value }) ;}} />
    </div>
     </div>


      <div class="row">
    <label for="name" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-form-label">Destinator Latitude</label>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <input value={emp.destinatorlatitude} type="name" class="form-control" id="name" placeholder='Enter Destinator latitude' onChange={(event) => {this.setState({ destinator_latitude: event.target.value });}} />
      </div></div>


      <div class="row">
    <label for="name" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-form-label">Destinator Longitude</label>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <input value={emp.destinatorlongitude} type="name" class="form-control" id="name" placeholder='Enter Destinator longitude' onChange={(event) => { this.setState({ destinator_longitude: event.target.value });}} />
      </div></div>

      <div class="row">
    <label for="pnumber" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-form-label">Destinator Phone Number</label>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <input value={emp.Destinator_Phone_Number} class="form-control" id="pnumber" placeholder='Enter Driver Phone Number' onChange={(event) => {this.setState({ destinator_phone_number: event.target.value });}} />
  </div></div>

      </form>
</Dialog> */}
          
         <ConfirmPopup
                                   group="headless"
                                   content={({message, acceptBtnRef, rejectBtnRef, hide}) => 
                                       <div className="bg-gray-900 text-white border-round p-3">
                                           <span>{message}</span>
                                           <div className="flex align-items-center gap-2 mt-3">
                                               <Button ref={acceptBtnRef} label="Delete" onClick={() => {acceptvalue(emp); hide();}} className="btn btn-danger"></Button>
                                               <Button ref={rejectBtnRef} label="Cancel" outlined onClick={() => {rejectvalue(emp); hide();}}className="btn btn-success"></Button>
                                           </div>
                                       </div>
                                   }
                               />
                             
                     <Button onClick={(event) => {confirm2(event,emp); }} icon="pi pi-times"  label='Delete' className="btn btn-danger"></Button>
                           
                   
          <br /><br />

          <button type="button" class="btn btn-success" onClick={() => {
            window.open("https://www.google.com/maps/dir/?api=1&origin="+(map.get(emp.mappedvehicleid+"latitude").toString())+","+(map.get(emp.mappedvehicleid+"longitude").toString())+"&destination="+(emp.destinatorlatitude)+","+(emp.destinatorlongitude)+"&travelmode=two-wheeler","_blank")

            
          }} >
            Go to Map find Distance Between Destinator & GPS Device 
          </button>
    
        </div>
        </div>
        
       
        </ul>

       
      ) ;
    })
  
  
  }


        </div>):<div class="container flex-container"><p>Destinator Details is empty.</p></div> }



             

</div>
    );
};