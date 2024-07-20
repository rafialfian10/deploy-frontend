// components
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { countries } from "countries-list";

// API
import { API } from "../../../config/api";

// css
import "./AddCountry.scss";
import Swal from "sweetalert2";

const AddCountry = ({ modalApproved, setModalApproved }) => {
  const navigate = useNavigate();

  // buat usestate untuk menampung data sementara
  const [form, setForm] = useState({
    name: "",
  });

  // state error
  const [error, setError] = useState({
    name: "",
  });

  // function handlechange data di form
  const handleChange = (country) => {
    setForm({ ...form, name: country });
  };

  // handle submit
  const handleSubmit = useMutation(async (e) => {
    e.preventDefault();
    try {
      // konfigurasi file
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      const messageError = {
        name: "",
      };

      // validasi form title
      if (form.name === "") {
        messageError.name = "Country must be filled out";
      } else {
        messageError.name = "";
      }

      // Convert country code menjadi full country name
      const countryName = countries[form.name]?.name || "";

      // jika semua message error kosong
      if (messageError.name === "") {
        // form data
        const formData = new FormData();
        formData.append("name", countryName);

        // Insert trip data
        const response = await API.post("/country", formData, config);
        console.log("Response :", response);

        if (response.status === 200) {
          setModalApproved(false);
          Swal.fire({
            text: "Country successfully added",
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#3cb371",
          });

          setForm({
            name: "",
          });
          navigate("/incom_trip");
        }
      } else {
        setError(messageError);
      }
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <>
      <Modal show={modalApproved} onHide={() => setModalApproved(false)}>
        <Modal.Body>
          <Form>
            <Form.Group
              className="form-input mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Country</Form.Label>
              <ReactFlagsSelect
                className="form-input flag-input"
                name="name"
                selected={form.name}
                onSelect={handleChange}
              />
            </Form.Group>
            {error.name && !form.name.trim() && (
              <Form.Text className="text-danger">{error.name}</Form.Text>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            className="text-light"
            type="submit"
            onClick={(e) => handleSubmit.mutate(e)}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddCountry;
