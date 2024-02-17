import { Outlet } from "react-router-dom";
import Navbar from "../components/organisms/navbar";
import Footer from "../components/organisms/footer";

export default function Root() {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>
      <div id="children" className="flex-grow bg-blue-600">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}