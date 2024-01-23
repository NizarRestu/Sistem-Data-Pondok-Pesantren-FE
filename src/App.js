import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardAdmin from "./pages/pengurus/DashboardAdmin";
import DashboardSantri from "./pages/santri/DashboardSantri";
import TagihanUangMakan from "./pages/santri/TagihanUangMakan";
import Transaksi from "./pages/santri/Transaksi";
import TagihanUangJajan from "./pages/santri/TagihanUangJajan";
import TagihanUangKitab from "./pages/santri/TagihanUangKitab";
import TagihanUangLainnya from "./pages/santri/TagihanUangLainnya";
import TransaksiAll from "./pages/santri/TransaksiAll";
import RiwayatTagihan from "./pages/santri/RiwayatTagihan";
import Pembayaran from "./pages/pengurus/Pembayaran";
import PembayaranDetail from "./pages/pengurus/PembayaranDetail";
import Tagihan from "./pages/pengurus/Tagihan";
import TambahTagihan from "./pages/pengurus/TambahTagihan";
import HistoryTagihan from "./pages/pengurus/HistoryTagihan";

import PrivateRoute from "./component/PrivateRoute";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sistem_pondok/daftar" element={<Register />} />
        <Route
            path="/sistem_pondok/dashboard_admin"
            element={
              <PrivateRoute>
                <DashboardAdmin/>
              </PrivateRoute>
            }
          />
        <Route
            path="/sistem_pondok/dashboard_santri"
            element={
              <PrivateRoute>
                <DashboardSantri/>
              </PrivateRoute>
            }
          />
        <Route
            path="/sistem_pondok/tagihan_uang_makan"
            element={
              <PrivateRoute>
                <TagihanUangMakan/>
              </PrivateRoute>
            }
          />
        <Route
            path="/sistem_pondok/tagihan_uang_kitab"
            element={
              <PrivateRoute>
                <TagihanUangKitab/>
              </PrivateRoute>
            }
          />
        <Route
            path="/sistem_pondok/tagihan_uang_jajan"
            element={
              <PrivateRoute>
                <TagihanUangJajan/>
              </PrivateRoute>
            }
          />
        <Route
            path="/sistem_pondok/tagihan_uang_lainnya"
            element={
              <PrivateRoute>
                <TagihanUangLainnya/>
              </PrivateRoute>
            }
          />
        <Route
            path="/sistem_pondok/transaksi/:id"
            element={
              <PrivateRoute>
                <Transaksi/>
              </PrivateRoute>
            }
          />
        <Route
            path="/sistem_pondok/transaksi"
            element={
              <PrivateRoute>
                <TransaksiAll/>
              </PrivateRoute>
            }
          />
        <Route
            path="/sistem_pondok/riwayat_tagihan"
            element={
              <PrivateRoute>
                <RiwayatTagihan/>
              </PrivateRoute>
            }
          />
        <Route
            path="/sistem_pondok/pembayaran"
            element={
              <PrivateRoute>
                <Pembayaran/>
              </PrivateRoute>
            }
          />
        <Route
            path="/sistem_pondok/pembayaran/:id"
            element={
              <PrivateRoute>
                <PembayaranDetail/>
              </PrivateRoute>
            }
          />
        <Route
            path="/sistem_pondok/tagihan"
            element={
              <PrivateRoute>
                <Tagihan/>
              </PrivateRoute>
            }
          />
        <Route
            path="/sistem_pondok/tambah_tagihan"
            element={
              <PrivateRoute>
                <TambahTagihan/>
              </PrivateRoute>
            }
          />
        <Route
            path="/sistem_pondok/history_tagihan"
            element={
              <PrivateRoute>
                <HistoryTagihan/>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
