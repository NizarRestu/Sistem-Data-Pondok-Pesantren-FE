import React, { useState, useEffect } from "react";
import SidebarSantri from "../../component/SidebarSantri";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const TambahTagihan = () => {
  const [jenisTagihan, setJenisTagihan] = useState("");
  const [namaTagihan, setNamaTagihan] = useState("");
  const [totalTagihan , setTotalTagihan] = useState();
  const [santri , setSantri] = useState([]);
  const [idSantri , setIdSantri] = useState();
  const navigate = useNavigate();

  const getSantri = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/akun/santri`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setSantri(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getSantri();
  }, []);


  const addTagihan = async (e) => {
    e.preventDefault();

      Swal.fire({
        title: "Apakah kamu yakin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, tambah!"
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            // Proses pengiriman transaksi ke backend
            const data = {
              id_santri: idSantri ,
              jenis_tagihan: jenisTagihan,
              nama_tagihan: namaTagihan,
              total_tagihan: totalTagihan,
              // tambahkan field lain sesuai kebutuhan
            };
            axios.post("http://localhost:8000/api/tagihan/add", data, {
              headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });

            Swal.fire({
              icon: "success",
              title: "Berhasil!!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/sistem_pondok/tagihan")
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } catch (err) {
            console.log(err);
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
            onSubmit={addTagihan}
            className="py-8 px-12"
            action="https://formbold.com/s/FORM_ID"
            method="POST"
          >

            <div className="mb-8">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Nama Santri:
              </label>
              <select
                onChange={(e) => setIdSantri(e.target.value)}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              >
                <option value="">
                  Pilih Nama Santri
                </option>
                {santri.map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.nama}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-8">
              <label
                htmlFor="namaSantri"
                className="block text-base font-medium text-[#07074D]"
              >
                Nama Tagihan:
              </label>
              <input
                type="text"
                id="namaSantri"
                onChange={(e) => setNamaTagihan(e.target.value)}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-8">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Jenis Tagihan:
              </label>
              <select
                onChange={(e) => {
                  setJenisTagihan(e.target.value);
                }}
                value={jenisTagihan}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              >
                <option value="">Pilih Jenis Tagihan</option>
                <option value="Uang Makan">Uang Makan</option>
                <option value="Uang Kitab">Uang Kitab</option>
                <option value="Uang Jajan">Uang Jajan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div className="mb-8">
              <label htmlFor="totalTagihan" className="block text-base font-medium text-[#07074D]">
                Total Tagihan:
              </label>
              <input
                type="number"
                id="totalTagihan"
                onChange={(e) => setTotalTagihan(e.target.value)}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div>
              <button
                type="submit"
                className="hover:shadow-form w-full rounded-md bg-lime-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Tambah
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TambahTagihan;
