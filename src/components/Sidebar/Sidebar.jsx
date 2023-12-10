/* eslint-disable react/prop-types */
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "/logo/fitbit-logo-01.png";
import DetailsDropdown from "../Modals/DetailsDropdown";

const SidebarContext = createContext();

const Sidebar = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation(); // Get the current location
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Assuming md breakpoint is 768px
    };

    // Initial check on mount
    handleResize();

    // Attach event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <aside
      className={`h-screen transition-all ${
        isMobile
          ? "max-w-[70px] min-w-[70px]"
          : isExpanded
          ? "max-w-[320px] min-w-[200px]"
          : "max-w-[70px] min-w-[70px]"
      }`}
    >
      <nav className="h-full flex flex-col bg-primary text-white border-r shadow-sm w-full">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo}
            className={`overflow-hidden transition-all ${
              isExpanded || isMobile ? "w-40" : "w-0 hidden"
            }`}
            alt=""
          />
          <button
            onClick={() => setIsExpanded((curr) => !curr)}
            className={`p-1 rounded-lg text-black bg-secondary hover:bg-yellow-500 ${
              !isExpanded ? "mx-auto" : ""
            }`}
          >
            {isExpanded ? (
              <ChevronFirst size={15} />
            ) : (
              <ChevronLast size={15} />
            )}
          </button>
        </div>

        <SidebarContext.Provider
          value={{ isExpanded, isMobile, location: location.pathname }}
        >
          <ul className="flex-1 px-3 mt-1">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?name=Veer+Prakash&background=f1c40f&color=2d3436&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              isExpanded || isMobile ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Veer Prakash</h4>
              <span className="text-xs text-gray-400">
                veer.prakashwork@gmail.com
              </span>
            </div>
            <div className="cursor-pointer" onClick={handleDropdownToggle}>
              <MoreVertical size={20} className="relative" />
              {isDropdownOpen && (
                <DetailsDropdown setIsDropdownOpen={setIsDropdownOpen} />
              )}
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export function SidebarItem({ icon, text, alert, to }) {
  const { isExpanded, isMobile, location } = useContext(SidebarContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleItemClick = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        location === to
          ? "bg-gradient-to-tr from-secondary to-yellow-500 text-primary"
          : "hover:bg-gray-600 text-gray-300"
      }`}
      onClick={handleItemClick} // Add click event handler
    >
      {icon && <span>{icon}</span>}
      <span
        className={`overflow-hidden transition-all ${
          isExpanded || isMobile ? "ml-3" : "w-0"
        } ${!icon ? "mr-3" : ""}`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded ${
            isExpanded && !isMobile ? "" : "top-2"
          } ${location === to ? "bg-primary" : "bg-secondary"}`}
        ></div>
      )}

      {(!isExpanded || isMobile) && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-secondary text-primary text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}

export default Sidebar;
