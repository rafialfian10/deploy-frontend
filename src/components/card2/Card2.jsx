/* eslint-disable array-callback-return */
// components react bootstrap
import {Card, CardGroup} from 'react-bootstrap';

// component
import { useNavigate } from 'react-router-dom'

// css
import './Card2.scss'

// image
import palm from '../../assets/img/palm.png' 


const Card2 = ({data, search})  => {

  const navigate = useNavigate()

  return (
        <>
          <img src={palm} alt="" className='palm' />
            {data?.length !== 0 ? (
                <CardGroup className="cards2">
                  {data?.filter(itemSearch => {
                    if(search === "") {
                      return itemSearch
                    } else if(itemSearch.country.name.toLowerCase().includes(search.toLocaleLowerCase())) {
                      return itemSearch
                    }
                  }).map((trip, i) => {
                    return (
                      <div className="card2" key={i}>
                        <div className='page'>
                          {trip?.quota < 0 ? <p> {trip.quota = 0 }</p> : <p>{trip?.quota}</p>}
                        </div>
                        <Card.Img variant="top" src={trip?.images[0]} />
                        <Card.Body>
                        <Card.Title className="card-title" onClick={() => navigate(`/detail/${trip?.id}`)}>{trip?.title}</Card.Title>
                          <div className="card-info">
                            <Card.Text className="price">Rp. {trip?.price.toLocaleString()}</Card.Text>
                            <Card.Text className="country">{trip?.country.name}</Card.Text>
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
  );
}

export default Card2;