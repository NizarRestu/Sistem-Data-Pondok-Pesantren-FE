import React, { useState, useEffect } from "react";
import SidebarSantri from "../../component/SidebarAdmin";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Transaksi = () => {
  const [transaksi, setTransaksi] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getById = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/transaksi/${id}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setTransaksi(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getById();
  }, []);

  const lolos = async (id) => {
    Swal.fire({
      title: "Apakah Anda Ingin Meloloskan Transaksi Ini?",
      text: "Perubahan data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Lolos",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Set id_santri to null before sending the request
          await axios.put(
            `http://localhost:8000/api/tagihan/lolos/${id}`,
            { status: "Berhasil" },
            {
              headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            }
          );
          Swal.fire({
            icon: "success",
            title: "Berhasil!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/sistem_pondok/pembayaran");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Gagal Meloloskan Data",
            text: "Terjadi kesalahan saat meloloskan data.",
          });
        }
      }
    });
  };

  const gagal = async (id) => {
    Swal.fire({
      title: "Apakah Anda Ingin Megagalkan Transaksi Ini?",
      text: "Perubahan data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Gagal",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Set id_santri to null before sending the request
          await axios.put(
            `http://localhost:8000/api/tagihan/gagal/${id}`,
            { status: "Belum" },
            {
              headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            }
          );
          Swal.fire({
            icon: "success",
            title: "Berhasil!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/sistem_pondok/pembayaran");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Gagal Megagalkan Data",
            text: "Terjadi kesalahan saat megagalkan data.",
          });
        }
      }
    });
  };

  return (
    <div className="relative min-h-screen md:flex" data-dev-hint="container">
      <SidebarSantri />
      <div className="flex items-center min-h-screen justify-center p-12">
        <div className="md:ml-48 mx-auto w-[900px] bg-white">
          <form
            className="py-8 px-12"
            action="https://formbold.com/s/FORM_ID"
            method="POST"
          >
            <div className="mb-8">
              <label
                htmlFor="inputNama"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Nama:
              </label>
              <input
                type="text"
                id="inputNama"
                name="inputNama"
                value={transaksi.nama} // Set the value to the name from transaksi
                readOnly
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="fileDescription"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Keterangan:
              </label>
              <textarea
                value={transaksi.keterangan}
                id="fileDescription"
                name="fileDescription"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-8">
              <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                Bukti Transfer
              </label>

              <div className="mb-8 cursor-pointer">
               
                <label
                  htmlFor="file"
                  className="relative cursor-pointer flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                >
                  <img
                    src={transaksi.image}
                    alt="Preview"
                    className="max-h-[200px] max-w-full object-contain"
                  />
                </label>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                className="hover:shadow-form flex-1 rounded-md bg-lime-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                onClick={() => lolos(transaksi.tagihan_id)}
              >
                Berhasil
              </button>

              <button
                type="button"
                className="hover:shadow-form flex-1 rounded-md bg-red-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                onClick={() => gagal(transaksi.tagihan_id)}
              >
                Gagal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Transaksi;
