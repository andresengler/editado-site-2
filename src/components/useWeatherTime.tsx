import { useState, useEffect } from 'react';

// Mock weather data that simulates different conditions
// In a real implementation, replace this with actual weather API data
const mockWeatherConditions = [
  'sunny', 'cloudy', 'partly cloudy', 'overcast', 'drizzly', 'rainy', 
  'misty', 'clear', 'breezy', 'warm', 'cool', 'humid', 'crisp'
];

// Function to get a simulated weather condition
// This creates realistic weather patterns based on time of day and season
const getCurrentWeatherCondition = (): string => {
  const now = new Date();
  const buenosAiresTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Argentina/Buenos_Aires"}));
  const hourOfDay = buenosAiresTime.getHours();
  const dayOfYear = Math.floor((buenosAiresTime.getTime() - new Date(buenosAiresTime.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  // Simulate more realistic weather patterns
  // Summer in Buenos Aires (December-February): more sunny/warm days
  // Winter (June-August): more cloudy/cool days
  const month = buenosAiresTime.getMonth();
  const isSummer = month === 11 || month === 0 || month === 1; // Dec, Jan, Feb
  const isWinter = month >= 5 && month <= 7; // Jun, Jul, Aug
  
  let baseConditions: string[];
  
  if (isSummer) {
    baseConditions = ['sunny', 'clear', 'warm', 'hot', 'humid', 'bright'];
  } else if (isWinter) {
    baseConditions = ['cloudy', 'overcast', 'cool', 'crisp', 'chilly', 'grey'];
  } else {
    baseConditions = ['partly cloudy', 'breezy', 'mild', 'pleasant', 'clear', 'comfortable'];
  }
  
  // Add time-based variation (morning tends to be clearer)
  if (hourOfDay >= 6 && hourOfDay <= 10) {
    baseConditions.push('crisp', 'clear', 'fresh');
  } else if (hourOfDay >= 18 && hourOfDay <= 22) {
    baseConditions.push('breezy', 'pleasant', 'cooling');
  }
  
  // Create a deterministic but varying selection
  const index = (dayOfYear + hourOfDay * 7) % baseConditions.length;
  return baseConditions[index];
};

/*
To integrate with a real weather API (e.g., OpenWeatherMap):

const getCurrentWeatherCondition = async (): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Buenos Aires,AR&appid=YOUR_API_KEY_HERE`
    );
    const data = await response.json();
    
    // Map API weather conditions to descriptive words
    const weatherMap: { [key: string]: string } = {
      'clear sky': 'clear',
      'few clouds': 'partly cloudy',
      'scattered clouds': 'cloudy',
      'broken clouds': 'overcast',
      'shower rain': 'drizzly',
      'rain': 'rainy',
      'thunderstorm': 'stormy',
      'snow': 'snowy',
      'mist': 'misty'
    };
    
    return weatherMap[data.weather[0].description] || 'pleasant';
  } catch (error) {
    console.error('Failed to fetch weather:', error);
    return 'pleasant'; // fallback
  }
};
*/

export const useWeatherTime = () => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const buenosAiresTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Argentina/Buenos_Aires"}));
      
      // Format time in 12-hour format
      const hours = buenosAiresTime.getHours();
      const minutes = buenosAiresTime.getMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';
      const displayHours = hours % 12 || 12; // Convert to 12-hour format
      const displayMinutes = minutes.toString().padStart(2, '0');
      
      setTimeString(`${displayHours}:${displayMinutes}${ampm} in BA`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeString;
};