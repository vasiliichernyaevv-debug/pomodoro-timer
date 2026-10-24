import React from 'react';
import { TimerMode, TimerStatus } from '../hooks/useLocalStorage';

interface TimerDisplayProps {
  timeLeft: number;
  progress: number;
  mode: TimerMode;
  status: TimerStatus;
}

const modeColors = {
  focus: { ring: '#ef4444', bg: 'from-red-500/10 to-orange-500/10', text: 'text-red-500' },
  shortBreak: { ring: '#10b981', bg: 'from-emerald-500/10 to-teal-500/10', text: 'text-emerald-500' },
  longBreak: { ring: '#3b82f6', bg: 'from-blue-500/10 to-indigo-500/10', text: 'text-blue-500' },
};

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft, progress, mode, status }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const colors = modeColors[mode];
  
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative flex items-center justify-center">
      <div className={`absolute w-80 h-80 rounded-full bg-gradient-to-br ${colors.bg} blur-2xl ${status === 'running' ? 'animate-pulse' : ''}`} />
      
      <svg className="w-72 h-72 md:w-80 md:h-80 transform -rotate-90" viewBox="0 0 320 320">
        <circle
          cx="160"
          cy="160"
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-gray-200 dark:text-gray-700"
          strokeWidth="6"
        />
        <circle
          cx="160"
          cy="160"
          r={radius}
          fill="none"
          stroke={colors.ring}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="timer-ring"
          style={{ filter: `drop-shadow(0 0 6px ${colors.ring}40)` }}
        />
      </svg>

      <div className="absolute flex flex-col items-center justify-center">
        <span className={`text-6xl md:text-7xl font-bold tracking-tight ${colors.text} tabular-nums`}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-wider">
          {mode === 'focus' ? 'Время фокуса' : mode === 'shortBreak' ? 'Короткий перерыв' : 'Длинный перерыв'}
        </span>
      </div>
    </div>
  );
};
