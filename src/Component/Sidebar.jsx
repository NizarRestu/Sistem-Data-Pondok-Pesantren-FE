import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/styles/sidebar.css";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <input type="checkbox" id="menu-open" className="hidden" />

      <header
        className="bg-gray-800 text-gray-100 flex justify-between md:hidden"
        data-dev-hint="mobile menu bar"
      >
         <img className="w-16" src={require('../assets/images/logo2.png')} alt="Logo" />
        <a href="/dash" className="block p-4  text-white font-bold no-underline">
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
              to="/dash"
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
              to="/periksa"
              className="flex items-center py-2 text-white px-4 transition duration-300 hover:bg-green-700 no-underline gap-2"
              activeclassname="active"
            >
              <svg
                className="w-6 h-6 icoon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path d="M142.4 21.9c5.6 16.8-3.5 34.9-20.2 40.5L96 71.1V192c0 53 43 96 96 96s96-43 96-96V71.1l-26.1-8.7c-16.8-5.6-25.8-23.7-20.2-40.5s23.7-25.8 40.5-20.2l26.1 8.7C334.4 19.1 352 43.5 352 71.1V192c0 77.2-54.6 141.6-127.3 156.7C231 404.6 278.4 448 336 448c61.9 0 112-50.1 112-112V265.3c-28.3-12.3-48-40.5-48-73.3c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V336c0 97.2-78.8 176-176 176c-92.9 0-168.9-71.9-175.5-163.1C87.2 334.2 32 269.6 32 192V71.1c0-27.5 17.6-52 43.8-60.7l26.1-8.7c16.8-5.6 34.9 3.5 40.5 20.2zM480 224c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32z" />
              </svg>
              <span className="font-semibold text-lg">Periksa Pasien</span>
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
                <span className="font-semibold text-lg">Data</span>
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
                <span className="font-semibold text-lg">Data</span>
              </div>
            )}
            {showModal ? (
              <div className="ml-6">
                <NavLink
                  to="/daftar-guru"
                  className="flex items-center py-2 text-white px-4 transition duration-300 hover:bg-green-700 no-underline gap-2"
                  activeclassname="active"
                >
                  <svg
                    className="w-6 h-6 icoon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9v28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z" />
                  </svg>
                  <span className="font-semibold">Daftar Guru</span>
                </NavLink>
                <NavLink
                  to="/daftar-siswa"
                  className="flex items-center py-2 text-white px-4 transition duration-300 hover:bg-green-700 no-underline gap-2"
                  activeclassname="active"
                >
                  <svg
                    className="w-6 h-6 icoon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                  </svg>
                  <span className="font-semibold">Daftar Siswa</span>
                </NavLink>
                <NavLink
                  to="/daftar-karyawan"
                  className="flex items-center py-2 text-white px-4 transition duration-300 hover:bg-green-700 no-underline gap-2"
                  activeclassname="active"
                >
                  <svg
                    className="w-6 h-6 icoon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path d="M144 160c-44.2 0-80-35.8-80-80S99.8 0 144 0s80 35.8 80 80s-35.8 80-80 80zm368 0c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM416 224c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                  </svg>
                  <span className="font-semibold">Daftar Karyawan</span>
                </NavLink>
              </div>
            ) : null}
            <NavLink
              to="/diagnosa"
              className="flex items-center py-2 text-white px-4 transition duration-300 hover:bg-green-700 no-underline gap-2"
              activeclassname="active"
            >
              <svg
                className="w-6 h-6 icoon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path d="M288 176c48.6 0 88-39.4 88-88s-39.4-88-88-88s-88 39.4-88 88s39.4 88 88 88zM78.7 372.9c15-12.5 50-34.4 97.3-50.1V432H400V322.7c47.3 15.8 82.3 37.7 97.3 50.1c20.4 17 50.6 14.2 67.6-6.1s14.2-50.6-6.1-67.6c-12-10-30.1-22.5-53.2-35C497.2 278.4 481.7 288 464 288c-26.5 0-48-21.5-48-48c0-4.3 .6-8.4 1.6-12.4C379.1 215.9 335.3 208 288 208c-60.2 0-114.9 12.9-160 29.9c0 .7 0 1.4 0 2.1c0 26.5-21.5 48-48 48c-11.8 0-22.7-4.3-31-11.4c-13.1 8.1-23.7 15.9-31.7 22.5c-20.4 17-23.1 47.2-6.1 67.6s47.2 23.1 67.6 6.1zM24 464c-13.3 0-24 10.7-24 24s10.7 24 24 24H552c13.3 0 24-10.7 24-24s-10.7-24-24-24H24zM272 280c0 13.3-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24zm56 104c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zM96 240c0-8.8-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16s16-7.2 16-16zm368 16c8.8 0 16-7.2 16-16s-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16z" />
              </svg>
              <span className="font-semibold text-lg">Diagnosa</span>
            </NavLink>
            <NavLink
              to="/penanganan"
              className="flex items-center py-2 text-white px-4 transition duration-300 hover:bg-green-700 no-underline gap-2"
              activeclassname="active"
            >
              <svg
                className="w-6 h-6 icoon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path d="M320 80c-22.1 0-40-17.9-40-40s17.9-40 40-40s40 17.9 40 40s-17.9 40-40 40zm44.7 84.3L375.8 253c1.6 13.2-7.7 25.1-20.8 26.8s-25.1-7.7-26.8-20.8l-4.4-35h-7.6l-4.4 35c-1.6 13.2-13.6 22.5-26.8 20.8s-22.5-13.6-20.8-26.8l11.1-88.8L255.5 181c-10.1 8.6-25.3 7.3-33.8-2.8s-7.3-25.3 2.8-33.8l27.9-23.6C271.3 104.8 295.3 96 320 96s48.7 8.8 67.6 24.7l27.9 23.6c10.1 8.6 11.4 23.7 2.8 33.8s-23.7 11.4-33.8 2.8l-19.8-16.7zM40 64c22.1 0 40 17.9 40 40v40 80 40.2c0 17 6.7 33.3 18.7 45.3l51.1 51.1c8.3 8.3 21.3 9.6 31 3.1c12.9-8.6 14.7-26.9 3.7-37.8l-15.2-15.2-32-32c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l32 32 15.2 15.2 0 0 25.3 25.3c21 21 32.8 49.5 32.8 79.2V464c0 26.5-21.5 48-48 48H173.3c-17 0-33.3-6.7-45.3-18.7L28.1 393.4C10.1 375.4 0 351 0 325.5V224 160 104C0 81.9 17.9 64 40 64zm560 0c22.1 0 40 17.9 40 40v56 64V325.5c0 25.5-10.1 49.9-28.1 67.9L512 493.3c-12 12-28.3 18.7-45.3 18.7H400c-26.5 0-48-21.5-48-48V385.1c0-29.7 11.8-58.2 32.8-79.2l25.3-25.3 0 0 15.2-15.2 32-32c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-32 32-15.2 15.2c-11 11-9.2 29.2 3.7 37.8c9.7 6.5 22.7 5.2 31-3.1l51.1-51.1c12-12 18.7-28.3 18.7-45.3V224 144 104c0-22.1 17.9-40 40-40z" />
              </svg>
              <span className="font-semibold text-lg">Penanganan Pertama</span>
            </NavLink>
            <NavLink
              to="/tindakan"
              className="flex items-center py-2 text-white px-4 transition duration-300 hover:bg-green-700 no-underline gap-2"
              activeclassname="active"
            >
              <svg
                className="w-6 h-6 icoon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M256 0c17.7 0 32 14.3 32 32V66.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H445.3C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.3C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H66.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zM128 256c0 70.7 57.3 128 128 128s128-57.3 128-128s-57.3-128-128-128s-128 57.3-128 128zm128 80c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80z" />
              </svg>
              <span className="font-semibold text-lg">Tindakan</span>
            </NavLink>
            <NavLink
              to="/daftar-obat"
              className="flex items-center py-2 text-white px-4 transition duration-300 hover:bg-green-700 no-underline gap-2"
              activeclassname="active"
            >
              <svg
                className="w-6 h-6 icoon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path d="M64 144c0-26.5 21.5-48 48-48s48 21.5 48 48V256H64V144zM0 144V368c0 61.9 50.1 112 112 112s112-50.1 112-112V189.6c1.8 19.1 8.2 38 19.8 54.8L372.3 431.7c35.5 51.7 105.3 64.3 156 28.1s63-107.5 27.5-159.2L427.3 113.3C391.8 61.5 321.9 49 271.3 85.2c-28 20-44.3 50.8-47.3 83V144c0-61.9-50.1-112-112-112S0 82.1 0 144zm296.6 64.2c-16-23.3-10-55.3 11.9-71c21.2-15.1 50.5-10.3 66 12.2l67 97.6L361.6 303l-65-94.8zM491 407.7c-.8 .6-1.6 1.1-2.4 1.6l4-2.8c-.5 .4-1 .8-1.6 1.2z" />
              </svg>
              <span className="font-semibold text-lg">Daftar Obat P3K</span>
            </NavLink>
            {showModal === true ? null : (
              <>
                <div className="mt-5 ml-[93px]">
                  <span className="">{date.getDate()}</span>
                  <span className="">/{date.getMonth() + 1}</span>
                  <span className="">/{date.getFullYear()}</span>
                </div>
                <div className="text-xl ml-[70px]">
                  {date.toLocaleTimeString()}
                </div>
              </>
            )}
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