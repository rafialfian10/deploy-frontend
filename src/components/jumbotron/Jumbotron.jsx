// component
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
// import {useState} from 'react';
// import Card2 from '../card2/Card2';

// css
import './Jumbotron.scss'

// image
import hibiskus from '../../assets/img/hibiscus.png'

const Jumbotron = () => {
   
    // const [inputText, setInputText] = useState("");
    // let handleChange = (e) => {
    //   //convert input text to lower case
    //   var lowerCase = e.target.value.toLowerCase();
    //   setInputText(lowerCase);
    // };
    
    return (
        <>
            <div className="jumbotron-container">
                <h1 className="title1">Explore</h1>
                <h1 className="title2">your amazing city together</h1>
                <p>Find great place to holiday</p>
                <InputGroup className="search" size="xs">
                <Form.Control aria-label="Recipient's username" placeholder="Search..." aria-describedby="basic-addon2"/>
                <Button variant="outline-secondary" id="button-addon2" className="btn-search">Search</Button>
                </InputGroup>
                <img src={hibiskus} alt="" className='hibiscus' />
            </div>
            {/* <Card2 input={inputText} /> */}
        </>
    )
}

export default Jumbotron;