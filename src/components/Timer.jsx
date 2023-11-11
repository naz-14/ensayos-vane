import { useTimer } from "react-timer-hook";

const Timer = ({ expiryTimestamp, handleTime, handleExpire }) => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => handleExpire(totalSeconds),
  });

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "100px" }}>
        <span>{seconds}</span>
      </div>
      <button onClick={resume}>Resume</button>
    </div>
  );
};

export default Timer;
