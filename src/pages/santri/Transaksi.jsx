import React, { useState, useEffect } from "react";
import SidebarSantri from "../../component/SidebarSantri";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Transaksi = () => {
  const [keterangan, setKeterangan] = useState("");
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState("");
  const [tagihan, setTagihan] = useState("");
  const [total, setTotal] = useState();
  const [foto, setFoto] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/tagihan/${id}`,
          {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          }
        );
        setNama(response.data.data.nama);
        setJenis(response.data.data.jenis_tagihan);
        setTagihan(response.data.data.nama_tagihan);
        setTotal(response.data.data.total_tagihan);
      } catch (error) {
        console.error("Error fetching tagihan data:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, [id]);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const addTransaksi = async (e) => {
    e.preventDefault();

    if (foto) {
      const data = new FormData();
      data.append("file", foto);
      data.append("keterangan", keterangan);
      data.append("tagihan_id", id);

      Swal.fire({
        title: "Apakah kamu yakin?",
        html: `
          <p>Data Tagihan:</p>
          <p>Nama Santri: ${nama}</p>
          <p>Jenis Tagihan: ${jenis}</p>
          <p>Nama Tagihan: ${tagihan}</p>
          <p>Total Tagihan: ${total}</p>
          <p>Keterangan: ${keterangan}</p>
        `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, kirim!",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
             axios.post("http://localhost:8000/api/transaksi", data, {
              headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });

            Swal.fire({
              icon: "success",
              title: "Transaksi sedang diproses",
              showConfirmButton: false,
              timer: 1500,
            });
          if(jenis === "Uang Makan") {
            navigate("sistem_pondok/tagihan_uang_makan")
          }
          if(jenis === "Uang Jajan") {
            navigate("sistem_pondok/tagihan_uang_jajan")
          }
          if(jenis === "Uang Kitab") {
            navigate("sistem_pondok/tagihan_uang_kitab")
          }
          if(jenis === "Lainnya") {
            navigate("sistem_pondok/tagihan_uang_lainnya")
          }
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } catch (err) {
            console.log(err);
          }
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Bukti transfer is required. Cannot proceed with the transaction.",
      });
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
                disabled={!foto}
              >
                Kirim
              </button>

              <button
                type="button"
                onClick={openModal}
                className="hover:shadow-form w-full rounded-md bg-blue-500 py-3 px-8 mt-4 text-center text-base font-semibold text-white outline-none"
              >
                No Rekening Dan Cara Transfer
              </button>
            </div>
          </form>
          {isModalVisible && (
            <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-4">Cara Transfer</h2>
                <ol className="list-decimal mb-4 pl-6">
                  <li>Pilih jenis serta nama tagihan.</li>
                  <li>Pergi ke bank terdekat atau gunakan aplikasi perbankan.</li>
                  <li>
                    Kirimkan dana ke nomor rekening: <strong>304301040172533 </strong>
                    dan sertakan tangkapan layar atau foto bukti transfer.
                  </li>
                  <li>Pastikan dana yang dikirim sesuai jumlah tagihan</li>
                  <li>Unggah bukti transfer ke dalam formulir.</li>
                  <li>Anda dapat mengisi keterangan jika diperlukan.</li>
                  <li>
                    Jika keterangan diisi, informasi tersebut akan disampaikan kepada santri terkait.
                  </li>
                </ol>
                <form>
                  <div className="mb-4">
                    <label htmlFor="noRekening" className="block text-sm font-medium text-gray-600">
                      No Rekening Tujuan:
                    </label>
                    <input
                      type="text"
                      id="noRekening"
                      value="304301040172533"
                      readOnly
                      className="mt-1 p-2 border w-full rounded-md"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md mr-2"
                    >
                      Tutup
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transaksi;
