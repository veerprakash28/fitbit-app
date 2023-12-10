import { Calendar, LayoutDashboard } from "lucide-react";
import Sidebar, { SidebarItem } from "./components/Sidebar/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import CalendarPage from "./components/Calendar/CalendarPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar className="">
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text={"Dashboard"}
            active={false}
            to="/"
          />
          <SidebarItem
            icon={<Calendar size={20} />}
            text={"View Calendar"}
            alert
            active={true}
            to="/calendar"
          />
        </Sidebar>

        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
