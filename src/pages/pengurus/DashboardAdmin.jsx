import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../component/SidebarAdmin";
import $ from "jquery";
import "datatables.net";
import axios from "axios";
import Chart from "react-apexcharts";
import "./../../assets/styles/datatables.css";

const DashboardAdmin = () => {
  const tableRef = useRef(null);
  const [totalTagihan, setTotalTagihan] = useState([]);
  const [loading, setLoading] = useState(true);
 

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({
      // DataTable options
    });
  };

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: 'donut-chart'
      },
      labels: ['Uang Makan', 'Uang Kitab', 'Uang Jajan', 'Lainnya']
    },
    series: [0, 0, 0, 0]
  });

  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tagihan/all', {
          headers: { 'auth-tgh': `jwt ${localStorage.getItem('token')}` }
        });
        const tagihanData = response.data.data;

        // Calculate series data
        const makanCount = tagihanData.filter((item) => item.jenis_tagihan === 'Uang Makan').length;
        const kitabCount = tagihanData.filter((item) => item.jenis_tagihan === 'Uang Kitab').length;
        const jajanCount = tagihanData.filter((item) => item.jenis_tagihan === 'Uang Jajan').length;
        const lainCount = tagihanData.filter((item) => item.jenis_tagihan === 'Lainnya').length;

        setChartData({
          ...chartData,
          series: [makanCount, kitabCount, jajanCount, lainCount]
        });
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  });

  const [barChartData, setBarChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [],
      },
      colors: ['#15803D'],  // Warna RGB(21, 128, 61)
    },
    series: [
      {
        name: "total tagihan",
        data: [],
      },
    ],
  });
  const [barChartData2, setBarChartData2] = useState({
    options: {
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [],
      },
      colors: ['#15803D'],  // Warna RGB(21, 128, 61)
    },
    series: [
      {
        name: "total transaksi",
        data: [],
      },
    ],
  });

  const getAll = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/tagihan/all`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setTotalTagihan(response.data.data);
  
      // Extracting data for bar chart
      const months = Array.from({ length: 12 }, (_, i) => {
        const month = new Date(2022, i, 1);
        return month.toLocaleString('en-US', { month: 'long' });
      });
  
      const monthlyTotals = months.map((month, index) => {
        const total = response.data.data.reduce((acc, tagihan) => {
          const tagihanMonth = new Date(tagihan.created_date).getMonth();
          return tagihanMonth === index ? acc + 1 : acc;
        }, 0);
        return total;
      });
  
      setBarChartData((prevChartData) => ({
        ...prevChartData,
        options: {
          ...prevChartData.options,
          xaxis: {
            categories: months,
          },
        },
        series: [
          {
            name: "jumlah tagihan",
            data: monthlyTotals,
          },
        ],
      }));
    } catch (error) {
      console.log("get all", error);
    } finally {
      setLoading(false);
    }
  };
  const getAllTransaksi = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/transaksi/all`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
  
      // Extracting data for bar chart
      const months = Array.from({ length: 12 }, (_, i) => {
        const month = new Date(2022, i, 1);
        return month.toLocaleString('en-US', { month: 'long' });
      });
  
      const monthlyTotals = months.map((month, index) => {
        const total = response.data.data.reduce((acc, tagihan) => {
          const tagihanMonth = new Date(tagihan.created_date).getMonth();
          return tagihanMonth === index ? acc + 1 : acc;
        }, 0);
        return total;
      });
  
      setBarChartData2((prevChartData) => ({
        ...prevChartData,
        options: {
          ...prevChartData.options,
          xaxis: {
            categories: months,
          },
        },
        series: [
          {
            name: "jumlah transaksi",
            data: monthlyTotals,
          },
        ],
      }));
    } catch (error) {
      console.log("get all", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAll();
    getAllTransaksi();
  }, []);

  useEffect(() => {
    if (!loading && totalTagihan && totalTagihan.length > 0) {
      initializeDataTable();
    }
  }, [totalTagihan, loading]);

  return (
    <div className="relative min-h-screen md:flex" data-dev-hint="container">
      <SidebarAdmin />
      <main id="content" className="max-h-screen overflow-y-auto flex-1 p-6 lg:px-8">
        <div className="container mx-auto">
          <div className="md:flex justify-around">
            <div className="donut max-w-full md:w-[380px]">
              <Chart options={chartData.options} series={chartData.series} type="donut" width="100%" />
            </div>
            <div className="mixed-chart max-w-full md:w-[380px]">
              <Chart options={barChartData.options} series={barChartData.series} type="bar" width="100%" />
            </div>
            <div className="mixed-chart max-w-full md:w-[380px]">
              <Chart options={barChartData2.options} series={barChartData2.series} type="bar" width="100%" />
            </div>
          </div>
          <div className="overflow-x-auto">
          {loading ? (
              <p>Loading...</p>
            ) : (
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
                   
                  </tr>
                </thead>
                {/* DataTable Body */}
                <tbody>
                  {totalTagihan.length === 0 ? (
                    <tr>
                     <td colSpan="7" className="text-center">
                        Tidak ada data yang tersedia
                      </td>
                    </tr>
                  ) : (
                    totalTagihan.map((tagihan, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{tagihan.nama_tagihan}</td>
                        <td>{tagihan.jenis_tagihan}</td>
                        <td>{tagihan.total_tagihan}</td>
                        <td>{tagihan.created_date}</td>
                        <td>{tagihan.status}</td>
                      
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardAdmin;
