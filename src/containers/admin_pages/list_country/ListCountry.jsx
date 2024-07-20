import { useQuery, useMutation } from "react-query";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

// image
import editIcon from "../../../assets/img/edit.png";
import deleteIcon from "../../../assets/img/delete.png";

// css
import "./ListCountry.scss";

//api
import { API } from "../../../config/api";

const ListCountry = () => {
  let no = 1;

  // state country id
  const [countryId, setCountryId] = useState();

  // state value
  const [valueCountry, setValueCountry] = useState({
    name: "",
  });

  const [error, setError] = useState({
    name: "",
  });

  // state modal
  const [modal, setModal] = useState(false);

  const handleShowModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);

  // get data transaction
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  // get all countries
  let { data: countries, refetch: refetchCountry } = useQuery(
    "CountriesCache",
    async () => {
      const response = await API.get(`/countries`, config);
      return response.data.data;
    }
  );
  //---------------------------------------------------------------

  // update country
  let [form, setForm] = useState({
    name: "",
  });

  // function handlechange data di form
  const handleChange = (e, type) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setValueCountry({
      ...valueCountry,
      [type]: e.target.value,
    });
  };

  // handle update country
  let handleUpdateCountry = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      const messageError = {
        name: "",
      };

      // validasi name
      if (form.name === "") {
        messageError.name = "Country must be filled out";
      } else {
        messageError.name = "";
      }

      if (messageError.name === "") {
        // form data
        let formData = new FormData();
        formData.append("name", form.name);

        // patch
        let response = await API.patch(
          `/country/${countryId}`,
          formData,
          config
        );
        console.log(response);
        if (response.status === 200) {
          refetchCountry();
        }
        Swal.fire({
          icon: "success",
          text: "Country successfully updated",
        });
        handleCloseModal(true);
      } else {
        setError(messageError);
      }
    } catch (err) {
      console.log(err);
    }
  });

  // handle delete country
  // const handleDeleteCountry = useMutation(async (e) => {
  //   try {
  //     e.preventDefault()
  //     const config = {
  //       headers: {
  //         "Content-type": "multipart/form-data",
  //         Authorization: "Bearer " + localStorage.getItem("token"),
  //       }
  //     }
  //     // form data
  //     let formData = new FormData();
  //     formData.append('name', form.name);

  //     // patch
  //     let response = await API.delete(`/country/${countryId}`, formData, config);
  //     console.log(response)
  //     if(response.status === 200) {
  //       refetchCountry()
  //     }
  //     Swal.fire({
  //       icon: 'success',
  //       text: 'Delete successfully'
  //   })
  //     handleCloseModal(true)

  //   } catch (err) {
  //     console.log(err);
  //   }
  // });

  return (
    <>
      <h4>List Country</h4>
      <Table striped bordered hover className="table list-country">
        <thead>
          <tr>
            <th>No</th>
            <th>Country</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <>
            {countries?.map((country, i) => {
              return (
                <tr key={i}>
                  <td>{no++}</td>
                  <td>{country.name}</td>
                  <td className="text-center">
                    <img
                      src={editIcon}
                      alt=""
                      className="search"
                      onClick={() => {
                        setCountryId(country.id);
                        setValueCountry(country);
                        handleShowModal(true);
                      }}
                    />
                    {/* <img src={deleteIcon} alt="" className="search" onClick={() => {setCountryId(country.id)}} /> */}
                  </td>
                </tr>
              );
            })}
          </>
        </tbody>
      </Table>

      {/* modal country */}
      <Modal show={modal} onHide={handleCloseModal} className="modal-country">
        <Modal.Body className="form-country">
          <h2 className="title-country">Update country</h2>
          <Form onSubmit={(e) => handleUpdateCountry.mutate(e)}>
            <Form.Group className="form-group" controlId="formBasicEmail">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={(e) => handleChange(e, "name")}
                value={valueCountry.name}
              />
              {error.name && (
                <Form.Text className="text-danger">{error.name}</Form.Text>
              )}
            </Form.Group>
            <div className="btn-country">
              <Button
                variant="primary"
                className="btn-cancel"
                onClick={handleCloseModal}
              >
                cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="btn-add-country"
                onClick={() => handleUpdateCountry.mutate}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {/* end modal country */}
    </>
  );
};

export default ListCountry;
