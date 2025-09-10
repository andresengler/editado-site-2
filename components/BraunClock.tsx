import { useState, useEffect } from 'react';

export function BraunClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const buenosAiresTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Argentina/Buenos_Aires"}));
      setTime(buenosAiresTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Calculate angles for clock hands
  const hourAngle = (hours * 30) + (minutes * 0.5) - 90; // 30 degrees per hour + minute adjustment
  const minuteAngle = (minutes * 6) - 90; // 6 degrees per minute
  const secondAngle = (seconds * 6) - 90; // 6 degrees per second

  return (
    <div className="relative w-4 h-4">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Clock face */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="white"
          stroke="black"
          strokeWidth="1"
        />
        
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) - 90;
          const isMainHour = i % 3 === 0;
          const outerRadius = 48;
          const innerRadius = isMainHour ? 40 : 44;
          
          const x1 = 50 + Math.cos(angle * Math.PI / 180) * outerRadius;
          const y1 = 50 + Math.sin(angle * Math.PI / 180) * outerRadius;
          const x2 = 50 + Math.cos(angle * Math.PI / 180) * innerRadius;
          const y2 = 50 + Math.sin(angle * Math.PI / 180) * innerRadius;
          
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="black"
              strokeWidth={isMainHour ? "2" : "1"}
            />
          );
        })}

        {/* Hour hand */}
        <line
          x1="50"
          y1="50"
          x2={50 + Math.cos(hourAngle * Math.PI / 180) * 25}
          y2={50 + Math.sin(hourAngle * Math.PI / 180) * 25}
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Minute hand */}
        <line
          x1="50"
          y1="50"
          x2={50 + Math.cos(minuteAngle * Math.PI / 180) * 35}
          y2={50 + Math.sin(minuteAngle * Math.PI / 180) * 35}
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Second hand */}
        <line
          x1="50"
          y1="50"
          x2={50 + Math.cos(secondAngle * Math.PI / 180) * 38}
          y2={50 + Math.sin(secondAngle * Math.PI / 180) * 38}
          stroke="#ff0000"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Center dot */}
        <circle
          cx="50"
          cy="50"
          r="2"
          fill="black"
        />
      </svg>
    </div>
  );
}