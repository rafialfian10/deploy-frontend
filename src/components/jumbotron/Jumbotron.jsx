// component
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

// css
import './Jumbotron.scss'

// image
import hibiskus from '../../assets/img/hibiscus.png'

const Jumbotron = ({search, handleSearch}) => {
    
    return (
        <>
            <div className="jumbotron-container">
                <h1 className="title1">Explore</h1>
                <h1 className="title2">your amazing city together</h1>
                <p>Find great place to holiday</p>
                <InputGroup className="search" size="xs">
                    <Form.Control className="input-search" aria-label="Recipient's username" placeholder="Search..." aria-describedby="basic-addon2" onChange={(value) => handleSearch(value)} value={search}/>
                    <Button id="button-addon2" className="btn-search">Search</Button>
                </InputGroup>
                <img src={hibiskus} alt="" className='hibiscus' />
            </div>
        </>
    )
}

export default Jumbotron;