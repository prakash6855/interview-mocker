import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const DEFAULT_TIMER_DURATION = 45; // Default timer duration (seconds)

const QuestionList = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerDuration, setTimerDuration] = useState(DEFAULT_TIMER_DURATION);
  const [timeLeft, setTimeLeft] = useState(timerDuration);
  const utteranceRef = useRef(null);
  const timerRef = useRef(null);

  // Function to play audio for the current question
  const playAudio = () => {
    if (!("speechSynthesis" in window)) {
      console.error("Speech synthesis not supported in this browser.");
      return;
    }

    // Cancel any ongoing speech synthesis
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    utteranceRef.current = new SpeechSynthesisUtterance(
      questions[currentQuestionIndex]
    );

    utteranceRef.current.onstart = () => {
      console.log("Playing audio:", questions[currentQuestionIndex]);
    };

    utteranceRef.current.onerror = (event) => {
      console.error("Speech synthesis error:", event.error);
    };

    window.speechSynthesis.speak(utteranceRef.current);
  };

  // Function to start or restart the timer
  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setTimeLeft(timerDuration);

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setCurrentQuestionIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % questions.length;
            playAudio(); // Play the new question
            return nextIndex;
          });
          return timerDuration; // Reset the timer
        }
        return prevTime - 1;
      });
    }, 1000); // 1000 ms = 1 second
  };

  // Function to handle play/pause toggle
  const togglePlayPause = () => {
    if (isPlaying) {
      clearInterval(timerRef.current);
      window.speechSynthesis.pause();
    } else {
      if (currentQuestionIndex === 0) {
        playAudio(); // Play the first question immediately when starting
      }
      startTimer();
      window.speechSynthesis.resume();
    }
    setIsPlaying(!isPlaying);
  };

  // Function to handle timer duration change
  const handleTimerChange = (event) => {
    const newDuration = Number(event.target.value);
    setTimerDuration(newDuration);
    if (isPlaying) {
      setTimeLeft(newDuration);
      startTimer(); // Restart timer with new duration if playing
    }
  };

  // Function to go to the next question
  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % questions.length;
      playAudio(); // Play the new question
      return nextIndex;
    });
    setTimerDuration(DEFAULT_TIMER_DURATION); // Reset timer duration to default
    if (isPlaying) {
      startTimer(); // Restart timer with default duration
    }
  };

  // Function to go to the previous question
  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const prevInd = (prevIndex - 1 + questions.length) % questions.length;
      playAudio(); // Play the new question
      return prevInd;
    });
    setTimerDuration(DEFAULT_TIMER_DURATION); // Reset timer duration to default
    if (isPlaying) {
      startTimer(); // Restart timer with default duration
    }
  };

  // Function to reset the state
  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setIsPlaying(false);
    setTimerDuration(DEFAULT_TIMER_DURATION);
    setTimeLeft(DEFAULT_TIMER_DURATION);
    clearInterval(timerRef.current);
    window.speechSynthesis.cancel();
  };

  useEffect(() => {
    if (isPlaying) {
      playAudio();
    }
  }, [currentQuestionIndex, isPlaying]); // Trigger playAudio when currentQuestionIndex or isPlaying changes

  useEffect(() => {
    if (isPlaying) {
      startTimer();
    }

    return () => {
      clearInterval(timerRef.current);
      window.speechSynthesis.cancel();
    };
  }, [isPlaying, timerDuration]);

  // Inline styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    width: "350px",
    margin: "20px auto",
  };

  const buttonStyle = {
    marginTop: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "#0056b3",
  };

  const played = currentQuestionIndex;
  const left = questions.length - currentQuestionIndex - 1;

  return (
    <div style={containerStyle}>
      <div>
        <h2>Timer: {timeLeft} seconds</h2>
        <label htmlFor="timerDuration">Timer Duration (seconds): </label>
        <input
          id="timerDuration"
          type="number"
          value={timerDuration}
          onChange={handleTimerChange}
          min="1"
          style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
        />
      </div>
      <div>
        <button
          onClick={togglePlayPause}
          style={buttonStyle}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              buttonHoverStyle.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor =
              buttonStyle.backgroundColor)
          }
        >
          {isPlaying ? "Pause" : "Start"}
        </button>
        <button
          onClick={goToPreviousQuestion}
          style={buttonStyle}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              buttonHoverStyle.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor =
              buttonStyle.backgroundColor)
          }
        >
          Previous
        </button>
        <button
          onClick={goToNextQuestion}
          style={buttonStyle}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              buttonHoverStyle.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor =
              buttonStyle.backgroundColor)
          }
        >
          Next
        </button>
        <button
          onClick={handleReset}
          style={{ ...buttonStyle, backgroundColor: "#dc3545" }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#c82333")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#dc3545")
          }
        >
          Reset
        </button>
      </div>
      <div>
        <p>
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        <p>
          {played} played, {left} left
        </p>
      </div>
    </div>
  );
};

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default QuestionList;
