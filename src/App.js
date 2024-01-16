import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardAdmin from "./pages/pengurus/DashboardAdmin";
import DashboardSantri from "./pages/santri/DashboardSantri";
import TagihanUangMakan from "./pages/santri/TagihanUangMakan";
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
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
