/* eslint-disable array-callback-return */
/* eslint-disable no-lone-blocks */
// component
import { useQuery } from "react-query";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";

// component react bootstrap
import { Table } from "react-bootstrap";
import Moment from 'react-moment';

// api
import { API } from "../../../config/api";

// css
import './History.scss'

// images
import icon from "../../../assets/img/icon.png";
import qr_code from "../../../assets/img/qr-code.png";


const History = () => {

    let no = 1

    const [state] = useContext(UserContext)

    const config = {
        headers: {
        "Content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
        },
    };

    // get transaction
    let { data: transactions } = useQuery("transactionsCaches", async () => {
        const response = await API.get(`/transactions`, config);
        return response.data.data;
      });
    return (
        
        <>
            {/* history trip */}
            <h1 className="title-history-trip">History Trip</h1>
            <>
                {transactions?.map((transaction, i) => {
                {if (transaction.user.name === state?.user.name) {
                    {if (transaction.status === "success" || transaction.status === "failed") {
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
    )
}

export default History