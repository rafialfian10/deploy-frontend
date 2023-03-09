// component react bootstrap
import Table from 'react-bootstrap/Table';

// component
import { useState, useEffect } from 'react';
import ModalApproved from '../modal_approved/ModalApproved';
import Paginations from '../../../components/pagination/Paginations';

// api
import { API } from '../../../config/api';

// css
import './ListTransaction.scss'

// image
// import search from '../../../assets/img/search.png'

function Admin() {

  let no = 1;

  const [modalApproved, setModalApproved] = useState(false);

  
  const [dataTransaction, setDataTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [halamanAktif, setHalamanAktif] = useState(1);
  const [dataPerHalaman] = useState(2);

  useEffect(() => {
      const fetchdata = async () => {
          setLoading(true)
          const response = await API.get(`/transactions`)
          setDataTransaction(response.data.data)
          setLoading(false)
      }

      fetchdata()
  }, [])
 
  // get current post data
  const indexLastPost = halamanAktif * dataPerHalaman
  const indexFirstPost = indexLastPost - dataPerHalaman 
  const currentPost = dataTransaction.slice(indexFirstPost, indexLastPost)

  if(loading) {
    return <h4>Loading...</h4>
  }

  // function handle pagination
  const paginate = (pageNumber) => setHalamanAktif(pageNumber)

  return (
    <>
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
            {/* <th>Action</th> */}
            </tr>
        </thead>
        <tbody>
          <>
            {currentPost?.map((transaction, i) => {
              return (
                <tr>
                  <td>{no++ + indexFirstPost}</td>
                  <td>{transaction.User.name}</td>
                  <td>{transaction.Trip.title}</td>
                  {/* <td>bca.jpg</td> */}
                  {transaction.status === "success" && <td className="text-success">{transaction.status}</td>}
                  {transaction.status === "pending" && <td className="text-warning">{transaction.status}</td>}
                  {transaction.status === "failed" && <td className="text-danger">{transaction.status}</td>}
                  {/* <td><img src={search} alt="" className="search" onClick={() => setModalApproved(true)} /></td> */}
                </tr>
              )
            })}
          </>
        </tbody>
        </Table>
        <Paginations dataPerHalaman={dataPerHalaman} halamanAktif={halamanAktif} setHalamanAktif={setHalamanAktif} totalData={dataTransaction.length} paginate={paginate}/>
        </>
  );
}

export default Admin;