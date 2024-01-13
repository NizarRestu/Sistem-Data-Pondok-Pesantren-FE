import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../component/SidebarSantri";
import $ from "jquery";
import "datatables.net";
import axios from "axios";
import Chart from "react-apexcharts";
import "./../assets/styles/datatables.css";

const DashboardSantri = () => {
  const tableRef = useRef(null);
  const [totalTagihan, setTotalTagihan] = useState([]);
  const [makan, setMakan] = useState([]);
  const [kitab, setKitab] = useState([]);
  const [jajan, setJajan] = useState([]);
  const [lain, setLain] = useState([]);

  const [chartOptions, setChartOptions] = useState({
    labels: [],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
          },
        },
      },
    },
  });

  const queryMakan = "Uang Makan";
  const queryKitab = "Uang Kitab";
  const queryJajan = "Uang Jajan";
  const queryLainnya = "Lainnya";

  const [chartSeries, setChartSeries] = useState([]);

  const fetchData = async (url, stateSetter) => {
    try {
      const response = await axios.get(url, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      stateSetter(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUangMakan = async () => {
    fetchData(
      `http://localhost:8000/api/tagihan/santri/${localStorage.getItem("userId")}/jenis_tagihan/${queryMakan}`,
      setMakan
    );
  };

  const getAllUangKitab = async () => {
    fetchData(
      `http://localhost:8000/api/tagihan/santri/${localStorage.getItem("userId")}/jenis_tagihan/${queryKitab}`,
      setKitab
    );
  };

  const getAllUangJajan = async () => {
    fetchData(
      `http://localhost:8000/api/tagihan/santri/${localStorage.getItem("userId")}/jenis_tagihan/${queryJajan}`,
      setJajan
    );
  };

  const getAllLainnya = async () => {
    fetchData(
      `http://localhost:8000/api/tagihan/santri/${localStorage.getItem("userId")}/jenis_tagihan/${queryLainnya}`,
      setLain
    );
  };

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({
      // DataTable options
    });
  };

  useEffect(() => {
    Promise.all([getAllUangMakan(), getAllUangKitab(), getAllUangJajan(), getAllLainnya()]).then(() => {
      const chartSeriesData = [makan.length, kitab.length, jajan.length, lain.length];
      setChartSeries(chartSeriesData);

      const chartLabelsData = ["Uang Makan", "Uang Kitab", "Uang Jajan", "Lainnya"];
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        labels: chartLabelsData,
      }));
    });
  }, [makan, kitab, jajan, lain]);

  useEffect(() => {
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      plotOptions: {
        ...prevOptions.plotOptions,
        pie: {
          ...prevOptions.plotOptions.pie,
          donut: {
            ...prevOptions.plotOptions.pie.donut,
          },
        },
      },
    }));
  }, [chartSeries]);

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

  const getAll = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/tagihan`,
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
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (totalTagihan.length > 0) {
      initializeDataTable();
    }
  }, [totalTagihan]);

  return (
    <div className="relative min-h-screen md:flex" data-dev-hint="container">
      <Sidebar />
      <main id="content" className="max-h-screen overflow-y-auto flex-1 p-6 lg:px-8">
        <div className="container mx-auto">
          <div className="md:flex justify-around">
            <div className="donut max-w-full md:w-[380px]">
              <Chart options={chartOptions} series={chartSeries} type="donut" width="100%" />
            </div>
            <div className="mixed-chart max-w-full md:w-[380px]">
              <Chart options={barChartData.options} series={barChartData.series} type="bar" width="100%" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table id="example_data" className="rounded-sm table-auto min-w-full" ref={tableRef}>
              {/* DataTable Header */}
              <thead className="bg-green-700 text-white">
                <tr>
                  <th>No</th>
                  <th>Nama Tagihan</th>
                  <th>Jenis Tagihan</th>
                  <th>Total Tagihan</th>
                  <th>Tanggal Tagihan</th>
                  <th>Status</th>
                </tr>
              </thead>
              {/* DataTable Body */}
              <tbody>
                {totalTagihan.map((tagihan, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{tagihan.nama_tagihan}</td>
                    <td>{tagihan.jenis_tagihan}</td>
                    <td>{tagihan.total_tagihan}</td>
                    <td>{tagihan.created_date}</td>
                    <td>{tagihan.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardSantri;
