import React from 'react';

function FooterPage() {
  return (
    <div id="footer">
      <footer>
        <div className="footer-main">
          <img className="footer-shade" src="assets/images/foooter-shade.svg" alt="" />
          <div className="company">
            <p className="footer-top">Company</p>
            <a href="#">About us</a>
            <a href="#">Blog</a>
            <a href="#">Return</a>
            <a href="#">Order status</a>
          </div>
          <div className="company">
            <p className="footer-top">Info</p>
            <a href="#">How it works?</a>
            <a href="#">Our promises</a>
            <a href="#">FAQ</a>
          </div>
          <div className="company">
            <p className="footer-top">Contact us</p>
            <a href="#">123 Main Street, Anytown, USA</a>
            <a href="#">+1 (555) 123-4567</a>
            <a href="#">TechHeimSupport@gmail.com</a>
          </div>
          <div className="company">
            <div className="footer-top">Sign up for News and Updates</div>
            <div className="email-input d-flex">
              <input className="email-input-field" type="text" placeholder="E-mail Address" />
              <img style={{ cursor: 'pointer' }} src="assets/images/email-send.svg" alt="" />
            </div>
            <div className="contact-icons">
              <img src="assets/images/facebook.svg" alt="" />
              <img src="assets/images/twitter.svg" alt="" />
              <img src="assets/images/instagram.svg" alt="" />
              <img src="assets/images/youtube.svg" alt="" />
            </div>
          </div>
        </div>
        <div className="footer-policy">
          <p>© 2023 Tech Heim</p>
          <div className="policy-links">
            <a href="#">Cookie settings</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms and Conditions</a>
            <a href="#">Imprint</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default FooterPage;
