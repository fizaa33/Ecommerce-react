import React, { useEffect } from 'react'
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
import { rootStore } from '../../stores';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router';
const Sidebar = observer(()=>{
  const authStore = rootStore.authStore;
  let profile = authStore.profile;
  useEffect(()=>{
    authStore.UserProfile();
  }, [])
  return (
      <div className="sidebar">
              <div className="id d-flex">
                <img src="assets/images/profile-circle.svg" alt="" />
                <h5 className="mb-0 ms-2 user-name-on-page">{profile.fullName}</h5>
              </div>
              <ul className="account-sidebar">
                <li>
                  <Link to="/account">
                    <FontAwesomeIcon icon={faUserEdit} />
                    <span className="sidebar-txt">Personal Data</span>
                  </Link>
                </li>
                <li>
                  <Link to="/history">
                    <FontAwesomeIcon icon={faTrash} />
                    <span className="sidebar-txt">Orders</span>
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist">
                    <FontAwesomeIcon icon={faHeart} />
                    <span className="sidebar-txt">Wish list</span>
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <FontAwesomeIcon icon={faLifeRing} />
                    <span className="sidebar-txt">Contact us</span>
                  </Link>
                </li>
        
              </ul>
            </div>
  )
})
export default Sidebar
