/* eslint-disable array-callback-return */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */

// components
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery,useMutation } from "react-query";
import History from "../history/History";

// component react bootstrap
import {Form, Image, Button} from "react-bootstrap";

// css
import "./Profile.scss";

// images
import profile from "../../../assets/img/profile.png";
import map from "../../../assets/img/map.png";
import phone from "../../../assets/img/phone.png";
import message from "../../../assets/img/message.png";
import defaultPhoto from "../../../assets/img/default-photo.png";

// api
import { API } from "../../../config/api";

const Profile = () => {

  let { id } = useParams();
  id = parseInt(id);

  let no = 1;

   // get data user
   let { data: user, refetch: refetchUser} = useQuery('userCache', async () => {
    const response = await API.get(`/user`);
    return response.data.data
  });

  useEffect(() => {
    user && refetchUser()
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
      if(response.data.code === 200) {
        refetchUser()
      }

    } catch (err) {
      console.log(err);
    }
  });

  return ( 
    <>
      <div className="profile-container">
        <div className="content-profile1">
          <h2>Personal Info</h2>
          <div className="profile">
            <Image src={profile} alt="" />
            <div className="sub-profile">
              <Form.Text className="info1">{user?.name}</Form.Text>
              <Form.Text className="info2">Full Name</Form.Text>
            </div>
          </div>
          <div className="email">
            <Image src={message} alt="" />
            <div className="sub-email">
              <Form.Text className="info1">{user?.email}</Form.Text>
              <Form.Text className="info2">Email</Form.Text>
            </div>
          </div>
          <div className="phone">
            <Image src={phone} alt="" />
            <div className="sub-phone">
              <Form.Text className="info1">{user?.phone}</Form.Text>
              <Form.Text className="info2">Mobile Phone</Form.Text>
            </div>
          </div>
          <div className="address">
            <Image src={map} alt="" />
            <div className="sub-address">
              <Form.Text className="info1">{user?.address}</Form.Text>
              <Form.Text className="info2">Address</Form.Text>
            </div>
          </div>
        </div>

        <div className="content-profile2">
          {user?.image !== "" ? (
            <Image src={user?.image} className="photo-profile2" alt="" />
          ) : (
            <Image src={defaultPhoto} className="photo-profile2" alt="" />
          )}
          <Form.Control type="file" id="image" className="form-input input-image" name="image" onChange={handleSubmitImage.mutate}/>
          <Button onClick={() => { document.getElementById("image").click()}} className="btn-image">Change Photo Profile</Button>
        </div>
      </div>    
      <History/>
    </>   
  );
};

export default Profile;
