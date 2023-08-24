import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useEffect } from "react";
import MyProfile from "./components/MyProfile/MyProfile";
import Movies from "./components/Movies/Movies";
import CategoryManagement from "./components/CategoryManagement/CategoryManagement";
import RoleManagement from "./components/RoleManagement/RoleManagement";
import NotFound from "./components/NotFound/NotFound";
import LoginProvider from "./utils/context/LoginProvider.jsx";
import AdminRoute from "./utils/protectedRoutes/AdminRoute";
<<<<<<< Updated upstream
import {UserLoginContext} from "./utils/context/LoginProvider.jsx";
=======
import { UserLoginContext } from "./utils/context/LoginProvider.jsx";
>>>>>>> Stashed changes
import { useContext, useState } from "react";
import axios from "axios";
import Authenticated from "./utils/protectedRoutes/Authenticated";
import ProfileRoute from "./utils/protectedRoutes/ProfileRoute";
import Login from "./components/Login/Login";
<<<<<<< Updated upstream
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() { 
=======
import ViewRentedMoviesByCurrentUser from "./components/RentedMovies/ViewRentedMoviesByCurrentUser";
function App() {
>>>>>>> Stashed changes
  return (
    <div className="app-container">
      <LoginProvider>
        <Router>
          <MainContent />
        </Router>
        <ToastContainer />
      </LoginProvider>
    </div>
  );

  function MainContent() {
    const [initialized,setInitialized]=useState(false)
    const { isAdmin, setIsAdmin, username, setUsername, token, setToken, isLoggedIn, setIsLoggedIn } = useContext(UserLoginContext);
    useEffect(() => {
      axios.get(`/userInfo`)
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
<<<<<<< Updated upstream
            sessionStorage.setItem('isLoggedIn',true)
        }
        setInitialized(true)
      })
      .catch(error => {
        setIsAdmin(false);
        setUsername(null);
        setToken(null);
        setIsLoggedIn(false);
        console.error("Error fetching userInfo:", error);
        setInitialized(true)
      });
    }, []);

   if(!initialized) return;

=======
            sessionStorage.setItem('isLoggedIn', true)
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
>>>>>>> Stashed changes
    if (isLoggedIn) {
      return (
        <>
          <div className="h-screen">
            <Navbar />
          </div>
          <Routes>
            <Route element={<Authenticated />}>

              <Route index path="/" element={<Movies />} />

              <Route path="/myrentedmovies" element={<ViewRentedMoviesByCurrentUser />}/>  
                         
              <Route element={<ProfileRoute />}>
                <Route path="/myprofile/:id" element={<MyProfile />} />
              </Route>

              <Route element={<AdminRoute />}>
                <Route path="/categoryManagement" element={<CategoryManagement />} />
              </Route>

              <Route element={<AdminRoute />}>
                <Route path="/roleManagement" element={<RoleManagement />} />
              </Route>
            </Route>

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </>
      );
    } else {
      return (
        <Routes>
          <Route element={<Login />} index="/login" />
        </Routes>
      );
    }
  }
}

export default App;