import React, { Component } from "react";
import classNames from 'classnames';
import "./MapGrid.css";
import WorkOrders from "./WorkOrders";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './truck.jpeg';

import {db} from '../../../firebase';

import {collection, getDocs } from 'firebase/firestore';

import { Link } from "react-router-dom"


class MapGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listView: true,
            gridView: false,
            value: 'John Doe',
            modalVisibility: false,
            Employee:[],
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

            return (this.state.listView ?<div className={btnClass123}>




<div class="card card-rem">
  <img class="card-img-top" src={logo} alt="Card image cap"/>
  </div>
  <div class="card-body">
    <h5 class="card-title">VehicleID: {person.vehicleid}</h5>
    <p class="card-text">Driver Name: {person.DriverName}</p>
    <Link to={"/noki-cargo/map/vehicle"}
state={{vehicleid:person.vehicleid}}>Access Location</Link>
  </div>
        </div>:<div className={btnClass123} >


<div class="card"  style={{margin:5}}>

    <div class="row">
        <div class="col">
  <img class="card-img-top style-height" src={logo} alt="Card image cap"/>
  </div>

  <div class="col">
  <div class="card-body">

    <h5 class="card-title">VehicleID: {person.vehicleid}</h5>
    <p class="card-text">Driver Name: {person.DriverName}</p>

    <Link to={"/noki-cargo/map/vehicle"}
state={{vehicleid:person.vehicleid}}>Access Location</Link>

    </div>
  </div>


  </div>
  </div>
        </div>
        
    
    )
        });

        return <div className="container stop-scroller">
            
            <div className="row row-eq-height gray-bg">
          
                <div className="col-sm-12 col-xs-12 col-lg-12 col-md-12 main-container">
                    <h2>Access Map for Each Added Vehicle</h2>
                    <div className="row" style={{marginBottom:4}}>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-sm-12 align-left grid-space">
                    <Link to={"/noki-cargo/map/allvehicle"}> <span onClick={this.handleList} id="list" className="btn btn-primary btn-xs">
            <i class="fa fa-location-arrow" aria-hidden="true"></i> All Vehicle In Single Map
            </span></Link></div>


                        <div className="col-lg-6 col-md-6 col-sm-12 col-sm-12 text-right grid-space">

            <div className="btn-group" >

            <span onClick={this.handleGrid} id="list" className="btn btn-primary btn-xs">
            <i class="fa fa-list" aria-hidden="true"></i> List
            </span>

            <span onClick={this.handleList} id="grid" className="btn btn-primary btn-xs">
            <i class="fa fa-th" aria-hidden="true"></i>Grid
            </span>

        </div>
                        </div>
                    </div>

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


export default MapGrid;
