import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-all duration-500 ease-in-out">
        <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
