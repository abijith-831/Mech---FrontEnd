import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-200 p-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
        <div>
          <h3 className="font-semibold">About Us</h3>
          <ul>
            <li>Who are we</li>
            <li>Work with us</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">For Workshop / Mechanics</h3>
          <ul>
            <li>Partner with us</li>
            <li>Apps for you</li>
            <li>24×7 Customer Care Support</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Learn More</h3>
          <ul>
            <li>Privacy</li>
            <li>Security</li>
            <li>Terms and conditions</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Social Links</h3>
          <ul className="flex space-x-6">
            <li className="flex items-center justify-center">
              <a href="https://facebook.com" className="hover:text-gray-400" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} className="text-3xl mr-2" />
              </a>
            </li>
            <li className="flex items-center justify-center">
              <a href="https://twitter.com" className="hover:text-gray-400" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} className="text-3xl mr-2" />
              </a>
            </li>
            <li className="flex items-center justify-center">
              <a href="https://instagram.com" className="hover:text-gray-400" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} className="text-3xl mr-2" />
              </a>
            </li>
            <li className="flex items-center justify-center">
              <a href="https://linkedin.com" className="hover:text-gray-400" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} className="text-3xl mr-2" />
              </a>
            </li>
          </ul>
          <p className="mt-2">
            Connect with us on social media for updates, offers, and car care tips!
          </p>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer
