import {  useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill , faFileInvoiceDollar , faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/sidebar.css";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };


  return (
    <>
      <input type="checkbox" id="menu-open" className="hidden" />

      <header
        className="bg-gray-800 text-gray-100 flex justify-between md:hidden"
        data-dev-hint="mobile menu bar"
      >
         <img className="w-16" src={require('../assets/images/logo2.png')} alt="Logo" />
        <a href="/sistem_pondok/dashboard_santri" className="block p-4  text-white font-bold no-underline">
          Sistem Data Pondok
        </a>

        <label
          htmlFor="menu-open"
          id="mobile-menu-button"
          className="flex items-center m-2 p-2 focus:outline-none hover:text-white hover:bg-green-700 rounded-md"
        >
          <svg
            id="menu-open-icon"
            className="h-6 w-6 transition duration-200 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            id="menu-close-icon"
            className="h-6 w-6 transition duration-200 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </label>
      </header>

      <aside
        id="sidebar"
        className="min-h-screen bg-gray-800 text-gray-100 md:w-64 w-3/4 space-y-6 pt-6 px-0 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-700 ease-in-out md:justify-between md:flex md:flex-col overflow-y-auto"
        data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation"
      >
        <div
          className="flex flex-col space-y-4"
          data-dev-hint="optional div for having an extra footer navigation"
        >
          <div className="text-white flex-1 items-center px-4">
          <img className="mx-auto" src={require('../assets/images/logo3.png')} alt="Logo" />
          </div>
          <hr />
          <nav data-dev-hint="main navigation">
            <NavLink
              to="/sistem_pondok/dashboard_santri"
              className="flex items-center py-2 text-white px-4 transition duration-300 hover:bg-green-700 no-underline gap-2"
              activeclassname="active"
            >
              <svg
                className="w-6 h-6 icoon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
              </svg>
              <span className="font-semibold text-lg">Dashboard</span>
            </NavLink>
            <NavLink
              to="/sistem_pondok/transaksi"
              className="flex items-center py-2 text-white px-4 transition duration-300 hover:bg-green-700 no-underline gap-2"
              activeclassname="active"
            >
              <FontAwesomeIcon className="w-6 h-6 icoonn text-white logo" icon={faMoneyBill} />
              <span className="font-semibold text-lg">Pembayaran</span>
            </NavLink>
            {showModal === false ? (
              <div
                onClick={() => setShowModal(true)}
                className="flex items-center py-2 text-white px-4 transition duration-300 hover:bg-green-700 no-underline gap-2"
                activeclassname="active"
              >
                <svg
                  className="w-6 h-6 icoon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
                <span className="font-semibold text-lg">Tagihan</span>
              </div>
            ) : (
              <div
                onClick={() => setShowModal(false)}
                className="flex items-center py-2 text-white px-4 transition duration-300 hover:bg-green-700 no-underline gap-2"
                activeclassname="active"
              >
                <svg
                  className="w-6 h-6 icoon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <span className="font-semibold text-lg">Tagihan</span>
              </div>
            )}
            {showModal ? (
              <div className="ml-6">
                <NavLink
                  to="/sistem_pondok/tagihan_uang_makan"
                  className="flex items-center py-2 text-white px-4 transition duration-300 hover:bg-green-700 no-underline gap-2"
                  activeclassname="active"
                >
                  <FontAwesomeIcon className="w-6 h-6 icoonn text-white logo" icon={faFileInvoiceDollar} />
                  <span className="font-semibold">Uang Makan</span>
                </NavLink>
                <NavLink
                  to="/sistem_pondok/tagihan_uang_kitab"
                  className="flex items-center py-2 text-white px-4 transition duration-300 hover:bg-green-700 no-underline gap-2"
                  activeclassname="active"
                >
                  <FontAwesomeIcon className="w-6 h-6 icoonn text-white logo" icon={faFileInvoiceDollar} />
                  <span className="font-semibold">Uang Kitab</span>
                </NavLink>
                <NavLink
                  to="/sistem_pondok/tagihan_uang_jajan"
                  className="flex items-center py-2 text-white px-4 transition duration-300 hover:bg-green-700 no-underline gap-2"
                  activeclassname="active"
                >
                 <FontAwesomeIcon className="w-6 h-6 icoonn text-white logo" icon={faFileInvoiceDollar} />
                  <span className="font-semibold">Uang Jajan</span>
                </NavLink>
                <NavLink
                  to="/sistem_pondok/tagihan_uang_lainnya"
                  className="flex items-center py-2 text-white px-4 transition duration-300 hover:bg-green-700 no-underline gap-2"
                  activeclassname="active"
                >
                 <FontAwesomeIcon className="w-6 h-6 icoonn text-white logo" icon={faFileInvoiceDollar} />
                  <span className="font-semibold">Lainnya</span>
                </NavLink>
              </div>
            ) : null}
            <NavLink
              to="/sistem_pondok/riwayat_tagihan"
              className="flex items-center py-2 text-white px-4 transition duration-300 hover:bg-green-700 no-underline gap-2"
              activeclassname="active"
            >
              <FontAwesomeIcon className="w-6 h-6 icoonn text-white logo" icon={faClockRotateLeft} />
              <span className="font-semibold text-lg">Riwayat Tagihan</span>
            </NavLink>
          </nav>
        </div>

        <nav
          onClick={logout}
          className="flex items-center py-2 text-white px-4 transition duration-300 hover:bg-green-700 no-underline gap-2 cursor-pointer"
          data-dev-hint="second-main-navigation or footer navigation"
        >
          <svg
            className="w-6 h-6 icoon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" />
          </svg>
          <span className="font-semibold text-lg">Log out</span>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
