import { config } from "../config";
import QuestionList from "./QuestionList";

const Behavioral = () => {
  return (
    <div>
      <h2>Behavioral Questions</h2>
      <QuestionList questions={config.behavioral} />
    </div>
  );
};

export default Behavioral;
