import { CloudSun } from 'lucide-react';
import { useEffect, useState } from 'react';

interface WeatherState {
  temp: number;
  location: string;
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherState | null>(null);

  useEffect(() => {
    const load = async () => {
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherJson = await weatherResponse.json();
        setWeather({ temp: Math.round(weatherJson.current.temperature_2m), location: 'Current location' });
      });
    };

    void load();
  }, []);

  return (
    <div className="glass-card flex items-center gap-3 p-4">
      <CloudSun className="text-yellow-300" />
      <div>
        <p className="text-xl font-semibold">{weather ? `${weather.temp}°C` : '--°C'}</p>
        <p className="text-xs text-white/70">{weather?.location ?? 'Fetching weather...'}</p>
      </div>
    </div>
  );
}
