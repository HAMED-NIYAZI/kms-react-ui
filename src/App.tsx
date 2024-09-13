import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import NotFound from "./components/NotFound/NotFound";
import GradeList from "./components/Grades/GradeList";
import GradeCreate from "./components/Grades/GradeCreate";
import GradeEdit from "./components/Grades/GradeEdit";
import OrganizationList from "./components/Organization/OrganizationList";
import OrganizationCreate from "./components/Organization/OrganizationCreate";
import OrganizationEdit from "./components/Organization/OrganizationEdit";
import Profile from "./components/Profile/Profile";
import KnowledgeFieldPage from "./components/KnowledgeField/KnowledgeFieldPage";
import KnowledgeFieldCreate from "./components/KnowledgeField/KnowledgeFieldCreate";
import KnowledgeFieldEdit from "./components/KnowledgeField/KnowledgeFieldEdit";
import Master from "./components/Layoutes/Master";
<<<<<<< Updated upstream
import HomePageSetting from "./components/HomePageSetting/HomePageSetting";
=======
import ChartList from "./components/Chart/ChartList";
import ChartCreate from "./components/Chart/ChartCreate";
import ChartEdit from "./components/Chart/ChartEdit";
>>>>>>> Stashed changes

export type AppProps = { checkLogin: boolean };

function App({ checkLogin }: AppProps) {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*Roots in which the user must be logged in*/}
          {checkLogin && (
            <>
              {/*dashboard*/}
              <Route path="/" element={<Master />}>
                <Route path="/dashboard" element={<Dashboard />} />
                {/*grades*/}
                <Route path="/grades" element={<GradeList />} />
                <Route path="/grades/create" element={<GradeCreate />} />
                <Route path="/grades/edit/:id" element={<GradeEdit />} />
                {/*organizations*/}
                <Route path="/organizations" element={<OrganizationList />} />
                <Route
                  path="/organizations/create"
                  element={<OrganizationCreate />}
                />
                <Route
                  path="/organizations/edit/:id"
                  element={<OrganizationEdit />}
                />
                {/*chart*/}
                <Route path="/charts" element={<ChartList />} />
                <Route path="/charts/create" element={<ChartCreate />} />
                <Route path="/charts/edit/:id" element={<ChartEdit />} />
                {/*profile*/}
                <Route path="/profile" element={<Profile />} />
                {/*KnowledgeFieldPage*/}
                <Route
                  path="/KnowledgeFieldPage"
                  element={<KnowledgeFieldPage />}
                />
                <Route
                  path="/KnowledgeFieldPage/Create"
                  element={<KnowledgeFieldCreate />}
                />
                <Route
                  path="/KnowledgeFieldPage/Edit/:id"
                  element={<KnowledgeFieldEdit />}
                />
                {/* HomePageSetting */}
                <Route path="/HomePageSetting" element={<HomePageSetting />} />
              </Route>
            </>
          )}
          {/*auth*/}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          {/*not found*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    checkLogin: state.userState.checkLogin,
  };
};

export default connect(mapStateToProps)(App);
