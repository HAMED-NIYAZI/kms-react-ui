import Footer from "../../components/layoutes/Footer";
import Header from "../../components/layoutes/Header";
import Sidebar from "../../components/layoutes/Sidebar";
export default function Master(props: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="main-content app-content">
        <Header />
        <div className="container-fluid">{props.children}</div>
      </div>
      <Footer />
    </>
  );
}
