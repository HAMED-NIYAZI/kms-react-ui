import Footer from "./views/layoutes/Footer";
import Header from "./views/layoutes/Header";
import Sidebar from "./views/layoutes/Sidebar";

function App() {
  return (
    <div className="page">
      <Sidebar />
      <div className="main-content app-content">
        <Header />
        <div className="container-fluid"></div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
