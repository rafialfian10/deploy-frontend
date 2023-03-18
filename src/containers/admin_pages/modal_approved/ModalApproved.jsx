// components react bootstarp
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Swal from "sweetalert2";
import Moment from 'react-moment';

// components
import { useMutation } from 'react-query';

// api
import { API } from '../../../config/api';

// css
import './ModalApproved.scss'

// image
import icon from '../../../assets/img/icon.png' 
import img_payment from '../../../assets/img/img-payment.png' 

const ModalApproved = ({modalApproved, setModalApproved, currentOrder, refetchAllTransactions}) => {

    let no = 1;

    // handle approve order
    const handleApproveOrder = useMutation(async () => {
        try {
            // data status
            let payload = {
                status: "approve",
            };

            const response = await API.patch(`/transaction-admin/${currentOrder?.id}`, payload);
            console.log(response.data);
            if (response.data.code === 200) {
                Swal.fire({
                    title: "Transaction approved",
                    icon: "success",
                });
                refetchAllTransactions();
                setModalApproved(false)
            }
        } catch (e) {
            console.log(e);
        }
    });

    // handle reject order
    const handleCancleOrder = useMutation(async () => {
        try {
            let payload = {
                status: "reject",
            };

            const response = await API.patch(`/transaction-admin/${currentOrder?.id}`, payload);
            console.log(response.data);
            if (response.data.code === 200) {
                Swal.fire("Transaction has been rejected");
                setModalApproved(false)
                refetchAllTransactions();
            }
        } catch (e) {
            console.log(e);
        }
    });

    const RejectTransactionAlert = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success mx-2",
          cancelButton: "btn btn-danger mx-2",
        },
        buttonsStyling: false,
    });

  return (
    <>
      <Modal show={modalApproved} onHide={() => setModalApproved(false)} dialogClassName="modal-90w" className='modal-approved-container' aria-labelledby="example-custom-modal-styling-title" size="xl">
        <Modal.Body className='body-approved-container'>
        <>
            <div className="modal-approved-container">
                <div className="content-approved">
                    <img src={icon} alt="" />
                    <div className="sub-content-approved">
                        <h3 className="status-approved">Booking</h3>
                        <p className="date-approved"><Moment className='text-dark fw-bold' format="DD MMM YYYY, h:mm:ss A">{currentOrder?.booking_date}</Moment></p>
                    </div>
                </div>

                <div className="content2-approved">
                    <div className="info-payment-approved">
                        <h3 className="title-approved">{currentOrder?.trip.title}</h3>
                        <p className="country-approved">{currentOrder?.trip.country.name}</p>
                        <p className="status-payment-approved">
                            {currentOrder?.status === "pending" && (<Alert variant="warning" className="d-inline-block p-1 px-3 fw-bold text-light bg-warning">Waiting Payment</Alert>)}
                            {currentOrder?.status === "failed" && (<Alert variant="danger" className="d-inline-block p-1 px-3 fw-bold text-light bg-danger">Payment Failed</Alert>)}
                            {currentOrder?.status === "reject" && (<Alert variant="danger" className="d-inline-block p-1 px-3 fw-bold text-light bg-danger">Transaction Rejected</Alert>)}
                            {currentOrder?.status === "success" && (<Alert variant="warning" className="d-inline-block p-1 px-3 fw-bold text-light bg-success">Waiting Approved</Alert>)}
                            {currentOrder?.status === "approve" && (<Alert variant="success" className="d-inline-block p-1 px-3 fw-bold text-light bg-success">Transaction Approved</Alert>)}
                        </p>
                    </div>

                    <div className="info-tour-approved">
                        <div className="sub-info-tour-approved">
                            <div className="date-trip-approved">
                                <h5>Date Trip</h5>
                                <p><Moment format="DD MMM YYYY, h:mm:ss A">{currentOrder?.trip.datetrip}</Moment></p>
                            </div>
                            <div className="accomodation-approved">
                                <h5>Accomodation</h5>
                                <p>{currentOrder?.trip.accomodation}</p>
                            </div>
                        </div>
                        <div className="sub-info-tour-approved">
                            <div className="duration-approved">
                                <h5>Duration</h5>
                                <p>{currentOrder?.trip.day} Day {currentOrder?.night} Nights</p>
                            </div>
                            <div className="transportation-approved">
                                <h5>Transportation</h5>
                                <p>{currentOrder?.trip.transportation}</p>
                            </div>
                        </div>
                    </div>

                    <div className="content-img-payment-approved">
                        <img className='img-payment-approved' src={img_payment} alt="" />
                        <p className='text-payment-approved'>Upload Payment Proof</p>
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
                        <td>{currentOrder?.user.name}</td>
                        <td>{currentOrder?.user.gender}</td>
                        <td>{currentOrder?.user.phone}</td>
                        <td className="fw-bold">Qty</td>
                        <td className="fw-bold">: {currentOrder?.counter_qty}</td>
                        </tr>
                        <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="fw-bold">Total</td>
                        <td className="fw-bold text-danger">: IDR. {currentOrder?.total.toLocaleString()} </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className="btn-modal-approved">
                <button type="submit" className="cancel" onClick={() => {
                    RejectTransactionAlert.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Yes, reject this transaction!",
                        cancelButtonText: "No, cancel!",
                        reverseButtons: true,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            handleCancleOrder.mutate();
                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                            RejectTransactionAlert.fire(
                                "Cancelled",
                                "Transaction still waiting for your approval",
                                "error"
                            );
                        }
                  });
                }}>Reject</button>
                <button type="submit" className="approve" onClick={handleApproveOrder.mutate}>Approve</button>
            </div>                
        </>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalApproved