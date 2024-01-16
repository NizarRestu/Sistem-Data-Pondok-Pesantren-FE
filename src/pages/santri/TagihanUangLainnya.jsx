import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../component/SidebarSantri";
import $ from "jquery";
import "datatables.net";
import axios from "axios";
import "./../../assets/styles/datatables.css";

const TagihanUangLainnya = () => {
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
  const queryLainnya = "LaiNnya";
  const getAll = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/tagihan/santri/${localStorage.getItem(
          "userId"
        )}/jenis_tagihan/${queryLainnya}/status/Belum`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setTotalTagihan(response.data);
    } catch (error) {
      console.log("get all", error);
    }
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
                        <a href={"/sistem_pondok/transaksi_uang_makan/" + tagihan.id}>
                        <button className="text-font-bold text-lime-500 py-1 md:text-2xl text-xl px-2 rounded">
                          <i className="fa-regular fa-money-bill-1"></i>
                        </button>
                        </a>
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

export default TagihanUangLainnya;
