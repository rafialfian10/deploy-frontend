// components react bootstrap
import {Carousel, Image, Modal} from 'react-bootstrap'

// components
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useState } from 'react'


// image
import hibiscus from '../../assets/img/hibiscus.png'
import palm from '../../assets/img/palm.png'

// css
import './DetailImage.scss'

// api
import { API } from '../../config/api.js'

// // export data 
export let title = ""
export let country = ""

const DetailImage = () => {

    // Get parameter
    let {id}= useParams()
    id = parseInt(id)

    // state modal & image
    const [carousel, setCarousel] = useState(0);
    const [showImage, setShowImage] = useState(false);

    const handleSelect = (selectedIndex) => {
        setCarousel(selectedIndex);
    };
    
    let { data: detailTrip} = useQuery('tripsCache', async () => {
        const response = await API.get(`/trip/${id}`);
        return response.data.data;
    });

    return (
        <>
            <div className='detail-img-container'>
                <h1 className='title-detail'>{detailTrip?.title}</h1>
                <p className='title-detail-country'>{detailTrip?.country?.name}</p>
                <div className="thumbnail">
                    <Image src={detailTrip?.images[0]} className="img-thumbnail" alt="" onClick={() => {setShowImage(true); setCarousel(0)}}/>
                    <Image src={hibiscus} alt="" className='detail-hibiscus' />
                    <Image src={palm} alt="" className='detail-palm' />
                    <div className="img-thumbnail thumb">
                        <Image src={detailTrip?.images[1]} style={{width:'22vw'}} alt="" onClick={() => {setShowImage(true); setCarousel(1)}}/>
                        <Image src={detailTrip?.images[2]} style={{width:'22vw'}} alt="" onClick={() => {setShowImage(true); setCarousel(2)}}/>
                        <Image src={detailTrip?.images[3]} style={{width:'22vw'}} alt="" onClick={() => {setShowImage(true); setCarousel(3)}}/>
                    </div>
                </div>
            </div>
            {/* carousel modals */}
            <Modal show={showImage} centered onHide={() => {setShowImage(false)}} className="modal-carousel" dialogClassName="carousel-modals">
                <Carousel activeIndex={carousel} onSelect={handleSelect} className="container-carousel">
                {detailTrip?.images.length > 0 &&
                    detailTrip?.images.map((trip, i) => {
                        return (
                            <Carousel.Item key={i} className="sub-container-carousel">
                                <Image src={trip} alt="image-deleted" className="img-carousel"/>
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
            </Modal>
        </>
    )
}

export default DetailImage