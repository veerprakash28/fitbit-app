// Dashboard.jsx
import TopBar from "../TopBar/TopBar";
import NoClientFound from "../../assets/lottie/NoClientFound";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import AddClient from "../Modals/AddClientModal";
import AllClientsList from "./AllClientsList";
import { Search } from "lucide-react";

const Dashboard = () => {
  const [allClients, setAllClients] = useState([]);
  const [addClientModal, setAddClientModal] = useState(false);
  const [search, setSearch] = useState("");

  // Function to Fetch Data and show Search Value
  useEffect(() => {
    const storedClients = JSON.parse(localStorage.getItem("allClients"));
    if (!search) {
      setAllClients(storedClients || []);
    } else {
      const searchRes = storedClients.filter((item) =>
        `${item.firstName} ${item.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
      setAllClients(searchRes);
    }
  }, [search]);

  return (
    <>
      <div className="flex flex-col h-screen">
        <TopBar />
        {allClients.length === 0 && search?.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center">
            <NoClientFound />
            <Button
              variant="contained"
              style={{ backgroundColor: "#2d3436", color: "#f1c40f" }}
              className="w-fit cursor-pointer"
              onClick={() => setAddClientModal(true)}
            >
              Add New Client
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex items-center mt-8 px-4">
              <div className="font-bold text-xl">All Clients</div>
              <div className="flex items-center ml-auto">
                <div className="flex items-center bg-gray-100 relative rounded-md mr-2">
                  <input
                    type="text"
                    placeholder="Search By Name"
                    id="search"
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-gray-100 rounded-md ring-0 px-2 py-1.5"
                  />
                  <Search
                    size={15}
                    color="#2d3436"
                    strokeWidth={1.5}
                    className="absolute right-2"
                  />
                </div>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#2d3436", color: "#f1c40f" }}
                  className="w-fit cursor-pointer"
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
