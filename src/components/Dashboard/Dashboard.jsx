// Dashboard.jsx
import TopBar from "../TopBar/TopBar";
import NoClientFound from "../../assets/lottie/NoClientFound";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import AddClient from "../Modals/AddClientModal";
import AllClientsList from "./AllClientsList";

const Dashboard = () => {
  const [allClients, setAllClients] = useState([]);
  const [addClientModal, setAddClientModal] = useState(false);

  useEffect(() => {
    const allClients = JSON.parse(localStorage.getItem("allClients"));
    setAllClients(allClients || []);
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen">
        <TopBar />
        {allClients.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center">
            <NoClientFound />
            <Button
              variant="contained"
              style={{ backgroundColor: "#2d3436", color: "#f1c40f" }}
              className="w-fit cursor-pointer "
              onClick={() => setAddClientModal(true)}
            >
              Add New Client
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex items-center mt-8 px-4">
              <div className="font-bold text-xl">All Clients</div>
              <div className="ml-auto">
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#2d3436", color: "#f1c40f" }}
                  className="w-fit cursor-pointer "
                  onClick={() => setAddClientModal(true)}
                >
                  Add New Client
                </Button>
              </div>
            </div>

            <AllClientsList data={allClients} setData={setAllClients} />
          </div>
        )}
      </div>
      <AddClient
        isOpen={addClientModal}
        setIsOpen={setAddClientModal}
        setData={setAllClients}
      />
    </>
  );
};

export default Dashboard;
