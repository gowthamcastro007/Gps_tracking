

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./StyleSheets/Sidebar.css";
import 'font-awesome/css/font-awesome.min.css';
function Sidebar(props) {
  const [active, setActive] = useState("");
  const [dropdownToggle, setDropDownToggle] = useState(false);
  useEffect(() => {
    setActive(props.location.pathname);
  }, [props.location.pathname, active]);

  return (
    <div
      className="sidebar-container border-right main-sidebar"
      id="sticky-sidebar"
    >
      <nav id="sidebar" className={props.toggleClass}>
        <ul className="list-unstyled components">
          <li
            className={active === "/noki-cargo/dashboard" ? "active" : null}
          >
            <a href="/noki-cargo/map">
              <div className="menu-icon">
                <i className="fa fa-home nav_icon" aria-hidden="true"></i>
              </div>
              <span className="menu-title" >GPS Tracking</span>
            </a>
          </li>

          <li
            className="menu-item-has-children dropdown"
            onClick={() => setDropDownToggle(!dropdownToggle)}
          >
            <a
              href="#"
              className="dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="menu-icon fa fa-cogs"></i>Driver and Device
            </a>
            <ul
              className={
                dropdownToggle
                  ? "sub-menu children dropdown-menu show"
                  : "sub-menu children dropdown-menu"
              }
            >
              <li
                className={
                  active === "/noki-cargo/components/buttons"
                    ? "active"
                    : null
                }
              >
                <a href="/noki-cargo/components/buttons">
                  <div className="menu-icon">
                    <i className="fa fa-puzzle-piece"></i>
                  </div>
                  <span className="menu-title">Add Vehicle & Driver</span>
                </a>
              </li>
              <li
                className={
                  active === "/noki-cargo/components/badge" ? "active" : null
                }
              >
                <a href="/noki-cargo/components/badge">
                  <div className="menu-icon">
                    <i className="fa fa-id-badge"></i>
                  </div>
                  <span className="menu-title">View Vehicle & Driver</span>
                </a>
              </li>
              <li
                className={
                  active === "/noki-cargo/components/card" ? "active" : null
                }
              >
                <a href="/noki-cargo/components/card">
                  <div className="menu-icon">
                    <i className="fa fa-id-card-o"></i>
                  </div>
                  <span className="menu-title">Office Location</span>
                </a>
              </li>


              <li
                className={
                  active === "/noki-cargo/components/add-destinator"
                    ? "active"
                    : null
                }
              >
                <a href="/noki-cargo/components/add-destinator">
                  <div className="menu-icon">
                    <i className="fa fa-tasks"></i>
                  </div>
                  <span className="menu-title">Add Destinator</span>
                </a>
              </li>

              <li
                className={
                  active === "/noki-cargo/components/view-destinator" ? "active" : null
                }
              >
                <a href="/noki-cargo/components/view-destinator">
                  <div className="menu-icon">
                    <i className="fa fa-spinner"></i>
                  </div>
                  <span className="menu-title">View Destinator</span>
                </a>
              </li>
              
            </ul>
          </li>

          <li
            className={active === "/dashboard/overspeed" ? "active" : null}
          >
            <a href="/dashboard/overspeed">
              <div className="menu-icon">
                <i className="fa fa-book nav_icon" aria-hidden="true"></i>
              </div>
              <span className="menu-title">OverSpeeding</span>
            </a>
          </li>



          <li
            className={active === "/dashboard/entire-vehicle" ? "active" : null}>
            <a href="/dashboard/entire-vehicle">
              <div className="menu-icon">
                <i className="fa fa-book nav_icon" aria-hidden="true"></i>
              </div>
              <span className="menu-title">Entire Vehicle</span>
            </a>
          </li>


          
          {/* <li className={active === "/widgets" ? "active" : null}>
            <a href="/widgets">
              <div className="menu-icon">
                <i className="fa fa-th-large nav_icon" aria-hidden="true"></i>
              </div>
              <span className="menu-title">Widgets</span>
            </a>
          </li> */}

          <li className={active === "/noki-cargo/fuelcost" ? "active" : null}>
            <a href="/noki-cargo/fuelcost">
              <div className="menu-icon">
                <i
                  className="fa fa-check-square-o nav_icon"
                  aria-hidden="true"
                ></i>
              </div>
              <span className="menu-title">Cost</span>
            </a>
          </li>


         
          <li className={active === "/noki-cargo/owner-only" ? "active" : null}>
            <a href="/noki-cargo/owner-only">
              <div className="menu-icon">
                <i className="fa fa-table nav_icon" aria-hidden="true"></i>
              </div>
              <span className="menu-title">Owner-Only Access</span>
            </a>
          </li>

          <li className={active === "/noki-cargo/pages" ? "active" : null}>
            <a href="/noki-cargo/pages">
              <div className="menu-icon">
                <i
                  className="fa fa-file-text-o nav_icon"
                  aria-hidden="true"
                ></i>
              </div>
              <span className="menu-title">FuelTheft alert</span>
            </a>
          </li>

          <li className={active === "/noki-cargo/charts" ? "active" : null}>
            <a href="/noki-cargo/charts">
              <div className="menu-icon">
                <i className="fa fa-bar-chart nav_icon" aria-hidden="true"></i>
              </div>
              <span className="menu-title">Report</span>
            </a>
          </li>

        
        </ul>

        {/* <ul className="list-unstyled CTAs">
              <li>
                <a
                  href="https://bootstrapious.com/tutorial/files/sidebar.zip"
                  className="download"
                >
                  Download source
                </a>
              </li>
              <li>
                <a
                  href="https://bootstrapious.com/p/bootstrap-sidebar"
                  className="article"
                >
                  Back to article
                </a>
              </li>
      </ul> */}
      </nav>
    </div>
  );
}


const withLocation = Component => props => {
  const location = useLocation();

  return <Component {...props} location={location} />;
};



export default withLocation(Sidebar);
