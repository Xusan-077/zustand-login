import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className=" min-h-screen flex flex-col justify-between">
      <div className="">
        <Header />
        <main className="mb-10">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
