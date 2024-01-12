import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(faEyeSlash);
  const backgroundImageUrl = 'https://lukmanhakim.or.id/wp-content/uploads/2021/09/masjid-fix1-1024x664.png';

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordIcon(faEye);
      return;
    }
    setPasswordType("password");
    setPasswordIcon(faEyeSlash);
  };
  const navigate = useNavigate();
  const register = async (e) => {
    e.preventDefault();

    try {
      const { data, status } = await axios.post(
        "http://localhost:8000/api/akun/add/pengurus",
        {
          email: email,
          password: password,
          username: username
        }
      );
      // Jika respon 200/ ok
      if (status === 200) {
        Swal.fire({
          icon: "success",
          title: "Register Berhasil!!!",
          showConfirmButton: false,
          timer: 1500,
        });
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 1500);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Email atau password tidak valid!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };

  return (
    <div>
    <section className=" h-screen flex flex-col justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0" >
      <div className="md:w-1/2 w-64 max-w-lg">
      <img className="mx-auto" src={require('../assets/images/logo3.png')} alt="Logo" />
      </div>
      <div className="md:w-1/2 max-w-lg bg-white bg-opacity-80 p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <label className="text-2xl font-semibold text-lime-900">Sistem Aplikasi Pondok</label>
        </div>
        <form onSubmit={register}>
          <div className="mb-6">
            <label htmlFor="email" className="p-2 pb-2 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded-lg border p-4 text-sm shadow-sm"
              placeholder="Masukkan email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="p-2 pb-2 font-semibold">
              Username
            </label>
            <input
              type="text"
              id="email"
              className="w-full rounded-lg border p-4 text-sm shadow-sm"
              placeholder="Masukkan email"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="p-2 pb-2 font-semibold">
              Password
            </label>
            <div className="relative">
              <input
                type={passwordType}
                id="password"
                className="w-full rounded-lg border p-4 text-sm shadow-sm"
                placeholder="Masukkan password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={togglePassword}
                className="absolute inset-y-0 right-0 grid place-content-center px-4 cursor-pointer"
              >
                <FontAwesomeIcon icon={passwordType === 'password' ? faEye : faEyeSlash} className="text-black" />
              </span>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="mt-4 bg-lime-700 hover:bg-lime-900 px-10 py-2 text-white uppercase rounded text-sm tracking-wider"
            >
              Daftar
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
  );
}

