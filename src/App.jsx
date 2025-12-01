import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";

import Layout from "./pages/Layout";
import PrivateLayout from "./pages/PrivateLayout";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Private from "./components/Private";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import PrivateProducts from "./components/PrivateProducts";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
        </Route>

        <Route element={<Private />}>
          <Route path="/profile" element={<PrivateLayout />}>
            <Route path="products" element={<PrivateProducts />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
