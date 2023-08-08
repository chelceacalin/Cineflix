// App.js
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MyProfile from './components/MyProfile/MyProfile'
import Movies from './components/Movies/Movies'


function App() {
  return (
    <div className="app-container">

    <Navbar />

      <Router>
        <Routes>
          
        <Route index path="/" element={<Movies />} />
          <Route path="/myprofile/:id" element={<MyProfile />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
