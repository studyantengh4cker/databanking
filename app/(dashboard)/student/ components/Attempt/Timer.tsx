import { useState, useEffect } from "react";

interface TimerProps {
  created_at: string;
  expire_time: string;
}

export default function Timer({ created_at, expire_time }: TimerProps) {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const createdAt = new Date(created_at);
    const expireTime = new Date(expire_time);

    if (isNaN(createdAt.getTime()) || isNaN(expireTime.getTime())) {
      setRemainingTime("Invalid time format");
      return;
    }

    const updateRemainingTime = () => {
      const now = new Date();
      const timeLeft = expireTime.getTime() - now.getTime();

      if (timeLeft <= 0) {
        setRemainingTime("Expired");
      } else {
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        setRemainingTime(`${minutes}m ${seconds}s`);
      }
    };

    updateRemainingTime();

    const interval = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, [created_at, expire_time]);

  return (
    <div>
      <p>Remaining Time: {remainingTime}</p>
    </div>
  );
}
