import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBArPage/NavBar";
import Dashboard from "./components/DashBord/DashBord";
import Login from "./components/AuthPage/Login";
import Register from "./components/AuthPage/Register";
import ForgetPassword from "./components/AuthPage/ForgetPassword";
import Footer from "./components/FooterPage/Footer ";
import VerifyEmail from "./pages/VerifyEmail";
import Home from "./components/Home";
import Task from './components/Tasks/PostTask'
import FeedManager from "./components/FeedPage/FeedManager";
function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashbord" element={<Dashboard />} />
        <Route path="/verify-email" element={<VerifyEmail/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/task" element={<Task/>} />
        <Route path="/feed" element={<FeedManager/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
