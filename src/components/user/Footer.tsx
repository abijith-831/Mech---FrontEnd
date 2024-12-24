import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';



const Footer:React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 p-6 pl-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <ul>
            <li className="mb-2"><a href="/about" className="hover:underline">Who We Are</a></li>
            <li className="mb-2"><a href="/team" className="hover:underline">Our Team</a></li>
            <li className="mb-2"><a href="/careers" className="hover:underline">Careers</a></li>
            <li><a href="/blog" className="hover:underline">Blog</a></li>
          </ul>
        </div>


        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul>
            <li className="mb-2">Email: support@example.com</li>
            <li className="mb-2">Phone: +1 234 567 890</li>
            <li className="mb-2"><a href="/contact" className="hover:underline">Contact Form</a></li>
            <li>Address: 123 Main St, City, Country</li>
          </ul>
        </div>


        <div>
          <h3 className="text-lg font-semibold mb-4">Learn More</h3>
          <ul>
            <li className="mb-2"><a href="/faq" className="hover:underline">FAQs</a></li>
            <li className="mb-2"><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
            <li className="mb-2"><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/resources" className="hover:underline">Resources</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
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


        </div>
      </div>
      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </div>
    </footer>
  );
};



export default Footer
