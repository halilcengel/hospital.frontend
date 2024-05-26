import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useState } from "react";

export default function Calendar({ appointment, setAppointment }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const disabledDays = ["2024-05-25T11:30:00.000Z"].map((date) => dayjs(date));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const shouldDisableDate = (date) => {
    disabledDays.some((disabledDate) => disabledDate.isSame(date, "day"));
  };

  const handleAccept = (time) => {
    setSelectedTime(time);
    let date = dayjs(selectedDate)
      .set("hour", time.hour())
      .set("minute", time.minute());
    setAppointment(date.toISOString());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={dayjs("2024-05-26")}
        shouldDisableDate={shouldDisableDate}
        onChange={handleDateChange}
      />
      {selectedDate && (
        <TimePicker value={selectedTime} ampm={false} onAccept={handleAccept} />
      )}
    </LocalizationProvider>
  );
}

