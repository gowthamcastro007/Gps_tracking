import React, { Component } from "react";
import classNames from 'classnames';
import "./MapGrid.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './truck.jpeg';
import {db} from '../../firebase';
import {collection, getDocs} from 'firebase/firestore';

class OwnerOnly extends Component {

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

            return (<div className={btnClass123}>

<div class="card card-rem">
  <img class="card-img-top" src={logo} alt="Card image cap"/>
  </div>
  <div class="card-body">
    <h5 class="card-title">VehicleID: {person.vehicleid}</h5>
    <p class="card-text">Driver Name: {person.DriverName}</p>
    <p class="card-text">No of trip:5</p>
    <p class="card-text">No of Maintaince Bills:5</p>
    <p class="card-text">No of kilometer driven:1023 KM </p>
    <p class="card-text">Total Fuel Consumption Cost: 300$</p>
    <p class="card-text">Total Cost of Maintaince for vehicle: 400$</p>
    <p class="card-text">Profit: 120$</p>
    <p class="card-text">Loss: 0$</p>
  </div>
        </div>
        
    
    )
        });

        return <div className="container stop-scroller">
            
            <div className="row row-eq-height gray-bg">


            <h2>Owner Only Access for Profit and Loss</h2>


<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{marginBottom:5}}>
<div class="card card-rem">
</div>
<div class="card-body">

<div class="row">

<div class="col">
<h5 class="card-title">Overall Profit: 1200$</h5>

</div>

<div class="col">
<h5 class="card-title">Overall Loss: 0$</h5>
</div>

</div>

</div>
</div>

          
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


export default OwnerOnly;
