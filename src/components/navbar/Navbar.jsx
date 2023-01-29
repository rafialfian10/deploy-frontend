/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
// component
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useQuery } from "react-query";
import Login from "../login/Login";
import Register from "../register/Register";

// component react bootstrap
import {Container, Nav, Navbar, ButtonGroup, Dropdown, Image, Form} from "react-bootstrap";
import Swal from "sweetalert2";

// css
import "./Navbar.scss";

// images
import icon from "../../assets/img/icon.png";
import profile from "../../assets/img/profile-navbar.png";
import bill from "../../assets/img/bill.png";
import logout from "../../assets/img/logout.png";
import trip from "../../assets/img/trip.png";
import defaultPhoto from "../../assets/img/default-photo.png";
import country from "../../assets/img/country.png";
import admin from "../../assets/img/admin.png";

// api
import { API } from "../../config/api";

const Navbars = () => {

  const navigate = useNavigate();
  
  // user context
  const [state, dispatch] = useContext(UserContext);

  // Handle Login
  const [showLog, setShowLog] = useState(false);
  const handleShowLog = () => setShowLog(true);

  // Handle Register
  const [showReg, setShowReg] = useState(false);
  const handleShowReg = () => setShowReg(true);

  // function logout
  const HandleLogout = (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          text: 'Logout successfully'
       })

        dispatch({
          type: "LOGOUT",
        })
        navigate("/");
      }
    })
  };

   // get data user
   let { data: userProfile, refetch: refetchUserProfile} = useQuery('userProfileCache', async () => {
    const response = await API.get(`/user`);
    return response.data.data
  });

  useEffect(() => {
    userProfile && refetchUserProfile()
  });

  return (
    <>
      <Navbar bg="light" expand="lg" className="background-navbar container-fluid">
        <Container>
          <Navbar.Brand href="/">
            <Image src={icon} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto sub-navbar">
              {/* profile navbar */}
              {state.isLogin === true  ? (
                <>
                  {state.user.role === "admin" ? 
                    // dropdown admin
                    <Navbar.Brand>
                      {userProfile?.image !== "" ? (
                          <Image src={userProfile?.image} className="photo-profile" alt="" />
                        ) : (
                          <Image src={admin} className="photo-profile" alt="" />
                      )}
                      <Dropdown as={ButtonGroup} className="dropdown">
                        <Dropdown.Toggle split variant="success" id="dropdown-split-basic" className="toggle-navbar"/>
                        <Dropdown.Menu className="menu-dropdown">
                          <Dropdown.Item onClick={() => navigate(`/incom_trip`)}>
                            <Image src={trip} alt="" />
                            <Form.Text className="text-dropdown">Trip</Form.Text>
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => navigate(`/list_country`)}>
                            <Image src={country} alt="" className="d-inline" />
                            <Form.Text className="text-dropdown">Country</Form.Text>
                          </Dropdown.Item>
                          <Dropdown.Item onClick={HandleLogout}>
                            <Image src={logout} alt="" />
                            <Form.Text className="text-dropdown">Logout</Form.Text>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Navbar.Brand>
                   : 
                    // dropdown user 
                    <Navbar.Brand>
                      <>
                        {/* photo profile */}
                        {userProfile?.image !== "" ? (
                            <Image src={userProfile?.image} className="photo-profile" alt="" />
                          ) : (
                            <Image src={defaultPhoto} className="photo-profile" alt="" />
                        )}                   
                        <Dropdown as={ButtonGroup} className="dropdown">
                              <Dropdown.Toggle split variant="success" id="dropdown-split-basic" className="toggle-navbar"/>
                              <Dropdown.Menu className="menu-dropdown">
                                <Dropdown.Item onClick={() => navigate(`/profile/${userProfile?.id}`)}>
                                  <Image src={profile} alt="" />
                                  <Form.Text className="text-dropdown">Profile</Form.Text>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate(`/payment/${userProfile?.id}`)}>
                                  <Image src={bill} alt="" />
                                  <Form.Text className="text-dropdown">Payment</Form.Text>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={HandleLogout}>
                                  <Image src={logout} alt="" />
                                  <Form.Text className="text-dropdown">Logout</Form.Text>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                        </Dropdown>
                      </>
                    </Navbar.Brand>
                  }
                </>
              ) : (
                <>
                  <Login showLog={showLog} setShowLog={setShowLog} handleShowReg={handleShowReg} handleShowLog={handleShowLog} />
                  <Register showReg={showReg} setShowReg={setShowReg} handleShowReg={handleShowReg} setShowLog={setShowLog} />
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbars;
