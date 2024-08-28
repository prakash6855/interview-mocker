import { config } from "../config";
import QuestionList from "./QuestionList";

const JavaScriptBehavioral = () => {
  return (
    <div>
      <h2>JavaScript Behavioral Questions</h2>
      <QuestionList questions={config.javascript} />
    </div>
  );
};

export default JavaScriptBehavioral;
