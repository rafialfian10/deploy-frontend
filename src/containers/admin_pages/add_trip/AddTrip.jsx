// components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Swal from "sweetalert2";
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from 'react-query';

// API
import { API } from '../../../config/api';

// css
import './AddTrip.scss'

// image
import dropdown from '../../../assets/img/img-dropdown.png'
import attache from '../../../assets/img/attache.png'


const AddTrip = () => {

    const navigate = useNavigate()

    // eslint-disable-next-line no-unused-vars
    const [preview, setPreview] = useState(null)

    // buat usestate untuk menampung data sementara
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

    // function handlechange data di form
    const handleChange = (e) => {
        if (e.target.name === "images") {
        // mengambil file yang diupload pada input file
        let filesImg = e.target.files;
        // console.log(filesImg);
        // console.log(filesImg.length);
        // console.log(typeof filesImg); // tipenya object
  
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

    // handle submit
    const handleSubmit = useMutation( async (e) => {
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
                // formData.append('image', form.image[0]);

                // Insert trip data
                const response = await API.post('/trip', formData, config);
                console.log("Response :", response);

                Swal.fire({
                    text: 'Trip successfully added',
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

    // get countries
    let { data: countries} = useQuery('userCache', async () => {
        const response = await API.get(`/countries`);
        return response.data.data;
    });

    return (
        <>
            <div className="add-trip-container">
                <h2 className="title-add-trip">Add Trip</h2>
                <Form className='form-add-trip' onSubmit={(e) => {e.preventDefault()
                 handleSubmit.mutate(e)}}>
                    <Form.Group className="form-group">
                    <Form.Label>Title Trip</Form.Label>
                    <Form.Control className="form-input" name="title" type="text" onChange={handleChange}/>
                    {error.title && <Form.Text className="text-danger">{error.title}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group form-dropdown">
                    <Form.Label>Country</Form.Label>
                    <img src={dropdown} alt="" className="dropdown"/>
                    <Form.Select aria-label="Default select example" name="countryId" className="form-input" onChange={handleChange}>
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
                    <Form.Control className="form-input" name="accomodation" type="text" onChange={handleChange}/>
                    {error.accomodation && <Form.Text className="text-danger">{error.accomodation}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Transportation</Form.Label>
                    <Form.Control className="form-input" name="transportation" type="text" onChange={handleChange}/>
                    {error.transportation && <Form.Text className="text-danger">{error.transportation}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Eat</Form.Label>
                    <Form.Control className="form-input" name="eat" type="text" onChange={handleChange}/>
                    {error.eat && <Form.Text className="text-danger">{error.eat}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Duration</Form.Label>
                    <div className="duration">
                        <div className="day-content">
                            <div className='sub-day-content'>
                                <Form.Control className="form-input day" name="day" type="number" onChange={handleChange}/>
                                <Form.Label className="label-day">Day</Form.Label>
                            </div>
                            {error.day && <Form.Text className="text-danger">{error.day}</Form.Text>}
                        </div>

                        <div className="night-content">
                            <div className='sub-night-content'>
                                <Form.Control className="form-input night" name="night" type="number" onChange={handleChange}/>
                                <Form.Label className="label-night">Night</Form.Label>
                            </div>
                            {error.night && <Form.Text className="text-danger">{error.night}</Form.Text>}
                        </div>
                    </div>
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Date Trip</Form.Label>
                    <Form.Control className="form-input" name="datetrip" type="date" onChange={handleChange}/>
                    {error.datetrip && <Form.Text className="text-danger">{error.datetrip}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Price</Form.Label>
                    <Form.Control className="form-input" name="price" type="text" onChange={handleChange}/>
                    {error.price && <Form.Text className="text-danger">{error.price}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Quota</Form.Label>
                    <Form.Control className="form-input" name="quota" type="number" onChange={handleChange}/>
                    {error.quota && <Form.Text className="text-danger">{error.quota}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Description</Form.Label>
                    <FloatingLabel controlId="floatingTextarea2">
                        <Form.Control as="textarea" className="form-input" name="description" style={{ height: '100px' }} onChange={handleChange}/>
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
                        <Form.Control multiple className="form-input" name="images" type="file" id="images" onChange={handleChange}/>
                    </div>
                    {error.images && <Form.Text className="text-danger">{error.images}</Form.Text>}
                    </Form.Group>

                    <Button variant="primary" type="submit" className='button-add-trip'>Add trip</Button>
                </Form>
            </div>
        </>
    )
}

export default AddTrip