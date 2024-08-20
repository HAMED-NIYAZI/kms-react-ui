import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
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
