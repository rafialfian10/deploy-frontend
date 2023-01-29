import {Nav, Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

// components
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useState } from "react";

// api
import { API } from "../../config/api";

// css
import "./Register.scss";

const Register = ({showReg, setShowReg, setShowLog, handleShowReg}) => {

  const navigate = useNavigate();
  
  const handleCloseReg = () => setShowReg(false);

  // Process register
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

  const HandleRegisterSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const body = JSON.stringify(formReg);

      const response = await API.post("/register", body, config);
      if (response.data.code === 200) {
          Swal.fire({
            text: 'Register successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
          })

      navigate("/");
      setShowReg(false);
      setShowLog(true);

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
      Swal.fire({
        text: 'Register failed',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      console.log(err);
    }
  });

  return (
    <>
      {/* <Login setShowReg={setShowReg}/> */}
      <Nav.Link className="register" onClick={handleShowReg}> Register </Nav.Link>
      <Modal show={showReg} onHide={handleCloseReg} className="modal-register" size="lg">
        <Modal.Body className="modal-body-register">
                <h1 className="title-register">Register</h1>
                <Form onSubmit={HandleRegisterSubmit.mutate}>
                <Form.Group className="form-group" controlId="formBasicEmail">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" name="name" onChange={HandleChangeRegister} />
                </Form.Group>
                <Form.Group className="form-group" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" onChange={HandleChangeRegister} />
                </Form.Group>
                <Form.Group className="form-group" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" onChange={HandleChangeRegister} />
                </Form.Group>
                <Form.Group className="form-group form-dropdown">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select aria-label="Default select example" name="gender" className="form-input" onChange={HandleChangeRegister} >
                    <option value=""></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="form-group" controlId="formBasicPassword">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" name="phone" onChange={HandleChangeRegister} />
                </Form.Group>
                <Form.Group className="form-group" controlId="formBasicEmail">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" name="address" onChange={HandleChangeRegister} />
                </Form.Group>
                <Button type="submit" className="button-submit">Submit</Button>                               
                </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Register