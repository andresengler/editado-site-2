import { useEffect, useState } from 'react';

interface DigitalClockProps {
  isMobile?: boolean;
}

export function DigitalClock({ isMobile = false }: DigitalClockProps) {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // GMT-3 (Argentina timezone)
      const argTime = new Date(now.getTime() - (3 * 60 * 60 * 1000));
      const hours = argTime.getUTCHours().toString().padStart(2, '0');
      const minutes = argTime.getUTCMinutes().toString().padStart(2, '0');
      const seconds = argTime.getUTCSeconds().toString().padStart(2, '0');
      
      if (isMobile) {
        // Mobile format: Buenos Aires, 21:17
        setTime(`Buenos Aires, ${hours}:${minutes}`);
      } else {
        // Desktop format: 21:17:43 GMT-3
        setTime(`${hours}:${minutes}:${seconds} GMT-3`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <div className="tracking-wide font-ibm-mono">
      {time}
    </div>
  );
}