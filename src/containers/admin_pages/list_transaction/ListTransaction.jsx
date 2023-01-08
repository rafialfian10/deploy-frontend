import ModalApproved from '../modal_approved/ModalApproved';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { API } from '../../../config/api';

// css
import './ListTransaction.scss'

// image
import search from '../../../assets/img/search.png'

function Admin() {

  const [modalApproved, setModalApproved] = useState(false)

  // get data transaction
  const config = {
    headers: {
    'Content-type': 'multipart/form-data',
    },
  };

  let { data: transactions} = useQuery('transactionsCaches', async () => {
    const response = await API.get(`/transactions`, config);
    return response.data.data;
  });

  return (
    <>
    {/* kirim props ke component ModalApproved */}
    <ModalApproved modalApproved={modalApproved} setModalApproved={setModalApproved}/>
     <h4>Incoming Transaction</h4>
     <Table striped bordered hover className="list-transaction">
        <thead>
            <tr>
            <th>No</th>
            <th>User</th>
            <th>Trip</th>
            {/* <th>Bukti Transfer</th> */}
            <th>Status Payment</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
          <>
            {transactions?.map((transaction, i) => {
              return (
                <tr>
                <td>{i + 1}</td>
                <td>{transaction.user.name}</td>
                <td>{transaction.trip.title}</td>
                {/* <td>bca.jpg</td> */}
                {transaction.status === "success" && <td className="text-success">{transaction.status}</td>}
                {transaction.status === "pending" && <td className="text-warning">{transaction.status}</td>}
                {transaction.status === "failed" && <td className="text-danger">{transaction.status}</td>}
                <td><img src={search} alt="" className="search" onClick={() => setModalApproved(true)} /></td>
                </tr>
              )
            })}
          </>
        </tbody>
        </Table>
        </>
  );
}

export default Admin;