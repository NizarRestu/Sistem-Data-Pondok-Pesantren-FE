import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import DashboardAdmin from "./pengurus/DashboardAdmin";
import DashboardSantri from "./santri/DashboardSantri";
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
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
