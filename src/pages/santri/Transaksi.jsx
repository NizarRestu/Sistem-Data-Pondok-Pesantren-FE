import React, { useState } from "react";
import SidebarSantri from "../../component/SidebarSantri";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Transaksi = () => {
  const [keterangan, setKeterangan] = useState("");
  const [foto, setFoto] = useState(null); // Ubah initial state untuk foto menjadi null
  const param = useParams();
  const navigate = useNavigate();

  const addTransaksi = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", foto);
    data.append("keterangan", keterangan);
    data.append("tagihan_id", param.id);

    try {
      await axios.post("http://localhost:8000/api/transaksi", data, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });

      navigate("/sistem_pondok/tagihan_uang_makan");
      Swal.fire({
        icon: "success",
        title: "Transaksi sedang di proses",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative min-h-screen md:flex" data-dev-hint="container">
      <SidebarSantri />
      <div className="flex items-center min-h-screen justify-center p-12">
        <div className="md:ml-48 mx-auto w-[900px] bg-white">
          <form
            onSubmit={addTransaksi}
            className="py-8 px-12"
            action="https://formbold.com/s/FORM_ID"
            method="POST"
          >
            <div className="mb-8">
              <label
                htmlFor="fileDescription"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Keterangan:
              </label>
              <textarea
                onChange={(e) => setKeterangan(e.target.value)}
                id="fileDescription"
                name="fileDescription"
                placeholder="Masukan keterangan di sini..."
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-8">
              <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                Bukti Transfer
              </label>

              <div className="mb-8 cursor-pointer">
                <input
                  type="file"
                  onChange={(e) => setFoto(e.target.files[0])}
                  name="file"
                  id="file"
                  className="sr-only"
                />
                <label
                  htmlFor="file"
                  className="relative cursor-pointer flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                >
                  {foto && (
                    // Tampilkan preview foto jika sudah dipilih
                    <img
                      src={URL.createObjectURL(foto)}
                      alt="Preview"
                      className="max-h-[200px] max-w-full object-contain"
                    />
                  )}
                  {!foto && (
                    <div>
                      <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                        Taruh disini
                      </span>
                      <span className="mb-2 block text-base font-medium text-[#6B7280]">
                        Atau
                      </span>
                      <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                        Ambil dari album
                      </span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="hover:shadow-form w-full rounded-md bg-lime-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Kirim
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Transaksi;
