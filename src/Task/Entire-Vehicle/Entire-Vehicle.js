import React, { Component } from "react";
import classNames from 'classnames';
import "./MapGrid.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './truck.jpeg';

import {db} from '../../firebase';

import {collection, getDocs} from 'firebase/firestore';
import { Link } from 'react-router-dom';

import { Button } from 'primereact/button';


class EntireVehicle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listView: true,
            gridView: false,
            value: 'John Doe',
            modalVisibility: false,
            Employee:[],
            dataToSend:{ name: 'John', age: 30 }
        };
      }


    handleList = () => {
        this.setState({
            listView: true,
            gridView: false,
        })
    };

    handleGrid = () => {
        this.setState({
            listView: false,
            gridView: true,
        })
    };

    showModal = () => {
        this.setState({
            modalVisibility: true,
        })
    };

    hideModal = () => {
        this.setState({
            modalVisibility: false,
        })
    };
    
    handleSave = (event) => {
        this.setState({
            value: "save",
            modalVisibility: false,
        });
    };

    render() {


        let btnClass = classNames('item', {
            'list-group-item': this.state.listView,
            'grid-group-item': this.state.gridView,
        });

        const  VehicleCollectionRef = collection(db, "Vehicle&Driver");

        const getEmployee = async () => {

            const data = await getDocs(VehicleCollectionRef);
            
            this.setState({
              Employee:data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            });
           
      
           };
      
           getEmployee();



        let rows = this.state.Employee.map(person => {

            let btnClass123 = classNames('',{
                'col-xs-12 col-sm-12 col-md-4 col-lg-4 ': this.state.listView,
                '': this.state.listView,
            });

            return (<div className={btnClass123}>

<div class="card card-rem">
  <img class="card-img-top" src={logo} alt="Card image cap"/>
  </div>

  <div class="card-body">
    <h5 class="card-title">VehicleID: {person.vehicleid}</h5>
    <p class="card-text">Driver Name: {person.DriverName}</p>
  </div>
  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{margin:10}}>

  <Link to={"/noki-cargo/components/assigntrip"}
state={{vehicleid:person.vehicleid}}>

<button type='button' className="col-lg-6 col-md-6 col-sm-12 col-xs-12 btn btn-success " style={{padding:3}}>
Assign Trip</button>
</Link>


<Link to={"/noki-cargo/components/viewtrip/viewvehicletrip"}
state={{vehicleid:person.vehicleid}}><button type='button' className="btn btn-primary col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{padding:3}}>View Trip</button></Link>



<Link to={"/noki-cargo/add-fuel"}
state={{vehicleid:person.vehicleid}}><button type='button' className="col-lg-6 col-md-6 col-sm-12 col-xs-12 btn btn-success" style={{padding:3}}>Add Fuel</button></Link>



<Link to={"/noki-cargo/components/viewtrip/viewvehiclefuel"}
state={{vehicleid:person.vehicleid}}><button type='button' className="col-lg-6 col-md-6 col-sm-12 col-xs-12 btn btn-primary" style={{padding:3}}>View Fuel</button></Link>



<Link to={"/noki-cargo/add-maintainance"}
state={{vehicleid:person.vehicleid}}><button type='button' className="btn btn-success col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{padding:3}}>Add Maintainance</button></Link>



<Link to={"/noki-cargo/components/viewMaintainance/viewvehicleMaintainance"}
state={{vehicleid:person.vehicleid}}><button type='button' className="btn btn-primary col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{padding:3}}>View Maintainance</button></Link>


</div>


        </div>
        
   
        
    )
        });

        return <div className="container">
            
            <div className="row">


            <h2>Entire Vehicle</h2>

                <div className="col-sm-12 col-xs-12 col-lg-12 col-md-12 main-container">

                    <div className={btnClass}>
                        <div className="row auto-clear">
                            {rows}
                        </div>
                    </div>

                </div>


            </div>
        </div>

    }



}


export default EntireVehicle;
