// components
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useQuery, useMutation } from 'react-query';
import {Card, CardGroup, Dropdown} from 'react-bootstrap';
import Swal from "sweetalert2";

// api
import { API } from "../../../config/api";

// css
import './IncomTrip.scss'
import AddCountry from "../add_country/AddCountry";

// image
import palm from '../../../assets/img/palm.png'; 
import titik3 from '../../../assets/img/titik3.png'; 
import ModalUpdateTrip from "../modal_update_trip/ModalUpdateTrip";

const IncomTrip = () => {
    const navigate = useNavigate()

    // state value
    const [value, setValue] = useState()

    // state modal
    const [modalApproved, setModalApproved] = useState(false)
    const [modalUpdate, setModalUpdate] = useState(false)

    // state id trip
    const [tripId, setTripId] = useState()

    const config = {
        headers: {
        'Content-type': 'multipart/form-data',
        },
     };
    
    // get data trips
    let { data: trips, refetch:refetchTrip} = useQuery('tripsCache', async () => {
        const response = await API.get('/trips', config);
        return response.data.data;
    });

    // handle delete trip
    const handleDeleteTrip = useMutation( async (id) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
              }).then(async (result) => {
                if (result.isConfirmed) {

                // konfigurasi file
                const config = {
                    headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization': "Bearer " + localStorage.getItem("token")
                    },
                }
                    
                // delete trip data
                const response = await API.delete(`/trip/${id}`, config);
                if(response.status === 200) {
                    refetchTrip()
                }
                console.log("Response :", response);

                Swal.fire({
                    text: 'Country successfully deleted',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                    })
                
                    navigate('/incom_trip');
                }
              })
          } catch (err) {
              console.log(err)
          }
      })

    return (
        <>
         <ModalUpdateTrip modalUpdate={modalUpdate} setModalUpdate={setModalUpdate} value={value} tripId={tripId} refetchTrip={refetchTrip}/>
         <AddCountry modalApproved={modalApproved} setModalApproved={setModalApproved}/>
            <div className="title">
                <h4>Income Trip</h4>
                <div className="button-add">
                    <button onClick={() => setModalApproved(true)}>Add Country</button>
                    <button onClick={() => navigate('/add_trip')}>Add Trip</button>
                </div>
            </div>

        <img src={palm} alt="" className='palm' />
            {trips?.length !== 0 ? (
                    <CardGroup className="cards2">
                       {trips?.map((trip, i) => {
                        return (
                          <div className="card2" key={i}>
                                <Dropdown className="d-inline mx-2 dropdown-trip">
                                    <img src={titik3} alt="" className="titik3" />
                                    <Dropdown.Toggle id="dropdown-autoclose-true" className="toggle-trip">
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-menu-trip">
                                    <Dropdown.Item onClick={() => {setTripId(trip.id); setModalUpdate(true); setValue(trip)}}>Edit</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {setTripId(trip.id); handleDeleteTrip.mutate(trip.id)}}>Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                             
                              <div className='page'>
                                {trip.quota < 0 ? <p>{trip.quota = 0 }</p>: <p>{trip.quota}</p>}
                              </div>
                              <Card.Img variant="top" src={trip.image} />
                              <Card.Body>
                              <Card.Title className="card-title" onClick={() => navigate(`/detail/${trip.id}`)}>{trip.title}</Card.Title>
                              <div className="card-info">
                              <Card.Text className="price">{trip.price.toLocaleString()}</Card.Text>
                              <Card.Text className="country">{trip.country.name}</Card.Text>
                              </div>
                              </Card.Body>
                          </div>
                        )
                      })}
                    </CardGroup>
            ) : (
            <h1> Trip not found </h1>
            )}   
        </>
    )
}

export default IncomTrip