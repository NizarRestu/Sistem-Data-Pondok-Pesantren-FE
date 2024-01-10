import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import DashboardAdmin from "./Pengurus/DashboardAdmin";
import DashboardSantri from "./Santri/DashboardSantri";
import PrivateRoute from "./Component/PrivateRoute";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route
            path="/dashboard_admin"
            element={
              <PrivateRoute>
                <DashboardAdmin/>
              </PrivateRoute>
            }
          />
        <Route
            path="/dashboard_santri"
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
