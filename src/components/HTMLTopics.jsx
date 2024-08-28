// src/components/HTMLTopics.jsx
import { config } from '../config';
import QuestionList from './QuestionList';

const HTMLTopics = () => {
  return (
    <div>
      <h2>HTML Topics</h2>
      <QuestionList questions={config.html} />
    </div>
  );
};

export default HTMLTopics;
