// components
import Modal from "react-bootstrap/Modal";
import { useNavigate, useParams } from "react-router-dom";

// css
import "./Popup.scss";

const Popup = ({ popup, setPopup }) => {
  const { id } = useParams();

  const navigate = useNavigate();
  return (
    <>
      <Modal
        show={popup}
        onHide={() => setPopup(false)}
        size="xs"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-popup"
      >
        <Modal.Body className="body-popup">
          <p>
            Your payment will be confirmed within 1 x 24 hours To see orders
            click{" "}
            <p onClick={() => navigate(`/profile/${id}`)} className="popup">
              here
            </p>{" "}
            thank you
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Popup;
