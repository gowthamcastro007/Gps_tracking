import React, { Component } from "react";
import classNames from 'classnames';
import "./MapGrid.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './truck.jpeg';
import {db} from '../../firebase';
import {collection, getDocs} from 'firebase/firestore';
import { Link } from 'react-router-dom';

class ViewMaintaince extends Component {

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
                'col-xs-12 col-sm-12 col-md-4 col-lg-4 thumbnail-grid': this.state.listView,
                '': this.state.listView,
            });

            return (<div className={btnClass123}>

<div class="card card-rem">
  <img class="card-img-top" src={logo} alt="Card image cap"/>
  </div>
  <div class="card-body">

    <h5 class="card-title">VehicleID: {person.vehicleid}</h5>

    <p class="card-text">Driver Name: {person.DriverName}</p>

    <Link to={"/noki-cargo/components/viewMaintainance/viewvehicleMaintainance"}
state={{vehicleid:person.vehicleid}}>View Maintainance Details</Link>

  </div>
        </div>
        
    )
        });

        return <div className="container stop-scroller">

            <div className="row row-eq-height gray-bg">

            <h2>View Maintainance based on Vehicle ID</h2>

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


export default ViewMaintaince;
