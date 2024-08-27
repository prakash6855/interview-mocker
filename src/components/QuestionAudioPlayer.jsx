import { useState, useEffect, useRef } from "react";

const questions = [
  "What is your name?",
  "What is your favorite programming language?",
  // ... Add up to 100 questions
];

const QuestionAudioPlayer = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const utteranceRef = useRef(null);

  useEffect(() => {
    // Check if speechSynthesis is supported
    if (!("speechSynthesis" in window)) {
      console.error("Speech synthesis not supported in this browser.");
      return;
    }

    // Create a new utterance for the current question
    utteranceRef.current = new SpeechSynthesisUtterance(
      questions[currentQuestionIndex]
    );

    // Speak the utterance
    window.speechSynthesis.speak(utteranceRef.current);

    // Start the timer
    timerRef.current = setInterval(() => {
      if (!isPaused) {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            window.speechSynthesis.cancel();
            setCurrentQuestionIndex(
              (prevIndex) => (prevIndex + 1) % questions.length
            );
            return 120;
          }
          return prevTime - 1;
        });
      }
    }, 1000);

    // Cleanup on unmount or when dependencies change
    return () => {
      clearInterval(timerRef.current);
      window.speechSynthesis.cancel();
    };
  }, [currentQuestionIndex, isPaused]);

  const handlePause = () => {
    setIsPaused((prevPaused) => {
      if (prevPaused) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.pause();
      }
      return !prevPaused;
    });
  };

  return (
    <div>
      <h1>
        Question {currentQuestionIndex + 1} of {questions.length}
      </h1>
      <p>Time left: {timeLeft} seconds</p>
      <button onClick={handlePause}>{isPaused ? "Resume" : "Pause"}</button>
      <p>{isPaused ? "Paused" : "Playing question..."}</p>
    </div>
  );
};

export default QuestionAudioPlayer;
