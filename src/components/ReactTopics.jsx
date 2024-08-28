// src/components/ReactTopics.jsx
import { config } from "../config";
import QuestionList from "./QuestionList";

const ReactTopics = () => {
  return (
    <div>
      <h2>React Topics</h2>
      <QuestionList questions={config.react} />
    </div>
  );
};

export default ReactTopics;
