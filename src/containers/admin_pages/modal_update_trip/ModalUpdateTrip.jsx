/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from 'react-bootstrap/FloatingLabel';

// css
import './ModalUpdateTrip.scss'

// image
import dropdown from '../../../assets/img/img-dropdown.png'
import attache from '../../../assets/img/attache.png'

// api
import { API } from "../../../config/api";

const ModalUpdateTrip = ({modalUpdate, setModalUpdate, value, tripId, refetchTrip}) => {
    // console.log("value props:",value)

    const navigate = useNavigate()

    const [preview, setPreview] =useState()

    // get countries
    let { data: countries} = useQuery('userCache', async () => {
        const response = await API.get(`/countries`);
        return response.data.data;
    });

    //state form
    const [form, setForm] = useState({
        title: '',
        countryId: '',
        accomodation: '',
        transportation: '',
        eat: '',
        day: '',
        night: '',
        datetrip: '',
        price: '',
        quota: '',
        description: '',
        images: [],
    })

    useEffect(() => {
        setForm({
            title: value?.title,
            countryId: value?.country.id,
            accomodation: value?.accomodation,
            transportation: value?.transportation,
            eat: value?.eat,
            day: value?.day,
            night: value?.night,
            datetrip: value?.datetrip,
            price: value?.price,
            quota: value?.quota,
            description: value?.description,
            images: value?.images,
        })
    }, [value])

    // state error
    const [error, setError] = useState({
        title: '',
        countryId: '',
        accomodation: '',
        transportation: '',
        eat: '',
        day: '',
        night: '',
        datetrip: '',
        price: '',
        quota: '',
        description: '',
        images: '',
    });
    
    const handleChange = (e) => {
        if (e.target.name === "images") {
            // mengambil file yang diupload pada input file
            let filesImg = e.target.files;
      
            // Cek file upload apakah ada ? apakah formatnya sesuai (jpeg/png) ?
            if (filesImg.length > 0) {
                let arrImg = [];
      
                for (const indexImg in filesImg) {
                    if (filesImg[indexImg].type === "image/png" || filesImg[indexImg].type === "image/jpeg" || filesImg[indexImg].type === "image/jpg") {
                    // jika semua syarat terpenuhi, buatlah urlnya lalu simpan di object dengan key filesImg[indexImg]
                    arrImg.push(filesImg[indexImg]);
                    }
                }
      
                setForm((prevState) => {
                    return {
                    ...prevState,
                    [e.target.name]: [...prevState.images, ...arrImg],
                    };
                });
            }
        } else if (e.target.name === "price" || e.target.name === "quota") {
            setForm((prevState) => {
                return { ...prevState, [e.target.name]: parseInt(e.target.value) };
            });
        } else {
            setForm((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
        }
    };

    const handleUpdateTrip = useMutation( async (e) => {
        try {
            // konfigurasi file
            const config = {
                headers: {
                'Content-type': 'multipart/form-data',
                Authorization: "Bearer " + localStorage.getItem("token"),
                },
            };

            const messageError = {
                title: '',
                countryId: '',
                accomodation: '',
                transportation: '',
                eat: '',
                day: '',
                night: '',
                datetrip: '',
                price: '',
                quota: '',
                description: '',
                images: '',
              };

            // validasi form title
            if (form.title === "") {
                messageError.title = "Title must be filled out";
            } else {
                messageError.title = ""
            }

            // validasi form country
            if (form.countryId === "") {
                messageError.countryId = "Country must be filled out";
            } else {
                messageError.countryId = ""
            }

            // validasi form accomodation
            if (form.accomodation === "") {
                messageError.accomodation = "Accomodation must be filled out";
            } else {
                messageError.accomodation = ""
            }

            // validasi form transportation
            if (form.transportation === "") {
                messageError.transportation = "Transportation must be filled out";
            } else {
                messageError.transportation = ""
            }

            // validasi form eat
            if (form.eat === "") {
                messageError.eat = "Eat must be filled out";
            } else {
                messageError.eat = ""
            }

            // validasi form day
            if (form.day === "") {
                messageError.day = "Day must be filled out";
            } else if (parseInt(form.day) < 1) {
                messageError.day = "can't be less than 1"
            } else {
                messageError.day = ""
            }

            // validasi form night
            if (form.night === "") {
                messageError.night = "Day must be filled out";
            } else if (parseInt(form.night) < 1) {
                messageError.night = "can't be less than 1"
            } else {
                messageError.night = ""
            }

            // validasi form date trip
            if (form.datetrip === "") {
                messageError.datetrip = "Date must be filled out";
            } else {
                messageError.datetrip = ""
            }

            // validasi form price
            if (form.price === "") {
                messageError.price = "Price must be filled out";
            } else if (form.price < 0) {
                messageError.price = "can't be less than 0"
            } else {
                messageError.price = ""
            }

            // validasi form quota
            if (form.quota === "") {
                messageError.quota = "Quota must be filled out";
            } else if (parseInt(form.quota) < 1) {
                messageError.quota = "can't be less than 1"
            } else {
                messageError.quota = ""
            }

            // validasi form date description
            if (form.description === "") {
                messageError.description = "Description must be filled out";
            } else {
                messageError.description = ""
            }

            // validasi form date image
            if (form.images === "") {
                messageError.images = "Image must be filled out";
            } else {
                messageError.images = ""
            }

            if (
                // jika semua message error kosong
                messageError.title === "" &&
                messageError.countryId === "" &&
                messageError.accomodation === "" &&
                messageError.transportation === "" &&
                messageError.eat === "" &&
                messageError.day === "" &&
                messageError.night === "" &&
                messageError.datetrip === "" &&
                messageError.price === "" &&
                messageError.quota === "" &&
                messageError.description === "" &&
                messageError.images === ""
              ) {
                // form add data trip
                // let dateTrip = moment(form.datetrip).format('mm/dd/yyyy')
                const formData = new FormData();
                formData.append('title', form.title);
                formData.append('country_id', form.countryId);
                formData.append('accomodation', form.accomodation);
                formData.append('transportation', form.transportation);
                formData.append('eat', form.eat);
                formData.append('day', form.day);
                formData.append('night', form.night);
                formData.append('datetrip', form.datetrip);
                formData.append('price', form.price);
                formData.append('quota', form.quota);
                formData.append('description', form.description);
                form.images.forEach((img) => {
                    formData.append("images", img);
                });
                // formData.append('image', form.images[0]);

                // Insert trip data
                const response = await API.patch(`/trip/${tripId}`, formData, config);
                if(response.status === 200) {
                    refetchTrip()
                  }

                Swal.fire({
                    text: 'Trip successfully updated',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                setModalUpdate(false)
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
            <Modal show={modalUpdate} onHide={() => setModalUpdate(false)} className="modal-update-trip" size="lg">
                <Modal.Body className="modal-body-update-trip">
                    <h2 className="title-update-trip">Update Trip</h2>
                    <Form onSubmit={(e) => {e.preventDefault()
                    handleUpdateTrip.mutate(e)}}>
                    <Form.Group className="form-group">
                    <Form.Label>Title Trip</Form.Label>
                    <Form.Control className="form-input" name="title" type="text" value={form.title} onChange={(e) => handleChange(e, 'title')}/>
                    {error.title && <Form.Text className="text-danger">{error.title}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group form-dropdown">
                    <Form.Label>Country</Form.Label>
                    <img src={dropdown} alt="" className="dropdown"/>
                    <Form.Select aria-label="Default select example" name="countryId" value={form.countryId} className="form-input" onChange={(e) => handleChange(e, 'countryId')}>
                        <option value=""></option>
                        {countries?.map((country, i) => {
                            return (
                                <option value={country.id} key={i}>{country.name}</option>
                            )
                        })}
                    </Form.Select>
                    {error.countryId && <Form.Text className="text-danger">{error.countryId}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Accomodation</Form.Label>
                    <Form.Control className="form-input" name="accomodation" type="text" value={form.accomodation}  onChange={(e) => handleChange(e, 'accomodation')}/>
                    {error.accomodation && <Form.Text className="text-danger">{error.accomodation}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Transportation</Form.Label>
                    <Form.Control className="form-input" name="transportation" type="text" value={form.transportation}  onChange={(e) => handleChange(e, 'transportation')}/>
                    {error.transportation && <Form.Text className="text-danger">{error.transportation}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Eat</Form.Label>
                    <Form.Control className="form-input" name="eat" type="text" value={form.eat} onChange={(e) => handleChange(e, 'eat')}/>
                    {error.eat && <Form.Text className="text-danger">{error.eat}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Duration</Form.Label>
                    <div className="duration">
                        <div className="day-content">
                            <div className='sub-day-content'>
                                <Form.Control className="form-input day" name="day" type="number" value={form.day} onChange={(e) => handleChange(e, 'day')}/>
                                <Form.Label className="label-day">Day</Form.Label>
                            </div>
                            {error.day && <Form.Text className="text-danger">{error.day}</Form.Text>}
                        </div>

                        <div className="night-content">
                            <div className='sub-night-content'>
                                <Form.Control className="form-input night" name="night" type="number" value={form.night} onChange={(e) => handleChange(e, 'night')}/>
                                <Form.Label className="label-night">Night</Form.Label>
                            </div>
                            {error.night && <Form.Text className="text-danger">{error.night}</Form.Text>}
                        </div>
                    </div>
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Date Trip</Form.Label>
                    <Form.Control className="form-input" name="datetrip" type="date" value={form.datetrip} onChange={(e) => handleChange(e, 'datetrip')}/>
                    {error.datetrip && <Form.Text className="text-danger">{error.datetrip}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Price</Form.Label>
                    <Form.Control className="form-input" name="price" type="text" value={form.price} onChange={(e) => handleChange(e, 'price')}/>
                    {error.price && <Form.Text className="text-danger">{error.price}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Quota</Form.Label>
                    <Form.Control className="form-input" name="quota" type="number" value={form.quota}  onChange={(e) => handleChange(e, 'quota')}/>
                    {error.quota && <Form.Text className="text-danger">{error.quota}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Description</Form.Label>
                    <FloatingLabel controlId="floatingTextarea2">
                        <Form.Control as="textarea" className="form-input" name="description" value={form.description}  style={{ height: '100px' }} onChange={(e) => handleChange(e, 'description')}/>
                        {error.description && <Form.Text className="text-danger">{error.description}</Form.Text>}
                    </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Image</Form.Label>
                    <div className="img-upload">
                        <label for="images" className="form-input">
                            <p>Attache Here</p>
                            <img src={attache} alt=""/>
                        </label>
                        <Form.Control multiple className="form-input" id="images" name="images" type="file" onChange={(e) => handleChange(e, 'images')}/>
                    </div>
                    {error.images && <Form.Text className="text-danger">{error.images}</Form.Text>}
                    </Form.Group>

                    <Button variant="primary" type="submit" className='button-add-trip'>Update trip</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalUpdateTrip;