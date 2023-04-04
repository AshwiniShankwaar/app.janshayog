import './App.css';
import { ToastContainer } from 'react-toastify';
import { Routes, Route} from 'react-router-dom';
import Login from './components/login/Login.js';
import Registration from './components/register/Register.js';
import Dashboard from './components/dashboard/Dashboard.js';
import Home from './components/startpage/home.js';
import ServerHome from "./components/serverhome.js";
import Verify from "./components/verifyToken/verify.js";
import ForgotPassword from "./components/forgotPassword/ForgetPassword.js";
import SetPassword from "./components/setPassword/SetPassword.js";
import Profile from "./components/profile/Profile.js";
import ViewProfile from './components/viewProfile/ViewProfile';
function App() {
  return (
    <div className="App">
      <ToastContainer ></ToastContainer>
      <Routes>
      <Route exact path="/home/:type" element={<Home/>}></Route>
         <Route exact path="/login/:type" element={<Login/>}></Route>
         <Route exact path="/register/:type" element={<Registration/>}></Route>
         <Route exact path="/dashboard" element={<Dashboard/>}></Route>
         <Route exact path="/verify" element={<Verify/>}></Route>
         <Route exact path="/forgotPassword" element={<ForgotPassword/>}></Route>
         <Route exact path="/setPassword" element={<SetPassword/>}></Route>
         <Route exact path="/editProfile" element={<Profile/>}></Route>
         <Route exact path="/profile" element={<ViewProfile/>}></Route>

         <Route path='*' element={<ServerHome/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
