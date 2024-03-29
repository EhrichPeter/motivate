"use client";

import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

interface DailyCountDownTimerProps {
  targetHour: number;
  targetMinute: number;
  timeZone: string;
}

const DailyCountdownTimer: React.FC<DailyCountDownTimerProps> = ({
  targetHour,
  targetMinute,
  timeZone,
}) => {
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    const calculateCountdown = () => {
      const now = moment();
      const todayTarget = moment()
        .tz(timeZone)
        .hour(targetHour)
        .minute(targetMinute);

      if (todayTarget.isBefore(now)) {
        todayTarget.add(1, "days");
      }

      const duration = moment.duration(todayTarget.diff(now));
      const hours = duration.hours();
      const minutes = duration.minutes();

      setCountdown(`${hours}h ${minutes}m`);
    };

    calculateCountdown();

    const intervalId = setInterval(calculateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, [targetHour, targetMinute, timeZone]);

  return (
    <div>
      <p className="text-muted-foreground">{countdown}</p>
    </div>
  );
};

export default DailyCountdownTimer;
