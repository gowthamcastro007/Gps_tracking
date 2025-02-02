
import React, { Component } from "react";

import { Link, useNavigate } from 'react-router-dom'
import "./StyleSheets/Navbar.css";

import 'font-awesome/css/font-awesome.min.css';

import { auth } from "../../../../firebase";

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import UpdateProfile from "../../../UpdateProfile";

function withNavigation(Component) {
  return props => <Component {...props} navigate={useNavigate()} />;
}

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {

      visible:false, 
      visible_profile:false

    };
  }





  


  
  render() {
    return (
      
      <div className="header-section" id="sticky">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <Link to="/dashio-admin/dashboard">
              {" "}
              <div className="nav-title">Noki-Cargo</div>
            </Link>
            <div onClick={() => this.props.onToggleClick()}>
              <i className="fa fa-bars" aria-hidden="true"></i>
            </div>
            

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="nav navbar-nav justify-content-end">
                {/* <li className="nav-item active justify-content-end">
                  <a className="nav-link" href="/about">
                    Page
                  </a>
                </li> */}

              
                
            
                {/* <li className="nav-item">
                  <a className="nav-link" href="/index">
                    Page
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/page">
                    Page
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/component">
                    Page
                  </a>
                </li> */}
              </ul>
            </div>
            <a class="nav-item mr-3 nav-link p-3" onClick={()=>this.setState({ visible_profile: true })}><i class="fa fa-user" aria-hidden="true"></i>Profile</a>
            <a class="nav-item mr-3 nav-link p-3"  onClick={()=>this.setState({ visible: true })}> <i class="fa fa-sign-out" aria-hidden="true"></i>Logout</a>

          </div>
        </nav>


        <Dialog header="Header" visible={this.state.visible_profile} position="top" style={{ width: '50vw' }} onHide={() => {if (!this.state.visible_profile) return; this.setState({ visible_profile: false }); }} draggable={false} resizable={false}>
                <UpdateProfile />
        </Dialog>

  

       
        <Dialog header="Header" visible={this.state.visible} position="top" style={{ width: '50vw' }} onHide={() => {if (!this.state.visible) return; this.setState({ visible: false }); }} footer={(
        <div>
            <Button label="No" icon="pi pi-times" onClick={() =>  this.setState({ visible: false })} autoFocus className="btn btn-success" />
            <Button label="Yes" icon="pi pi-check" onClick={()=>{this.setState({ visible: false });    
; auth.signOut().then(function() {

  
  console.log('Signed Out');
}, function(error) {
  console.error('Sign Out Error', error);
}); }} className="btn btn-danger" />
        </div>
    )} draggable={false} resizable={false}>
                <p className="m-0">
                    Are you Sure want to Logout Application ?
                </p>
        </Dialog>


        
      </div>



    );
  }


  
}

export default withNavigation(Navbar);
