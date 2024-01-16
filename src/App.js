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
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
