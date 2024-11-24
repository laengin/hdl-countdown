import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";


const WorkDone = (props) => {
  const [workDone, setTimeDifference] = useState(
    getTimeDifference(props.startDateTime)
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeDifference(getTimeDifference(props.startDateTime));
    }, 1000);
    return () => clearInterval(timerId);
  }, [props.startDateTimeDateTime]);

  function getTimeDifference(start) {
    if (!start || isNaN(new Date(start))) {
      console.error("Ungültiger Zielzeitpunkt:", start);
      return { days: 0, weeks: 0, months: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const now = new Date();
    const startTime = new Date(start);
    const diffInMs = Math.max(now - startTime, 0); //Verhindert negative Werte

    const months = calculateMonthDifference(now, startTime);
    const seconds = Math.floor((diffInMs / 1000) % 60);
    const minutes = Math.floor((diffInMs / (1000 * 60)) % 60);
    let hours = Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
    hours = hours + (now.getTimezoneOffset() / -60);
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    return { days, weeks, months, hours, minutes, seconds };
  }
  

  function calculateWeekDifference(startDate, endDate) {
    if (
      !(startDate instanceof Date) ||
      !(endDate instanceof Date) ||
      isNaN(startDate) ||
      isNaN(endDate)
    ) {
      console.error("Ungültige Datumsangaben:", startDate, endDate);
      return 0;
    }

    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();
    const daysAdjustment = endDate.getDate() >= startDate.getDate() ? 0 : -1; // Korrigiert, wenn im Zielmonat weniger Tage übrig sind

    return years * 12 + months + daysAdjustment;
  }

  function calculateMonthDifference(startDate, endDate) {
    if (
      !(startDate instanceof Date) ||
      !(endDate instanceof Date) ||
      isNaN(startDate) ||
      isNaN(endDate)
    ) {
      console.error("Ungültige Datumsangaben:", startDate, endDate);
      return 0;
    }

    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();
    const daysAdjustment = endDate.getDate() >= startDate.getDate() ? 0 : -1; // Korrigiert, wenn im Zielmonat weniger Tage übrig sind

    return years * 12 + months + daysAdjustment;
  }

  if (
    workDone.months === 0 &&
    workDone.days === 0 &&
    workDone.hours === 0
  ) {
    return <div style={{ color: "red" }}>Der Zielzeitpunkt ist erreicht!</div>;
  }

  return (
    <div className="TimeDifference container">
      <div>
        <p>{props.startText}</p>
      </div>
      <div className="row">
          <p className="ClockFontSize">
            {workDone.weeks > 0 && `${workDone.weeks} Wochen `}
            {workDone.days > 0 && `${workDone.days % 7} Tage und  `}
            {workDone.hours.toString().padStart(2, "0")} h {" "}: {" "}
            {workDone.minutes.toString().padStart(2, "0")} m {" "}: {" "}
            {workDone.seconds.toString().padStart(2, "0")} s
          </p>
      </div>
      <div>
      <p>{props.endText}</p>
    </div>
    </div>
  );
};

WorkDone.propTypes = {
  startDateTime: PropTypes.string.isRequired, // Muss ein gültiger Datum-String sein
};

export default WorkDone;
