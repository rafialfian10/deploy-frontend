// components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from "sweetalert2";
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ReactFlagsSelect from "react-flags-select";
import Modal from 'react-bootstrap/Modal';

// API
import { API } from '../../../config/api';

// css
import './AddCountry.scss'

const AddCountry = ({modalApproved, setModalApproved}) => {

  const navigate = useNavigate()

    // buat usestate untuk menampung data sementara
    const [form, setForm] = useState({
        name: "",
    });
  
    // state error
    const [error, setError] = useState({
        name: "",
    });
  
    // function handlechange data di form
    const handleChange = (e) => {
        setForm({...form,[e.target.name]:e.target.value})
    }
  
    // handle submit
    const handleSubmit = useMutation( async (e) => {
        e.preventDefault()
        try {
            // konfigurasi file
            const config = {
                headers: {
                  'Content-type': 'multipart/form-data',
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
            };
  
            const messageError = {
                name: "",
            }
  
            // validasi form title
            if (form.name === "") {
                messageError.name = "Country must be filled out";
            } else {
                messageError.name = ""
            }
  
            // jika semua message error kosong
            if(messageError.name === "") {
                // form data
                const formData = new FormData();
                formData.append('name', form.name);
  
                // Insert trip data
                const response = await API.post('/country', formData, config);
                console.log("Response :", response);
  
                Swal.fire({
                    text: 'Country successfully added',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
  
                navigate('/incom_trip');
              } else {
                  setError(messageError)
              }
          } catch (err) {
              console.log(err)
          }
      })

  return (
    <>
      <Modal show={modalApproved} onHide={() => setModalApproved(false)}>
        <Modal.Body>
          <Form>
            <Form.Group className="form-input mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" name="name" autoFocus onChange={handleChange}/>
              {/* <ReactFlagsSelect className="form-input flag-input" name="name" onChange={handleChange} selected={form} onSelect={(form) => {setForm(form); console.log("form",form)}}/> */}
            </Form.Group>
            {error.name && <Form.Text className="text-danger">{error.name}</Form.Text>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" className="text-light" type="submit" onClick={(e) => handleSubmit.mutate(e)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCountry