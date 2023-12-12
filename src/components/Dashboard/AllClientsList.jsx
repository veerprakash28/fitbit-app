import dayjs from "dayjs";
import { CalendarMinus, CalendarPlus, UserX } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import AddAppointmentModal from "../Modals/AddAppointmentModal";
import DeleteUserConfirmation from "../Modals/DeleteUserConfirmation";

const AllClientsList = ({ data, setData }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [deletingAppointment, setDeletingAppointment] = useState(null);
  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false);
  const [isDeleteUser, setIsDeleteUser] = useState(false);
  const [clientIndex, setClientIndex] = useState(null);

  // Open the Edit Client Modal
  const openEditClientModal = () => {
    setIsAddAppointmentOpen(true);
  };

  // Function to Manage Appointments for Clients
  const handleManageAppointment = (updatedData, clientIndex) => {
    // Update the existing data with the updatedData
    const updatedClients = data.map((client, index) =>
      index === clientIndex ? updatedData : client
    );

    // Store the updated data in localStorage

    localStorage.setItem("allClients", JSON.stringify(updatedClients));
    setData([...updatedClients]);

    // Show a success toast
    toast.success("Appointment updated successfully");
  };

  //   Delete Appointments Confirmation
  const handleDeleteAppointment = (clientIndex, appIndex) => {
    setDeletingAppointment({ clientIndex, appIndex });
    setConfirmationOpen(true);
  };

  // Function to Delete Appointments
  const confirmDeleteAppointment = () => {
    const { clientIndex, appIndex } = deletingAppointment;
    const updatedData = [...data];
    updatedData[clientIndex].appointments.splice(appIndex, 1);
    toast.success("Appointment Deleted Successfully!");
    setConfirmationOpen(false);
  };

  const cancelDeleteAppointment = () => {
    setConfirmationOpen(false);
    setDeletingAppointment(null);
  };

  // Function to Delete User
  const handleDeleteUser = () => {
    const updatedData = [...data];
    updatedData.splice(clientIndex, 1);
    localStorage.setItem("allClients", JSON.stringify(updatedData));
    setData([...updatedData]);
    setIsDeleteUser(false);
    toast.success("User Deleted Successfully!");
  };

  return (
    <div className="overflow-x-auto mt-4">
      <div className="max-w-screen-xl mx-auto">
        <table
          className="w-full table-auto border rounded-lg overflow-hidden"
          cellSpacing={0}
        >
          <thead className="">
            <tr>
              <th className="px-4 py-2 text-left"> # </th>
              <th className="px-4 py-2 text-left"> Name </th>
              <th className="px-4 py-2 text-left"> Location </th>
              <th className="px-4 py-2 text-left"> Appointments </th>
              <th className="px-4 py-2 text-left"> Actions </th>
            </tr>
          </thead>
          <tbody>
            {data.map((client, clientIndex) => (
              <tr
                key={clientIndex}
                className={`${
                  clientIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200 transition-all rounded-lg`}
              >
                <td className="px-4 py-2 text-left">{clientIndex + 1}</td>
                <td className="px-4 py-2 text-left">
                  {client.firstName} {client.lastName}
                </td>
                <td className="px-4 py-2">{client.location}</td>
                <td className="px-4 py-2">
                  {client?.appointments?.length > 0 ? (
                    <ul>
                      {client.appointments.map((appointment, appIndex) => (
                        <li key={appIndex} className="flex items-center mb-1">
                          {dayjs(appointment.date).format(
                            "DD MMM YYYY | h:mm A"
                          )}
                          <span
                            className="ml-2 text-red-500 cursor-pointer"
                            onClick={() =>
                              handleDeleteAppointment(clientIndex, appIndex)
                            }
                          >
                            <CalendarMinus
                              size={16}
                              color="#d91e18"
                              strokeWidth={1.5}
                            />
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex items-center">
                      No Appointments Scheduled
                    </div>
                  )}
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <div className="cursor-pointer mx-2">
                      <CalendarPlus
                        size={20}
                        color="#2d3436"
                        strokeWidth={1.5}
                        onClick={() => {
                          setSelectedClient(client);
                          setClientIndex(clientIndex);
                          openEditClientModal(); // Open the edit client modal
                        }}
                      />
                    </div>
                    <div className="cursor-pointer">
                      <UserX
                        size={20}
                        color="#d91e18"
                        strokeWidth={1.5}
                        onClick={() => {
                          setSelectedClient(client);
                          setClientIndex(clientIndex);
                          setIsDeleteUser(true);
                        }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {isConfirmationOpen && (
        <DeleteConfirmationModal
          confirmDeleteAppointment={confirmDeleteAppointment}
          cancelDeleteAppointment={cancelDeleteAppointment}
        />
      )}

      {/* Edit Client Modal */}
      {isAddAppointmentOpen && (
        <AddAppointmentModal
          isOpen={isAddAppointmentOpen}
          setIsOpen={setIsAddAppointmentOpen}
          selectedData={selectedClient}
          clientIndex={clientIndex}
          onSubmit={handleManageAppointment}
        />
      )}

      {/* DELETE USER MODAL */}
      {isDeleteUser && (
        <DeleteUserConfirmation
          setIsOpen={setIsDeleteUser}
          selectedData={selectedClient}
          handleDeleteUser={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default AllClientsList;
