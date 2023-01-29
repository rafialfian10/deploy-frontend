/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
// components
import { useState, useContext } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../../../context/userContext";
import Popup from "../../../components/popup/Popup";

// component react bootstrap
import Moment from "react-moment";
import { Table, Button, Image, Form } from "react-bootstrap";

// api
import { API } from "../../../config/api";

// css
import "./Payment.scss";

// image
import icon from "../../../assets/img/icon.png";
import imgPayment from "../../../assets/img/img-payment.png";

const Payment = () => {
  let no = 1;

  const [state] = useContext(UserContext);

  const [popup, setPopup] = useState(false);

  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  let { data: transactions } = useQuery("transactionCache", async () => {
    const response = await API.get("/transactions", config);
    return response.data.data;
  });

  return (
    <>
      <Popup popup={popup} setPopup={setPopup} />
      {transactions?.filter((transaction) => transaction.status === "pending").length <= 0 ? (
        <>
          <h1 className="empty">Payment is Empty</h1>
        </>
      ) : (
        transactions?.map((transaction, i) => {
          {if (transaction.user.name === state?.user.name && transaction.status === "pending") {
              return (
                <>
                  <div className="payment-container" key={i}>
                    <div className="content1">
                      <Image src={icon} alt="" />
                      <div className="sub-content1">
                        <h3 className="status">Booking</h3>
                        <Form.Text className="date">
                          Saturday, 22 July 2020
                        </Form.Text>
                      </div>
                    </div>

                    <div className="content2">
                      <div className="info-payment">
                        <h3 className="title">{transaction.trip.title}</h3>
                        <Form.Text className="country">
                          {transaction.trip.country.name}
                        </Form.Text>
                        <Form.Text className="status-payment">
                          Waiting Payment
                        </Form.Text>
                      </div>

                      <div className="info-tour">
                        <div className="sub-info-tour">
                          <div className="date">
                            <h5>Date Trip</h5>
                            <Form.Text>
                              <Moment format="YYYY-MM-DD">
                                {transaction.trip.datetrip}
                              </Moment>
                            </Form.Text>
                          </div>

                          <div className="accomodation">
                            <h5>Accomodation</h5>
                            <Form.Text>
                              {transaction.trip.accomodation}
                            </Form.Text>
                          </div>
                        </div>
                        <div className="sub-info-tour">
                          <div className="duration">
                            <h5>Duration</h5>
                            <Form.Text>
                              {transaction.trip.day} Day{" "}
                              {transaction.trip.night} Night
                            </Form.Text>
                          </div>
                          <div className="transportation">
                            <h5>Transportation</h5>
                            <Form.Text>
                              {transaction.trip.transportation}
                            </Form.Text>
                          </div>
                        </div>
                      </div>

                      <div className="content-img-payment">
                        <Image
                          src={imgPayment}
                          alt=""
                          className="img-payment"
                        />
                        <Form.Text className="text-payment">
                          Upload Payment Proof
                        </Form.Text>
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
                          <td className="fw-bold text-danger">
                            : IDR. {transaction.total.toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>

                  <div className="btn-pay">
                    <Button type="submit" onClick={() => setPopup(true)}>
                      Pay
                    </Button>
                  </div>
                </>
              );
            }
          }
        })
      )}
    </>
  );
};

export default Payment;
