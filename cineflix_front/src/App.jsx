import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import MyProfile from "./components/MyProfile/MyProfile";
import Movies from "./components/Movies/Movies";
import CategoryManagement from "./components/CategoryManagement/CategoryManagement";
import RoleManagement from "./components/RoleManagement/RoleManagement";
import NotFound from "./components/NotFound/NotFound";
import LoginProvider from "./utils/context/LoginProvider.jsx";
import AdminRoute from "./utils/protectedRoutes/AdminRoute";
import {UserLoginContext} from "./utils/context/LoginProvider.jsx";
import { useContext,useState } from "react";
import axios from "axios";
import Authenticated from "./utils/protectedRoutes/Authenticated";
import ProfileRoute from "./utils/protectedRoutes/ProfileRoute";

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
    const { isAdmin, setIsAdmin, username, setUsername, token, setToken, isLoggedIn, setIsLoggedIn } = useContext(UserLoginContext);
    useEffect(() => {
      axios.get(`http://localhost:8081/userInfo`)
      .then((response) => {
        if (response.status === 200) {
          const userInfo = response.data;
            if (userInfo.role === "ADMIN") {
              setIsAdmin(true);
            }
            else {
              setIsAdmin(false);
            }
  
            setUsername(userInfo.username);
            setToken(userInfo.token);
            setIsLoggedIn(true);
        }
      })
      .catch(error => {
        setIsAdmin(false);
        setUsername(null);
        setToken(null);
        setIsLoggedIn(false);
        
        console.error("Error fetching userInfo:", error);
      });
    }, [])
  
    return (
      <>
        <Navbar />
        <Routes>

          {/* <Route element={<Authenticated/>}> */}
            <Route index path="/" element={<Movies />} />

            <Route element={<ProfileRoute/>}>
              <Route path="/myprofile/:id" element={<MyProfile />} />
            </Route>

            <Route element={<AdminRoute />}>
              <Route
                path="/categoryManagement"
                element={<CategoryManagement />}
              />
            </Route>

            <Route element={<AdminRoute />}>
              <Route path="/roleManagement" element={<RoleManagement />} />
            </Route>
          {/* </Route> */}

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </>
    );
  }
}

export default App;
