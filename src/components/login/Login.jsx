/* eslint-disable no-unused-vars */
// component react bootstrap
import {Nav, Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

// components
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useMutation } from "react-query";
import { UserContext } from "../../context/userContext";

// api
import { API } from "../../config/api";

// css
import "./Login.scss";

const Login = ({ showLog, setShowLog, handleShowReg, handleShowLog }) => {
  
  const navigate = useNavigate();

    const [state, dispatch] = useContext(UserContext);

    const handleCloseLog = () => setShowLog(false);
 
    // process login
    const [formlogin, setFormLogin] = useState({
        email: "",
        password: "",
    });

    const HandleChangeLogin = (event) => {
        setFormLogin({ ...formlogin, [event.target.name]: event.target.value });
    };

  // function login submit
  const HandleLoginSubmit = useMutation(async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
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

        setShowLog(false)
        
        Swal.fire({
          text: 'Login successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })

        navigate("/")
      }
     

    } catch(err) {
  
      Swal.fire({
        text: 'Login failed (email / password incorrect)',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      console.log(err)
    } 
  });

  const handleShowRegister = () => {
    handleCloseLog()
    handleShowReg()
  }

    return (
        <>
            <Nav.Link className="login" onClick={handleShowLog}>Login</Nav.Link>
            <Modal show={showLog} onHide={handleCloseLog} className="modal-login" size="lg">
                <Modal.Body className="form-login">
                <h1 className="title-login">Login</h1>
                <Form>
                    <Form.Group className="form-group" controlId="formBasicEmail"> 
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" onChange={HandleChangeLogin} />
                    </Form.Group>
                    <Form.Group className="form-group" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={HandleChangeLogin} />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="button-submit" onClick={(e) => HandleLoginSubmit.mutate(e)}>Submit</Button>
                    <p>Don't have an account?<button className="btn-show-register" type="button" onClick={handleShowRegister}>Click here</button></p>
                </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Login