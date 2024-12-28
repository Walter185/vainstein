import React, { useState, useEffect } from 'react';
import "./Timer.css";

const LaunchTimer = () => {
  const calculateTimeLeft = () => {
    const finalDate = new Date('2024-06-30T23:59:59');
    const now = new Date();
    const difference = finalDate - now;
    
    let timeLeft = {};
    
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className='timer'>
      <span>{days} </span>
      <span>: {hours < 10 ? `0${hours}` : hours} </span>
      <span>: {minutes < 10 ? `0${minutes}` : minutes} </span>
      <span>: {seconds < 10 ? `0${seconds}` : seconds}</span>
    </div>
  );
};

export default LaunchTimer;
