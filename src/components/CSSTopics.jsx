// src/components/CSSTopics.jsx
import { config } from "../config";
import QuestionList from "./QuestionList";

const CSSTopics = () => {
  return (
    <div>
      <h2>CSS Topics</h2>
      <QuestionList questions={config.css} />
    </div>
  );
};

export default CSSTopics;
