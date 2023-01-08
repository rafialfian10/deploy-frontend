/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
// components
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { API } from "../../../config/api";
import { useQuery } from "react-query";
import { useState } from "react";
import { useMutation } from "react-query";
import Moment from 'react-moment';

// css
import "./Profile.scss";

// image
import profile from "../../../assets/img/profile.png";
import map from "../../../assets/img/map.png";
import phone from "../../../assets/img/phone.png";
import message from "../../../assets/img/message.png";
import icon from "../../../assets/img/icon.png";
import qr_code from "../../../assets/img/qr-code.png";
import defaultPhoto from "../../../assets/img/default-photo.png";

const Profile = () => {

  let { id } = useParams();
  id = parseInt(id);

  let no = 1;

  // get data user
  let { data: users, refetch:refetchProfile } = useQuery("usersCache", async () => {
    const response = await API.get(`/users`);
    return response.data.data;
  });

  // get data transaction
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
    },
  };

  let { data: transactions } = useQuery("transactionsCaches", async () => {
    const response = await API.get(`/transactions`, config);
    return response.data.data;
  });

  // buat usestate untuk menampung data sementara
  let [form, setForm] = useState({
    image: "",
  });

  // handle submit image
  const handleSubmitImage = useMutation(async (e) => {
    try {
      // form data
      let formData = new FormData();
      formData.append("image", e.target.files[0]);

      // patch
      let response = await API.patch(`/user/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response)
      if(response.status === 200) {
        refetchProfile()
      }

    } catch (err) {
      console.log(err);
    }
  });

  return (
    <>
      {/* card profile */}
      <div className="profile-container">
        {users?.map((user, i) => {
          {
            if (user.id === id) {
              return (
                <>
                  <div className="content-profile1" key={i}>
                    <h2>Personal Info</h2>
                    <div className="profile">
                      <img src={profile} alt="" />
                      <div className="sub-profile">
                        <p className="info1">{user.name}</p>
                        <p className="info2">Full Name</p>
                      </div>
                    </div>
                    <div className="email">
                      <img src={message} alt="" />
                      <div className="sub-email">
                        <p className="info1">{user.email}</p>
                        <p className="info2">Email</p>
                      </div>
                    </div>
                    <div className="phone">
                      <img src={phone} alt="" />
                      <div className="sub-phone">
                        <p className="info1">{user.phone}</p>
                        <p className="info2">Mobile Phone</p>
                      </div>
                    </div>
                    <div className="address">
                      <img src={map} alt="" />
                      <div className="sub-address">
                        <p className="info1">{user.address}</p>
                        <p className="info2">Address</p>
                      </div>
                    </div>
                  </div>

                  <div className="content-profile2">
                    {user.image !== "http://localhost:5000/uploads/" ? (
                      <img src={user.image} alt="" />
                    ) : (
                      <img src={defaultPhoto} alt="" />
                    )}
                    <Form.Control
                      type="file"
                      id="image"
                      className="form-input input-image"
                      name="image"
                      onChange={handleSubmitImage.mutate}
                    />
                    <button
                      onClick={() => {
                        document.getElementById("image").click();
                      }}
                    >
                      Change Photo Profile
                    </button>
                    {/* </Form> */}
                  </div>
                </>
              );
            }
          }
        })}
      </div>
      {/* // end card profile */}

      {/* history trip */}
      <h1 className="title-history-trip">History Trip</h1>
      <>
        {transactions?.map((transaction, i) => {
          {
            if (transaction.user.name === localStorage.getItem("name")) {
              {
                if (
                  transaction.status === "success" ||
                  transaction.status === "failed"
                ) {
                  return (
                    <>
                      <div className="history-container" key={i}>
                        <div className="content1">
                          <img src={icon} alt="" />
                          <div className="sub-content1">
                            <h3 className="status">Booking</h3>
                            <p className="date">Saturday, 22 July 2020</p>
                          </div>
                        </div>

                        <div className="content2">
                          <div className="history-payment">
                            <h3 className="title">{transaction.trip.title}</h3>
                            <p className="country">
                              {transaction.trip.country.name}
                            </p>
                            {transaction.status === "success" && (
                              <p className="status-payment fw-bold text-light bg-succes">
                                {transaction.status}
                              </p>
                            )}
                            {transaction.status === "pending" && (
                              <p className="status-payment fw-bold text-light bg-warning">
                                {transaction.status}
                              </p>
                            )}
                            {transaction.status === "failed" && (
                              <p className="status-payment fw-bold text-light bg-danger">
                                {transaction.status}
                              </p>
                            )}
                          </div>

                          <div className="history-tour">
                            <div className="sub-history-tour">
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
                                <p>
                                  {transaction.trip.day} Day{" "}
                                  {transaction.trip.night} Night
                                </p>
                              </div>
                              <div className="transportation">
                                <h5>Transportation</h5>
                                <p>{transaction.trip.transportation}</p>
                              </div>
                            </div>
                          </div>

                          <div className="qr-code">
                            <img src={qr_code} alt="" />
                            <p>TCK0101</p>
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
                    </>
                  );
                }
              }
            }
          }
        })}
      </>
      {/* end hsitory trip */}
    </>
  );
};

export default Profile;
