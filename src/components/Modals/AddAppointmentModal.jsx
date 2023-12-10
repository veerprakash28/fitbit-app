/* eslint-disable no-unused-vars */
import { Dialog, Transition } from "@headlessui/react";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Fragment, useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Trash2, Edit } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const AddAppointmentModal = ({
  isOpen,
  setIsOpen,
  selectedData,
  clientIndex,
  onSubmit,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    appointments: [],
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    location: "",
    appointments: "",
  });

  useEffect(() => {
    // Populate form data when selectedData changes
    if (selectedData) {
      setFormData({
        firstName: selectedData.firstName,
        lastName: selectedData.lastName,
        location: selectedData.location,
        appointments: selectedData.appointments,
      });
    }
  }, [selectedData]);

  function closeModal() {
    setIsOpen(false);
    resetForm();
  }

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      location: "",
      appointments: [],
    });
    setErrors({
      firstName: "",
      lastName: "",
      location: "",
      appointments: "",
    });
    setSelectedDate(null);
  };

  const validateForm = () => {
    let isValid = true;

    const newErrors = {
      firstName: "",
      lastName: "",
      location: "",
      appointments: "",
    };

    if (formData.firstName.trim() === "") {
      newErrors.firstName = "First Name is required";
      isValid = false;
    }

    if (formData.lastName.trim() === "") {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    }

    if (formData.location.trim() === "") {
      newErrors.location = "Location is required";
      isValid = false;
    }

    // if (formData.appointments.length === 0) {
    //   newErrors.appointments = "At least one appointment is required";
    //   isValid = false;
    // }

    setErrors(newErrors);

    return isValid;
  };

  const handleEditClient = () => {
    if (validateForm()) {
      const editedClient = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        location: formData.location,
        appointments: formData.appointments,
      };

      // Handle the edited client data (e.g., make an API call)
      onSubmit(editedClient, clientIndex);
      setIsOpen(false);
      resetForm();
    } else {
      // toast.error("Please fill in all the required fields");
    }
  };

  const handleAddAppointment = () => {
    if (selectedDate) {
      const date = selectedDate.format();
      setFormData({
        ...formData,
        appointments: [...formData.appointments, { date }],
      });
      setSelectedDate(null); // Clear the selected date for the next appointment
    }
  };

  const handleDeleteAppointment = (index) => {
    const updatedAppointments = [...formData.appointments];
    updatedAppointments.splice(index, 1);
    setFormData({
      ...formData,
      appointments: updatedAppointments,
    });
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className=" z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Manage Appointments
                  </Dialog.Title>
                  {/* Responsive Form */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* First Name */}
                    <div className="mt-4">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        className="mt-1 p-2 w-full border-gray-300 rounded-md bg-gray-100"
                      />
                      <span className="text-red-500">{errors.firstName}</span>
                    </div>
                    {/* Last Name */}
                    <div className="mt-4">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        className="mt-1 p-2 w-full border-gray-300 rounded-md bg-gray-100"
                      />
                      <span className="text-red-500">{errors.lastName}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="mt-1 p-2 w-full border-gray-300 rounded-md bg-gray-100"
                    />
                    <span className="text-red-500">{errors.location}</span>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="appointments"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Appointments
                    </label>
                    {formData.appointments.map((appointment, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <p className="mr-2">
                          {dayjs(appointment.date).format(
                            "DD MMM YYYY - h:mm A"
                          )}
                        </p>
                        <button
                          type="button"
                          className="text-red-500 ml-auto mr-2"
                          onClick={() => handleDeleteAppointment(index)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                    <div className="relative">
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        className="relative"
                      >
                        <MobileDateTimePicker
                          defaultValue={dayjs(formData.appointmentDate)}
                          onChange={(date) => setSelectedDate(date)}
                          className="mt-1 p-2 w-full border-gray-300 rounded-md bg-gray-100"
                        />
                        <button
                          type="button"
                          className="absolute right-2 bottom-3.5 flex items-center justify-center text-primary"
                          onClick={handleAddAppointment}
                        >
                          <span className="text-lg bg-primary px-2 text-secondary rounded-md">
                            +
                          </span>
                        </button>
                      </LocalizationProvider>
                    </div>
                    <span className="text-xs text-gray-400 flex justify-end mt-1">
                      MM/DD/YYYY
                    </span>
                    <span className="text-red-500">{errors.appointments}</span>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-400 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-secondary hover:bg-secondary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleEditClient}
                    >
                      Save Changes
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddAppointmentModal;
