import { config } from "../config";
import QuestionList from "./QuestionList";

const JavaScript = () => {
  return (
    <div>
      <h2>JavaScript Questions</h2>
      <QuestionList questions={config.javascript} />
    </div>
  );
};

export default JavaScript;
