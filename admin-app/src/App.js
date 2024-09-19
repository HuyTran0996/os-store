import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles/App.scss";
import MainLayout from "./components/MainLayout";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password/:token" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
