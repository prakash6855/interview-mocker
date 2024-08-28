// src/App.js
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import JavaScriptBehavioral from "./components/JavaScriptBehavioral";
import ReactTopics from "./components/ReactTopics";
import HTMLTopics from "./components/HTMLTopics";
import CSSTopics from "./components/CSSTopics";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/javascript">JavaScript Behavioral</Link>
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
        <Routes>
          <Route path="/javascript" element={<JavaScriptBehavioral />} />
          <Route path="/react" element={<ReactTopics />} />
          <Route path="/html" element={<HTMLTopics />} />
          <Route path="/css" element={<CSSTopics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
