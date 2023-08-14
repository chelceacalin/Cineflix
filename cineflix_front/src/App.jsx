import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import MyProfile from "./components/MyProfile/MyProfile";
import Movies from "./components/Movies/Movies";
import CategoryManagement from "./components/CategoryManagement/CategoryManagement";
import RoleManagement from "./components/RoleManagement/RoleManagement";
import NotFound from "./components/NotFound/NotFound";
import LoginProvider from "./utils/context/LoginProvider.jsx";
import AdminRoute from "./utils/protectedRoutes/AdminRoute";

function App() {
  return (
    <div className="app-container">
      <LoginProvider>
        <Router>
          <MainContent />
        </Router>
      </LoginProvider>
    </div>
  );

  function MainContent() {
    return (
      <>
        <Navbar />
        <Routes>

          <Route index path="/" element={<Movies />} />

          <Route path="/myprofile/:id" element={<MyProfile />} />
          <Route element={<AdminRoute />}>
            <Route
              path="/categoryManagement"
              element={<CategoryManagement />}
            />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/roleManagement" element={<RoleManagement />} />
          </Route>

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </>
    );
  }
}

export default App;
