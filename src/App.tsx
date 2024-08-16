import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import Dashboard from "./views/Dashboard";
import Footer from "./views/layoutes/Footer";
import Header from "./views/layoutes/Header";
import Sidebar from "./views/layoutes/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="page">
      <BrowserRouter>
        <Sidebar />
        <div className="main-content app-content">
          <Header />
          <div className="container-fluid">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
