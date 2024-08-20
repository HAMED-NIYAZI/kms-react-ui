import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import NotFound from "./components/NotFound/NotFound";
import GradeList from "./views/grades/GradeList";
import GradeCreate from "./views/grades/GradeCreate";
import GradeEdit from "./views/grades/GradeEdit";

function App({ checkLogin }: { checkLogin: boolean }) {
  return (
    <>
      <BrowserRouter>
        <Routes>
          // Roots in which the user must be logged in
          {checkLogin && (
            <>
              //dashboard
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              //auth
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              //grades
              <Route path="/grades" element={<GradeList />} />
              <Route path="/grades/create" element={<GradeCreate />} />
              <Route path="/grades/edit/:id" element={<GradeEdit />} />
              //organizatios
            </>
          )}
          //not found
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    checkLogin: state.userState.checkLogin,
  };
};

export default connect(mapStateToProps)(App);
