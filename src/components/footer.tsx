import {  FaFacebookF,  FaInstagram, FaTwitter } from "react-icons/fa";


export function Footer()
{
    return(
      <footer className="footer">
              <div className="footer-row">
              <p className="footer-brand">© 2024 KeepNote. All rights reserved.</p>
      
              <div className="social-icons">
                <a href="https://www.facebook.com/" aria-label="Facebook">
                 <FaFacebookF />
                </a>
                <a href="https://www.twitter.com/" aria-label="Twitter">
                <FaTwitter />
                </a>
                <a href="https://www.instagram.com/?hl=en" aria-label="Instagram">
                 <FaInstagram /> 
                </a>
              </div>
              </div>
          </footer>

    )
}