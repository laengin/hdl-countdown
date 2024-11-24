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

const targetDate = "2025-03-31T12:00:00";
const startDate = "1987-10-01T08:00:00";

export default function App() {
  return (
    <div className="App wrapper">
      <Heading heading="Hdl's Countdown"/>
      <DateTime title="Eintritt ins Arbeitsleben..." date={startDate} />
      <Today />
      <WorkDone 
        startText="Bisher waren das ..."
        endText="...in Arbeit"
        startDateTime={startDate}
        />
      <TimeDifference
        startText="Das bedeutet noch..."
        endText="...bis zur Freistellungsphase."
        targetDateTime={targetDate}
      />
      <DateTime title="...Beginn Freistellungsphase ATZ" date={targetDate} />
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