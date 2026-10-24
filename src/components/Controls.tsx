import React from 'react';
import { TimerMode, TimerStatus } from '../hooks/useLocalStorage';

interface ControlsProps {
  status: TimerStatus;
  mode: TimerMode;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSwitchMode: (mode: TimerMode) => void;
  completedInCycle: number;
  sessionsBeforeLongBreak: number;
}

const modeLabels = {
  focus: '🎯 Фокус',
  shortBreak: '☕ Короткий перерыв',
  longBreak: '🌿 Длинный перерыв',
};

export const Controls: React.FC<ControlsProps> = ({
  status,
  mode,
  onStart,
  onPause,
  onReset,
  onSwitchMode,
  completedInCycle,
  sessionsBeforeLongBreak,
}) => {
  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in">
      <div className="flex gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-1.5 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
        {(Object.keys(modeLabels) as TimerMode[]).map((m) => (
          <button
            key={m}
            onClick={() => onSwitchMode(m)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              mode === m
                ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {modeLabels[m]}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onReset}
          className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all duration-200 shadow-sm hover:shadow-md"
          title="Сброс"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        <button
          onClick={status === 'running' ? onPause : onStart}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
            mode === 'focus'
              ? 'bg-gradient-to-br from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-red-500/30'
              : mode === 'shortBreak'
              ? 'bg-gradient-to-br from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-emerald-500/30'
              : 'bg-gradient-to-br from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-blue-500/30'
          }`}
        >
          {status === 'running' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="w-12 h-12" />
      </div>

      <div className="flex items-center gap-2">
        {Array.from({ length: sessionsBeforeLongBreak }).map((_, i) => {
          const currentCycleProgress = completedInCycle % sessionsBeforeLongBreak;
          const isCompleted = i < currentCycleProgress;
          const dotColor = isCompleted
            ? mode === 'focus' ? 'bg-red-400 shadow-sm shadow-red-400/50' 
              : mode === 'shortBreak' ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' 
              : 'bg-blue-400 shadow-sm shadow-blue-400/50'
            : 'bg-gray-200 dark:bg-gray-700';
          return (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${dotColor}`}
            />
          );
        })}
        <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">
          {completedInCycle % sessionsBeforeLongBreak}/{sessionsBeforeLongBreak}
        </span>
      </div>
    </div>
  );
};
