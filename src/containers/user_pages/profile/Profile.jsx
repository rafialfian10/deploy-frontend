/* eslint-disable array-callback-return */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */

// components
import { useParams } from "react-router-dom";
import { API } from "../../../config/api";
import { useQuery } from "react-query";
import { useMutation } from "react-query";

// component react bootstrap
import {Form, Image} from "react-bootstrap";

// css
import "./Profile.scss";

// image
import profile from "../../../assets/img/profile.png";
import map from "../../../assets/img/map.png";
import phone from "../../../assets/img/phone.png";
import message from "../../../assets/img/message.png";
import defaultPhoto from "../../../assets/img/default-photo.png";
import History from "../history/History";

const Profile = () => {

  let { id } = useParams();
  id = parseInt(id);

  let no = 1;

  // get data user
  let { data: users, refetch: refetchProfile } = useQuery("usersCache", async () => {
    const response = await API.get(`/users`);
    return response.data.data;
  });

  refetchProfile()

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
        refetchProfile()
      }

    } catch (err) {
      console.log(err);
    }
  });

  return (
    <>
      {/* card profile */}
        {users?.map((user, i) => {
          {if(user.id === id) {
            return (
                <>
                  <div className="profile-container" key={i}>
                    <div className="content-profile1">
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
                      {user.image !== "" ? (
                        <Image src={user.image} alt="" /> 
                        ) : (
                        <Image src={defaultPhoto} alt="" />
                      )}
                      <Form.Control type="file" id="image" className="form-input input-image" name="image" onChange={handleSubmitImage.mutate}/>
                      <button onClick={() => { document.getElementById("image").click()}}>Change Photo Profile</button>
                      {/* </Form> */}
                    </div>
                  </div>    
                </>
              );
            }
          }
        })}
      {/* // end card profile */}
      <History/>
    </>
  );
};

export default Profile;
