import { Button, Chip, Fab, Stack } from "@mui/material";
import { useEffect, useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

export default function Calendar({
  appointments,
  appointment,
  setAppointment,
}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [disabled, setDisabled] = useState({ date: null, times: [] });
  const [selectedTime, setSelectedTime] = useState(null);

  const workingHours = [];
  for (let i = 9; i < 17; i++) {
    const hour = i < 10 ? `0${i}` : `${i}`;
    const time1 = dayjs(`${hour}:00:00`, "HH:mm:ss").format("HH:mm");
    const time2 = dayjs(`${hour}:30:00`, "HH:mm:ss").format("HH:mm");
    workingHours.push(time1, time2);
  }
  useEffect(() => {
    appointments.forEach((appointment) => {
      const appointmentDate = dayjs(appointment.appointmentOn);
      const date = appointmentDate.format("YYYY-MM-DD");
      const time = appointmentDate.format("HH:mm");

      setDisabled((prevDisabled) => {
        if (!prevDisabled[date]) {
          return { ...prevDisabled, [date]: [time] };
        } else {
          return { ...prevDisabled, [date]: [...prevDisabled[date], time] };
        }
      });
    });
  }, []);

  const getSelectedDateTimes = (selectedDate) => {
    const date = dayjs(selectedDate).format("YYYY-MM-DD");
    return disabled[date] || [];
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const shouldDisableDate = (date) => {
    return date.day() === 0 || date.day() === 6;
  };

  const handleAccept = (time) => {
    let timeObject = dayjs(time, "HH:mm");
    let date = dayjs(selectedDate)
      .set("hour", timeObject.hour())
      .set("minute", timeObject.minute())
      .add(3, "hour");

    setAppointment(date.toISOString());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction={"row"} display={"flex"}>
        <DateCalendar
          defaultValue={dayjs("2024-05-28")}
          shouldDisableDate={shouldDisableDate}
          onChange={handleDateChange}
        />
      </Stack>
      {selectedDate && (
        <Stack alignSelf={"center"} direction={"row"} spacing={1}>
          {workingHours.map((time, index) => {
            const disabledTimes = getSelectedDateTimes(selectedDate);
            const isDisabled = disabledTimes.includes(time);
            const isSelected = time === selectedTime;

            return (
              <Fab
                key={index}
                color={isSelected ? "primary" : "success"}
                size="large"
                sx={{
                  padding: 4,
                  backgroundColor: isSelected
                    ? (theme) => theme.palette.primary
                    : "default",
                }}
                onClick={() => {
                  handleAccept(time);
                  setSelectedTime(time);
                }}
                disabled={isDisabled}
              >
                {time}
              </Fab>
            );
          })}
        </Stack>
      )}
    </LocalizationProvider>
  );
}

