// src/App.js
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Behavioral from "./components/Behavioral";
import JavaScript from "./components/JavaScript";
import ReactTopics from "./components/ReactTopics";
import HTMLTopics from "./components/HTMLTopics";
import CSSTopics from "./components/CSSTopics";
import "./App.css"; // Import the CSS file

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="sidebar">
          <ul>
            <li>
              <Link to="/behavioral">Behavioral</Link>
            </li>

            <li>
              <Link to="/javascript">JavaScript</Link>
            </li>
            <li>
              <Link to="/react">React Topics</Link>
            </li>
            <li>
              <Link to="/html">HTML Topics</Link>
            </li>
            <li>
              <Link to="/css">CSS Topics</Link>
            </li>
          </ul>
        </nav>
        <main className="content">
          <Routes>
            <Route path="/behavioral" element={<Behavioral />} />
            <Route path="/javascript" element={<JavaScript />} />
            <Route path="/react" element={<ReactTopics />} />
            <Route path="/html" element={<HTMLTopics />} />
            <Route path="/css" element={<CSSTopics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
