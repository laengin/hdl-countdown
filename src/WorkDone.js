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

    const months = calculateDateDifference(startTime, now).months;
    const years = calculateDateDifference(startTime, now).years;
    const seconds = calculateDateDifference(startTime, now).seconds;
    const minutes = calculateDateDifference(startTime, now).minutes;
    const hours = calculateDateDifference(startTime, now).hours;
    const days = calculateDateDifference(startTime, now).days;
    // const weeks = Math.floor(days / 7);
    const weeks = calculateDateDifference(startTime, now).weeks;
    return { days, weeks, months, years, hours, minutes, seconds };
  }
  
function calculateDateDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Zeitdifferenz in Millisekunden
    const diffInMs = end - start;

    // Monate berechnen
    let months = (end.getFullYear() - start.getFullYear()) * 12;
    months += end.getMonth() - start.getMonth();
    if (end.getDate() < start.getDate()) {
        months--; // Korrigieren, wenn der Tag im Enddatum kleiner ist
    }

    // Jahre berechnen
    const years = Math.floor(months / 12);
    months = months % 12;

    // Now Adjust startdate to calculate the weeks and days
    let newStart = new Date(startDate);
    if(endDate.getMonth() > start.getMonth()){
      newStart.setFullYear((start.getFullYear() + years), (start.getMonth() + months),1);
    } else{
      newStart.setFullYear((start.getFullYear() + years + 1), end.getMonth(), 0);
    }
    /*
    newStart.setHours(0);
    newStart.setMinutes(0);
    newStart.setSeconds(0);
    newStart.setMilliseconds(0);
        */
    //console.log(newStart);


    const adjDiffInMs = end - newStart;
    //  Rest Tage berechnen
    // const days = diffInMs / (1000 * 60 * 60 * 24);
    const days =  Math.floor(adjDiffInMs / (1000 * 60 * 60 * 24));

    // restliche Wochen berechnen
    const weeks = Math.floor(days / 7);

    // restliche Zeit berechnen
    const seconds = Math.floor((adjDiffInMs / 1000) % 60);
    const minutes = Math.floor((adjDiffInMs / (1000 * 60)) % 60);
    const hours = Math.floor((adjDiffInMs / (1000 * 60 * 60)) % 24);
    // hours = Math.floor(hours + (end.getTimezoneOffset() / -60));


    return {
        days: days,
        weeks: weeks,
        months: months,
        years: years,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}

  if (
    workDone.months === 0 &&
    workDone.days === 0 &&
    workDone.hours === 0
  ) {
    return <div style={{ color: "red" }}>Der Zielzeitpunkt ist erreicht!</div>;
  }
  const strMonat = workDone.months === 1? "Monat" : "Monate";
  const strWeek = workDone.weeks ===1? "Woche" : "Wochen";
  const strYear = workDone.years ===1? "Jahr" : "Jahre";
  const strDay = workDone.days ===1? "Tag" : "Tage";

  return (
    <div className="TimeDifference container">
      <div>
        <p>{props.startText}</p>
      </div>
      <div className="row">
          <p className="ClockFontSize">
            {workDone.years > 0 && `${workDone.years} ${strYear} `}
            {workDone.months > 0 && `${workDone.months} ${strMonat} `}
            {workDone.weeks > 0 && `${workDone.weeks} ${strWeek} `}
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
