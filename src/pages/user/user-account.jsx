import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserEdit,
  faTrash,
  faHeart,
  faLifeRing,
  faSignOutAlt,
  faUser,
  faInbox,
  faPhone,
  faKey,
  faHome,
  faMapSigns,
} from '@fortawesome/free-solid-svg-icons';
import '../layout.css'
import './user.css';
import '../media.css'
import Sidebar from '../../components/sidebar';
import { observer } from 'mobx-react-lite';
import { rootStore } from '../../stores';
const UserDetail = observer(()=>{
  const authStore = rootStore.authStore;
  const addressStore = rootStore.addressStore;
  let profile = authStore.profile;
  let latestAddress = addressStore.latestAddress || {};

  useEffect(()=>{
    authStore.UserProfile();
    addressStore.getAddress();
  }, [])
  return (
    <div className="container">
      <br />
      <p className="gray-text">
        Home › Account › <span className="blue-text">Personal Data</span>
      </p>
      <div className="account-container">
  <Sidebar />
        <div className="account-main">
          <h4>Identification</h4>
          <p className="gray-text">Verify your identity</p>
          <div className="acc-inputs">
            <div className="input1">
              <span>Full name</span>
              <div className="input">
                <FontAwesomeIcon icon={faUser} />
                <span id="personalName">{profile.fullName}</span>
              </div>
            </div>
            <div className="input1">
              <span>E-mail Address</span>
              <div className="input">
                <FontAwesomeIcon icon={faInbox} />
                <span id="personalEmail">{profile.email}</span>
              </div>
            </div>
            <div className="input1">
              <span>Phone number</span>
              <div className="input">
                <FontAwesomeIcon icon={faPhone} />
                <span id="personalNumber">{profile.phoneNumber}</span>
              </div>
            </div>
            <div className="input1">
              <span>Password</span>
              <div className="input">
                <FontAwesomeIcon icon={faKey} />
                <span id="personalPassword">******</span>
              </div>
            </div>
            <div className="input1">
              <span>Address</span>
              <div className="input">
                <FontAwesomeIcon icon={faHome} />
                <span id="personalAddress">{latestAddress.street}, {latestAddress.city} , {latestAddress.region}</span>
              </div>
            </div>
            <div className="input1">
              <span>Postal code</span>
              <div className="input">
                <FontAwesomeIcon icon={faMapSigns} />
                <span id="personalPostalCode">{latestAddress.postalCode}</span>
              </div>
            </div>
          </div>
          {/* Uncomment if needed */}
          {/* <button className="btn btn-primary mt-5" data-bs-toggle="modal" data-bs-target="#inputEdit">Update</button> */}
        </div>
      </div>
    </div>
  );
})

export default UserDetail;
