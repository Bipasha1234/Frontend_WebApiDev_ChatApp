import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#373838] text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row   md:items-start space-y-6 md:space-y-0">
          <div className="text-center md:text-center w-full md:w-1/2">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 ">
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline text-sm">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-sm">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-sm">
                    Features
                  </a>
                </li>
              </ul>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline text-sm">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-sm">
                    Chattix Web
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-sm">
                    Terms and Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center md:text-center w-full md:w-1/2">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-center space-x-4 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500"
              >
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-700"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-6 pt-4 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Chattix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
