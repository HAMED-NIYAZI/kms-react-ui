import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import Dashboard from "./views/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import NotFound from "./components/NotFound";
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
              <Route path="/dashboard" element={<Dashboard />} />
              //grades
              <Route path="/grades" element={<GradeList />} />
              <Route path="/grades/create" element={<GradeCreate />} />
              <Route path="/grades/edit/:id" element={<GradeEdit />} />
              //organizatios
            </>
          )}
          //Roots in which the user should not be logged in
          {checkLogin === false && (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
          //not found
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
