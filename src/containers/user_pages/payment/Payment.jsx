/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
// components
import { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "react-query";
import { UserContext } from "../../../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "../../../components/popup/Popup";

// component react bootstrap
import Moment from "react-moment";
import Swal from "sweetalert2";
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

  const navigate = useNavigate();

  let { id } = useParams();
  id = parseInt(id);

  const [state] = useContext(UserContext);

  const [popup, setPopup] = useState(false);

  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  // get transactions
  let { data: transactionPending, refetch: refetchTransactionPending } =
    useQuery("transactionPendingCache", async () => {
      const response = await API.get("/transactionsbyuser", config);
      return response.data.data;
    });

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = "SB-Mid-client-xBHWdiuU4aVE9vOq";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleContinuePendingTransaction = useMutation(async (transaction) => {
    console.log(transaction);
    // const config = {
    //   method: "PATCH",
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("token"),
    //     "Content-type": "multipart/form-data",
    //   },
    // };

    let formData = new FormData();
    formData.append("counter_qty", transaction?.counter_qty);
    formData.append("total", transaction?.total);
    formData.append("tripId", transaction?.id);

    const response = await API.patch(
      `/transaction/${transaction?.id}`,
      formData
    );
    let token = response.data.data.token;

    if (response.data.code === 200) {
      window.snap.pay(token, {
        onSuccess: function (result) {
          Swal.fire({
            text: "Transaction success",
            icon: "success",
            confirmButtonText: "Ok",
          });
          navigate(`/profile/${id}`);
          window.location.reload();
        },
        onPending: function (result) {
          Swal.fire({
            text: "please make payment first",
            confirmButtonText: "Ok",
          });
          navigate(`/detail/${id}`);
        },
        onError: function (result) {
          Swal.fire({
            icon: "success",
            text: "cancel transaction successfully",
          });
          navigate(`/detail/${id}`);
        },
        onClose: function () {
          Swal.fire({
            text: "cancel transaction successfully",
            confirmButtonText: "Ok",
          });
        },
      });
    }
  });

  useEffect(() => {
    refetchTransactionPending();
  });

  return (
    <>
      <Popup popup={popup} setPopup={setPopup} />
      {transactionPending?.filter(
        (transaction) => transaction.status === "pending"
      ).length <= 0 ? (
        <>
          <h1 className="empty">Payment is Empty</h1>
        </>
      ) : (
        transactionPending?.map((transaction, i) => {
          {
            if (
              transaction?.user.name === state?.user.name &&
              transaction?.status === "pending"
            ) {
              return (
                <>
                  <div className="payment-container" key={i}>
                    <div className="content1">
                      <Image src={icon} alt="" />
                      <div className="sub-content1">
                        <h3 className="status">Booking</h3>
                        <Form.Text className="date">
                          <Moment format="DD MMM YYYY, h:mm:ss A">
                            {transaction?.booking_date}
                          </Moment>
                        </Form.Text>
                      </div>
                    </div>

                    <div className="content2">
                      <div className="info-payment">
                        <h3 className="title">{transaction?.trip.title}</h3>
                        <Form.Text className="country">
                          {transaction?.trip.country.name}
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
                              <Moment format="DD MMM YYYY, h:mm:ss A">
                                {transaction?.trip.datetrip}
                              </Moment>
                            </Form.Text>
                          </div>

                          <div className="accomodation">
                            <h5>Accomodation</h5>
                            <Form.Text>
                              {transaction?.trip.accomodation}
                            </Form.Text>
                          </div>
                        </div>
                        <div className="sub-info-tour">
                          <div className="duration">
                            <h5>Duration</h5>
                            <Form.Text>
                              {transaction?.trip.day} Day{" "}
                              {transaction?.trip.night} Night
                            </Form.Text>
                          </div>
                          <div className="transportation">
                            <h5>Transportation</h5>
                            <Form.Text>
                              {transaction?.trip.transportation}
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
                          <td>{transaction?.user.name}</td>
                          <td>{transaction?.user.gender}</td>
                          <td>{transaction?.user.phone}</td>
                          <td className="fw-bold">Qty</td>
                          <td className="fw-bold">
                            : {transaction?.counter_qty}
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td className="fw-bold">Total</td>
                          <td className="fw-bold text-danger">
                            : IDR. {transaction?.total.toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>

                  <div className="content-btn-pay-pending">
                    <Button
                      type="submit"
                      className="btn-pay-pending"
                      onClick={() => {
                        handleContinuePendingTransaction.mutate(transaction);
                      }}
                    >
                      Continue Pay
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
