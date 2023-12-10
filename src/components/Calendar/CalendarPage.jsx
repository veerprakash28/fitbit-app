import { Typography } from "@mui/material";
import TopBar from "../TopBar/TopBar";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import NoAppointmentsFound from "../../assets/lottie/NoAppointmentsFound";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments from localStorage based on the selected date
    const fetchAppointments = () => {
      const storedAppointments =
        JSON.parse(localStorage.getItem("allClients")) || [];
      const formattedDate = selectedDate.format("YYYY-MM-DD");

      const filteredAppointments = storedAppointments.reduce(
        (result, client) => {
          const clientAppointments = client.appointments.filter(
            (appointment) =>
              dayjs(appointment.date).format("YYYY-MM-DD") === formattedDate
          );

          if (clientAppointments.length > 0) {
            result.push({
              clientName: `${client.firstName} ${client.lastName}`,
              location: client.location,
              appointments: clientAppointments,
            });
          }

          return result;
        },
        []
      );

      setAppointments(filteredAppointments);
    };

    fetchAppointments();
  }, [selectedDate]);

  return (
    <div className="flex flex-col w-full">
      <TopBar />

      <div>
        <div className="flex items-center mt-8 px-4">
          <div className="font-bold text-xl">Scheduled Appointments</div>
          <div className="ml-auto">
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              className="relative"
            >
              <MobileDatePicker
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="mt-1 p-2 w-full rounded-md bg-gray-100"
                renderInput={(params) => <input {...params.inputProps} />}
              />
            </LocalizationProvider>
            <span className="text-xs text-gray-400 flex justify-end mt-1">
              MM/DD/YYYY
            </span>
          </div>
        </div>
        <div className="mt-4 px-4">
          {appointments.length > 0 ? (
            appointments.map((client, index) => (
              <div
                key={index}
                className={`mb-6 border-l-4 pl-3 flex items-end ${
                  index % 2 === 0 ? "border-secondary" : "border-primary"
                }`}
              >
                <div>
                  <Typography variant="h6">{client.clientName}</Typography>
                  <ul>
                    {client.appointments.map((appointment, appIndex) => (
                      <li key={appIndex}>
                        {dayjs(appointment.date).format("DD MMM YYYY | h:mm A")}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="ml-auto pr-4 font-semibold text-primary">
                  {client.location}
                </div>
              </div>
            ))
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center">
              <NoAppointmentsFound />
              <div className="text-xs lg:text-base mt-2">
                No appointments found for the selected date.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
