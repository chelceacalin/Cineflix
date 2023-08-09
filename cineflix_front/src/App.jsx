import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MyProfile from './components/MyProfile/MyProfile'
import Movies from './components/Movies/Movies'
import CategoryManagement from "./components/CategoryManagement/CategoryManagement";
import RoleManagement from "./components/RoleManagement/RoleManagement";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return(
    <div className="app-container">
      <Router>

      <MainContent/>

      </Router>

    </div>

  )


  function MainContent(){

  return (
    <>
      <Navbar />
        <Routes>
          <Route index path="/" element={<Movies />} />
          <Route path="/myprofile/:id" element={<MyProfile />} />
          <Route path="/categoryManagement" element={<CategoryManagement />} />
          <Route path="/roleManagement" element={<RoleManagement />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
    </>

  );
}
}


export default App;
