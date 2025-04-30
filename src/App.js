import "./index.css";
import Heading from "./Heading";
import DateTime from "./DateTime";
import Today from "./Today";
import TimeDifference from "./TimeDifference";
import WorkDone from "./WorkDone";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const targetDate = "2026-07-1T00:00:01";
const startDate = "2025-04-01T00:00:01";

export default function App() {
  return (
    <div className="App wrapper">
      <Heading heading="Hdl's Countdown"/>
      <DateTime title="Eintritt in die ATZ aktive Passiv-Phase" date={startDate} />
      <Today />
      <WorkDone 
        startText="Bisher waren das ..."
        endText="...ATZ aktive Passiv-Phase..."
        startDateTime={startDate}
        />
      <TimeDifference
        startText="...und sind noch..."
        endText="...bis zur Rente."
        targetDateTime={targetDate}
      />
      <DateTime title="Beginn Rente" date={targetDate} />
    </div>
  );
}


/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/