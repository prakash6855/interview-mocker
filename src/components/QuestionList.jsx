// src/components/QuestionList.jsx
import PropTypes from "prop-types";
import { useRef } from "react";

const QuestionList = ({ questions }) => {
  const utteranceRef = useRef(null);

  const playAudio = (index) => {
    // Cancel any ongoing speech
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
    }

    // Create and play a new utterance for the selected question
    utteranceRef.current = new SpeechSynthesisUtterance(questions[index]);
    window.speechSynthesis.speak(utteranceRef.current);
  };

  return (
    <div>
      <h2>Questions</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            {question}
            <button onClick={() => playAudio(index)}>Play Audio</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default QuestionList;
