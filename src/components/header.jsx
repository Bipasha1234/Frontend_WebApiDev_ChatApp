import { ArrowDownTrayIcon, Bars3Icon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/chattix.png";

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleLogIn = () => {
    navigate('/login-customer');
  };

  return (
    <header className="py-4 bg-white shadow-md font-open-sans">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <img src={logo} alt="Chattix Logo" className="h-16 w-auto" />
        </div>

        <nav className="hidden md:flex flex-grow justify-center space-x-14 text-lg">
          <a href="#features" className="hover:text-[#80CBB2]">Features</a>
          <a href="#privacy" className="hover:text-[#80CBB2]">Privacy</a>
          <a href="#help-center" className="hover:text-[#80CBB2]">Help Center</a>
        </nav>

        <div className="hidden md:flex space-x-4">
          <button onClick={handleLogIn} className="bg-[#80CBB2] text-white px-4 py-2 rounded hover:bg-green-600 flex items-center space-x-2">
            <span>Login</span>
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        
          <button className="bg-[#373838] text-white px-4 py-2 rounded hover:bg-black flex items-center space-x-2">
            <span>Download</span>
            <ArrowDownTrayIcon className="h-5 w-5" />
          </button>
        </div>

        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          {isNavOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
        </button>
      </div>

      {isNavOpen && (
        <nav className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col space-y-4 text-center py-4">
            <li>
              <a
                href="#features"
                className="text-gray-800 hover:text-[#80CBB2] block"
                onClick={() => setIsNavOpen(false)}
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#privacy"
                className="text-gray-800 hover:text-[#80CBB2] block"
                onClick={() => setIsNavOpen(false)}
              >
                Privacy
              </a>
            </li>
            <li>
              <a
                href="#help-center"
                className="text-gray-800 hover:text-[#80CBB2] block"
                onClick={() => setIsNavOpen(false)}
              >
                Help Center
              </a>
            </li>
            <li>
              <button
                className="bg-[#80CBB2] text-white px-6 py-2 rounded hover:bg-green-600 w-32"
                onClick={() => { setIsNavOpen(false); handleLogIn(); }}
              >
                Login
              </button>
            </li>
           
            <li>
              <button
                className="bg-[#373838] text-white px-6 py-2 rounded hover:bg-black w-32"
                onClick={() => setIsNavOpen(false)}
              >
                Download
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
