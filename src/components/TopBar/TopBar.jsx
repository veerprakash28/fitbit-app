import { useLocation } from "react-router-dom";

const TopBar = () => {
  const location = useLocation();
  const renderTitle = () =>
    location.pathname === "/" ? "Dashboard" : "Calendar";

  return (
    <div className="flex items-center border-b pb-2">
      <div className="font-medium">{renderTitle()}</div>
      <div className="text-xs text-primary ml-auto text-right">
        FitBit - A Fitness Trainer Appointment Scheduling Website
      </div>
    </div>
  );
};

export default TopBar;
