/* eslint-disable no-lone-blocks */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useContext } from "react";

// component react bootstrap
import { Image } from "react-bootstrap";

// css
import "./Navbar.scss";
import "./Login.scss";
import "./Register.scss";

// image
import icon from "../../assets/img/icon.png";
import leaf2 from "../../assets/img/leaf2.png";
import leaf3 from "../../assets/img/leaf3.png";
import photoProfile from "../../assets/img/photo-profile.png";
import profile from "../../assets/img/profile-navbar.png";
import bill from "../../assets/img/bill.png";
import logout from "../../assets/img/logout.png";
import trip from "../../assets/img/trip.png";
import defaultPhoto from "../../assets/img/default-photo.png";
import country from "../../assets/img/country.png";

// components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { UserContext } from "../../context/userContext";
import { useQuery } from "react-query";
import Swal from "sweetalert2";

// api
import { API } from "../../config/api";

const Navbars = () => {
  const navigate = useNavigate();

  // Login modal login
  const [showReg, setShowReg] = useState(false);

  const handleCloseReg = () => setShowReg(false);
  const handleShowReg = () => setShowReg(true);
  // End login modal login

  // modal register
  const [showLog, setShowLog] = useState(false);

  const handleCloseLog = () => setShowLog(false);
  const handleShowLog = () => setShowLog(true);
  // End modal register
  //---------------------------------------------------------------

  // function handle register
  const handleRegister = (e) => {
    e.preventDefault();
    setShowLog(false);
    setShowReg(true);
  };
  // end function handle register
  //-------------------------------------------------------------

  // Process register
  // const [message, setMessage] = useState(null);
  const [formReg, setFormReg] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    address: "",
    image: "",
  });

  const HandleChangeRegister = (event) => {
    setFormReg({ ...formReg, [event.target.name]: event.target.value });
  };

  // function register submit
  const HandleRegisterSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      // konfigurasi Content-type
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Data body
      const body = JSON.stringify(formReg);

      // masukkan data user kedalam database
      const response = await API.post("/register", body, config);

      // Notification
      if (response.data.code === 200) {

        // alert
        Swal.fire({
          text: 'Register successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })

        navigate("/");
        setShowReg(false);
        setShowLog(true);

        // kosongkan form
        setFormReg({
          name: "",
          email: "",
          password: "",
          gender: "",
          phone: "",
          address: "",
          image: "",
        });
      } 

    } catch (err) {
      // alert
        Swal.fire({
          text: 'Register failed',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      console.log(err);
    }
  });
  // end function register submit
  //---------------------------------------------------------------------

  // process login
  const [formlogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  // user context
  const [state, dispatch] = useContext(UserContext)

  const HandleChangeLogin = (event) => {
    setFormLogin({ ...formlogin, [event.target.name]: event.target.value });
  };

  // function login submit
  const HandleLoginSubmit = useMutation(async (e) => {
    e.preventDefault();
    try {
      // konfigurasi Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(formlogin);

      const response = await API.post("/login", body, config)

      if(response.data.code === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        })
      }
      setShowLog(false)
      // alert
      Swal.fire({
        text: 'Login successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      navigate("/")

    } catch(err) {
      // alert
      Swal.fire({
        text: 'Login failed (email / password incorrect)',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      console.log(err)
    }
    
  });
  // end function login submit

  // process logout
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
      // logout dan hapus token
      dispatch({
        type: "LOGOUT",
      })
        navigate("/");
      }
    })
  };
  // end process logout

  // get local data users
  let { data: users} = useQuery('usersCache', async () => {
    const response = await API.get(`/users`);
    return response.data.data;
  });

  return (
    <>
      <Navbar bg="light" expand="lg" className="background-navbar container-fluid">
        <Container>
          <Navbar.Brand href="/">
            <img src={icon} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto sub-navbar">
              {/* profile navbar */}
              {state.isLogin === true  ? (
                <>
                  {/* dropdown admin */}
                  {state.user.role === "admin" ? 
                    <Navbar.Brand>
                      <img src={photoProfile} alt=""  className="photo-profile"/>
                      <Dropdown as={ButtonGroup} className="dropdown">
                        <Dropdown.Toggle split variant="success" id="dropdown-split-basic" className="toggle-navbar"/>
                        <Dropdown.Menu className="menu-dropdown">
                          <Dropdown.Item onClick={() => navigate(`/incom_trip`)}>
                            <img src={trip} alt="" />
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => navigate(`/list_country`)}>
                            <img src={country} alt="" className="d-inline" />
                            <p className="text-country">Country</p>
                          </Dropdown.Item>
                          <Dropdown.Item onClick={HandleLogout}>
                            <img src={logout} alt="" />
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Navbar.Brand>
                   : 
                    // dropdown user 
                    <Navbar.Brand>
                      <>
                        {/* photo profile */}
                        {users?.map((user) => {
                          {if(user.id === state?.user.id) {
                            return (
                              <>
                                {user.image ? <Image src={user.image} className="photo-profile" alt="" /> : <Image src={defaultPhoto} className="photo-profile" alt=""/>}
                              </>
                            )
                          }}
                        })}
                        <Dropdown as={ButtonGroup} className="dropdown">
                              <Dropdown.Toggle split variant="success" id="dropdown-split-basic" className="toggle-navbar"/>
                              <Dropdown.Menu className="menu-dropdown">
                                <Dropdown.Item onClick={() => navigate(`/profile/${state?.user.id}`)}>
                                  <img src={profile} alt="" />
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate(`/payment/${state?.user.id}`)}>
                                  <img src={bill} alt="" />
                                </Dropdown.Item>
                                <Dropdown.Item onClick={HandleLogout}>
                                  <img src={logout} alt="" />
                                </Dropdown.Item>
                              </Dropdown.Menu>
                        </Dropdown>
                      </>
                    </Navbar.Brand>
                  }
                </>
              ) : (
                <>
                  {/* modal register */}
                  <Nav.Link className="register" onClick={handleShowReg}>Register </Nav.Link>
                  <Modal show={showReg} onHide={handleCloseReg} className="modal-register" size="lg">
                    <Modal.Body className="modal-body-register">
                      <h1 className="title-register">Register</h1>
                      <img src={leaf2} alt="" className="leaf2" />
                      <img src={leaf3} alt="" className="leaf3" />
                      <Form onSubmit={HandleRegisterSubmit.mutate}>
                        <Form.Group className="form-group" controlId="formBasicEmail">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control type="text" name="name" onChange={HandleChangeRegister}/>
                        </Form.Group>
                        <Form.Group className="form-group" controlId="formBasicEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" name="email" onChange={HandleChangeRegister}/>
                        </Form.Group>
                        <Form.Group className="form-group" controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" name="password" onChange={HandleChangeRegister}/>
                        </Form.Group>
                        <Form.Group className="form-group form-dropdown">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select aria-label="Default select example" name="gender" className="form-input" onChange={HandleChangeRegister}>
                            <option value=""></option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Form.Select>
                        </Form.Group>
                        <Form.Group className="form-group" controlId="formBasicPassword">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control type="text" name="phone" onChange={HandleChangeRegister}/>
                        </Form.Group>
                        <Form.Group className="form-group" controlId="formBasicEmail">
                          <Form.Label>Address</Form.Label>
                          <Form.Control type="text" name="address" onChange={HandleChangeRegister}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="button-submit">Submit</Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
                  {/* end modal register */}

                  {/* modal login */}
                  <Nav.Link className="login" onClick={handleShowLog}>Login</Nav.Link>
                  <Modal show={showLog} onHide={handleCloseLog} className="modal-login" size="lg">
                    <Modal.Body className="form-login">
                      <h1 className="title-login">Login</h1>
                      <img src={leaf2} alt="" className="leaf2" />
                      <img src={leaf3} alt="" className="leaf3" />
                      <Form>
                        <Form.Group className="form-group" controlId="formBasicEmail"> 
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" name="email" onChange={HandleChangeLogin}/>
                        </Form.Group>
                        <Form.Group className="form-group" controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" name="password" onChange={HandleChangeLogin}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="button-submit" onClick={(e) => HandleLoginSubmit.mutate(e)}>Submit</Button>
                        <p>Don't have an account?<button className="btn-show-register" onClick={handleRegister}>Click here</button></p>
                      </Form>
                    </Modal.Body>
                  </Modal>
                  {/* end modal login */}
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
