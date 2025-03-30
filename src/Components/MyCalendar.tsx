import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="flex flex-col items-center justify-center bg-opacity-50 ">
      <h2 className="text-xl font-semibold mb-4 text-black">Select a Date:</h2>

      <div className="p-4 border rounded-lg shadow-md bg-white">
        <Calendar
          onChange={(value) => setDate(value as Date)}
          value={date}
          className="border-none bg-transparent"
        />
      </div>

      <p className="mt-4 text-black font-bold">
        Selected Date: {date.toDateString()}
      </p>
    </div>
  );
};

export default MyCalendar;
