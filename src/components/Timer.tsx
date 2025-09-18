import { useState, useEffect } from 'react';
import { Activity } from '../types';
import MaterialCard from './MaterialCard';
import MaterialButton from './MaterialButton';

interface TimerProps {
  activity: Activity;
  onComplete: () => void;
  onStop: () => void;
}

export default function Timer({ activity, onComplete, onStop }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(activity.duration * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((activity.duration * 60 - timeLeft) / (activity.duration * 60)) * 100;

  return (
    <MaterialCard className="text-center p-8 max-w-md mx-auto" elevation="high">
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div 
          className="w-6 h-6 rounded-full"
          style={{ backgroundColor: activity.color }}
        />
        <h2 className="text-3xl font-bold text-purple-800">
          {activity.name}
        </h2>
      </div>
      
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke={activity.color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 88}`}
            strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-mono font-bold text-gray-800">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div className="flex space-x-4 justify-center">
        <MaterialButton
          onClick={() => setIsRunning(!isRunning)}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          size="lg"
        >
          {isRunning ? 'Pausar' : 'Iniciar'}
        </MaterialButton>
        <MaterialButton
          onClick={onStop}
          size="lg"
        >
          Parar
        </MaterialButton>
      </div>
    </MaterialCard>
  );
}