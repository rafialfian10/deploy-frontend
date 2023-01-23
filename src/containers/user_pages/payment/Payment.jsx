// components
import { useState, useContext } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../../../context/userContext";

// component react bootstrap
import Moment from 'react-moment';
import Table from "react-bootstrap/Table";
import Popup from "../../../components/popup/Popup";

// api
import { API } from "../../../config/api";

// css
import "./Payment.scss";

// image
import icon from "../../../assets/img/icon.png";
import img_payment from "../../../assets/img/img-payment.png";

const Payment = () => {

  const [state] = useContext(UserContext)

  let no = 1

  const [popup, setPopup] = useState(false);

  const config = {
    headers: {
    'Content-type': 'multipart/form-data',
    },
  };

  let { data: transactions} = useQuery('transactionCache', async () => {
    const response = await API.get('/transactions', config);
    return response.data.data;
  });

  console.log(transactions)

  return (
    <>
      <Popup popup={popup} setPopup={setPopup} />
      {transactions?.map((transaction, i) => {
        return (
          <>
          {state?.user.name === transaction.user.name ? <>{transaction.status === "pending" ? <>
            <div className="payment-container" key={i}>
            <div className="content1">
              <img src={icon} alt="" />
              <div className="sub-content1">
                <h3 className="status">Booking</h3>
                <p className="date">Saturday, 22 July 2020</p>
              </div>
            </div>

            <div className="content2">
            <div className="info-payment">
              <h3 className="title">{transaction.trip.title}</h3>
              <p className="country">{transaction.trip.country.name}</p>
              <p className="status-payment">Waiting Payment</p>
            </div>

            <div className="info-tour">
            <div className="sub-info-tour">
              <div className="date">
                <h5>Date Trip</h5>
                <p><Moment format="YYYY-MM-DD">{transaction.trip.datetrip}</Moment></p>
              </div>

            <div className="accomodation">
              <h5>Accomodation</h5>
              <p>{transaction.trip.accomodation}</p>
            </div>
            </div>
            <div className="sub-info-tour">
              <div className="duration">
                <h5>Duration</h5>
                <p>{transaction.trip.day} Day {transaction.trip.night} Night</p>
              </div>
              <div className="transportation">
                <h5>Transportation</h5>
                <p>{transaction.trip.transportation}</p>
              </div>
            </div>
          </div>

          <div className="img-payment">
            <img src={img_payment} alt="" />
            <p>Upload Payment Proof</p>
          </div>
        </div>

              <Table striped bordered hover className="tables">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Full Name</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{no++}</td>
                    <td>{transaction.user.name}</td>
                    <td>{transaction.user.gender}</td>
                    <td>{transaction.user.phone}</td>
                    <td className="fw-bold">Qty</td>
                    <td className="fw-bold">: {transaction.qty}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="fw-bold">Total</td>
                    <td className="fw-bold text-danger">: IDR. {transaction.total.toLocaleString()}</td>
                  </tr>
                </tbody>
              </Table>
      
            </div>
            <div className="btn-pay">
              <button type="submit" onClick={() => setPopup(true)}>Pay</button>
            </div>
            </> : null}</> : null}
          </>
        )
      })}
     
    </>
  );
};

export default Payment;
