// componets
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Moment from "react-moment";

// componets resct bootstarp
import { Image } from "react-bootstrap";

// api
import { API } from "../../config/api";

// css
import "./Description.scss";

// image
import hotel from "../../assets/img/hotel.png";
import transportation from "../../assets/img/transportation.png";
import eat from "../../assets/img/eat.png";
import duration from "../../assets/img/duration.png";
import date from "../../assets/img/date.png";

const Description = () => {
  let { id } = useParams();
  id = parseInt(id);

  let { data: detailTrips } = useQuery("tripsCache", async () => {
    const response = await API.get(`/trip/${id}`);
    return response.data.data;
  });

  return (
    <>
      <div className="desc-container">
        <h5>Information Trip</h5>
        <div className="info">
          <div className="accomodation">
            <p>Accomodation</p>
            <div>
              <Image src={hotel} alt="" />
              <h6>{detailTrips?.accomodation}</h6>
            </div>
          </div>

          <div className="transportation">
            <p>Transportation</p>
            <div>
              <Image src={transportation} alt="" />
              <h6>{detailTrips?.transportation}</h6>
            </div>
          </div>

          <div className="eat">
            <p>Eat</p>
            <div>
              <Image src={eat} alt="" />
              <h6>{detailTrips?.eat}</h6>
            </div>
          </div>

          <div className="durations">
            <p>Duration</p>
            <div>
              <Image src={duration} alt="" />
              <h6>
                {detailTrips?.day} Day {detailTrips?.night} Night
              </h6>
            </div>
          </div>

          <div className="datetrip">
            <p>Date Trip</p>
            <div>
              <Image src={date} alt="" />
              <h6>
                <Moment format="DD MMM YYYY">{detailTrips?.datetrip}</Moment>
              </h6>
            </div>
          </div>
        </div>

        <div className="desc">
          <h5>Description</h5>
          <p>{detailTrips?.description}</p>
        </div>
      </div>
    </>
  );
};

export default Description;
