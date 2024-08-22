import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Master() {
  return (
    <>
      <Sidebar />
      <div className="main-content app-content">
        <Header />
        <div className="container-fluid" style={{ marginTop: "90px" }}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
