import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../component/SidebarSantri";
import $ from "jquery";
import "datatables.net";
import axios from "axios";
import "./../../assets/styles/datatables.css";
import Swal from "sweetalert2";

const RiwayatTagihan = () => {
  const tableRef = useRef(null);
  const [totalTagihan, setTotalTagihan] = useState([]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({
      // DataTable options
    });
  };
  const getAll = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/tagihan/history`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setTotalTagihan(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };
  const authToken = localStorage.getItem("token");
  const deleteHistory = async (id) => {
    Swal.fire({
      title: "Apakah Anda Ingin Menghapus Data Ini?",
      text: "Perubahan data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Set id_santri to null before sending the request
          await axios.put(
            `http://localhost:8000/api/tagihan/delete/${id}`,
            { id_santri: null },
            {
              headers: { "auth-tgh": `jwt ${authToken}` },
            }
          );
          Swal.fire({
            icon: "success",
            title: "Dihapus!",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Gagal Menghapus Data",
            text: "Terjadi kesalahan saat menghapus data.",
          });
        }
      }
    });
  };
  


  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (totalTagihan && totalTagihan.length > 0) {
      initializeDataTable();
    }
  }, [totalTagihan]);

  return (
    <div className="relative min-h-screen md:flex" data-dev-hint="container">
      <Sidebar />
      <main
        id="content"
        className="max-h-screen overflow-y-auto flex-1 p-6 lg:px-8"
      >
        <div className="container mx-auto">
          <div className="overflow-x-auto">
            <table
              id="example_data"
              className="rounded-sm table-auto min-w-full"
              ref={tableRef}
            >
              {/* DataTable Header */}
              <thead className="bg-green-700 text-white font-bold">
                <tr>
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">Nama Tagihan</th>
                  <th className="px-4 py-2">Jenis Tagihan</th>
                  <th className="px-4 py-2">Total Tagihan</th>
                  <th className="px-4 py-2">Tanggal Tagihan</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Aksi</th>
                </tr>
              </thead>
              {/* DataTable Body */}
              <tbody>
                { totalTagihan.length > 0 ? (
                  totalTagihan.map((tagihan, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{tagihan.nama_tagihan}</td>
                      <td>{tagihan.jenis_tagihan}</td>
                      <td>{tagihan.total_tagihan}</td>
                      <td>{tagihan.created_date}</td>
                      <td>{tagihan.status}</td>
                      <td>  
                        <button   onClick={() => deleteHistory(tagihan.id)} className="text-font-bold text-red-500 py-1 md:text-2xl text-xl px-2 rounded">
                        <i class="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Tidak ada data yang tersedia                     
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RiwayatTagihan;
