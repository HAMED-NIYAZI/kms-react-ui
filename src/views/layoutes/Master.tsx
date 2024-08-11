import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Master() {
  return (
    <div className="page">
      <Sidebar />
      <div className="main-content app-content">
        <Header />
        <div className="container-fluid page1">
          {/* <router-view></router-view> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
