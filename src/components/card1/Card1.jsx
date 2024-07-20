import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import "./Card1.scss";

import one from "../../assets/img/1.png";
import two from "../../assets/img/2.png";
import three from "../../assets/img/3.png";
import four from "../../assets/img/4.png";

const Card1 = () => {
  return (
    <>
      <CardGroup className="cards">
        <Card className="card">
          <Card.Img variant="top" src={one} />
          <Card.Body>
            <Card.Title className="title">Best Price Guarante</Card.Title>
            <Card.Text className="info">
              A small river named Duren flows by their place and supplies.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="card">
          <Card.Img variant="top" src={two} />
          <Card.Body>
            <Card.Title className="title">Travelers Love Us</Card.Title>
            <Card.Text className="info">
              A small river named Duren flows by their place and supplies.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="card">
          <Card.Img variant="top" src={three} />
          <Card.Body>
            <Card.Title className="title">Best Travel Agent</Card.Title>
            <Card.Text className="info">
              A small river named Duren flows by their place and supplies.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="card">
          <Card.Img variant="top" src={four} />
          <Card.Body>
            <Card.Title className="title">Our Dedicated Support</Card.Title>
            <Card.Text className="info">
              A small river named Duren flows by their place and supplies.
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
      <h1>Group Tour</h1>
    </>
  );
};

export default Card1;
