import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(faEye);

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
  const login = async (e) => {
    e.preventDefault();

    try {
      const { data, status } = await axios.post(
        "http://localhost:8000/api/akun/login",
        {
          email: email,
          password: password,
        }
      );
      // Jika respon 200/ ok
      if (status === 200) {
        Swal.fire({
          icon: "success",
          title: "Login Berhasil!!!",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.setItem("userId", data.data.data.id);
        localStorage.setItem("email", data.data.data.email);
        localStorage.setItem("token" ,data.data.token)
        if(data.data.data.role == "Pengurus"){
          setTimeout(() => {
            navigate("/dashboard_admin");
            window.location.reload();
          }, 1500);
        } else {
          setTimeout(() => {
            navigate("/dashboard_santri");
            window.location.reload();
          }, 1500);
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Username atau password tidak valid!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };

  return (
    <div className="">
      
      <section className=" h-screen flex flex-col  justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-1/2 w-64 max-w-lg">
          <img className="mx-auto "
            src="data:image/png;base64,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"
          />
        </div>
        <div className="md:w-1/2 max-w-lg">
          <div className="text-center ">
            <label className="mr-1 text-xl font-semibold text-lime-900">
              Sistem Pembayaran
            </label>
          </div>
          <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"></div>
          <form onSubmit={login}>
            <div>
              <label className="sr-only">Username</label>

              <div className="relative mb-6">
                <input
                  type="email"
                  className="w-full rounded-lg border p-4 pr-12 text-sm shadow-sm"
                  placeholder="Masukan email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type={passwordType}
                  className="w-full rounded-lg border p-4 pr-12 text-sm shadow-sm"
                  placeholder="Masukan password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <span
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-0 grid place-content-center px-4"
                >
                  <FontAwesomeIcon icon={passwordIcon} className="text-black"/> 
                </span>
              </div>
            </div>
            <div className="text-center ">
              <button
                className="mt-4 bg-lime-700 hover:bg-lime-900 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                type="submit"
              >
                Masuk
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

