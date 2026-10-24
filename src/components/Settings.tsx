import React, { useState } from 'react';
import { PomodoroSettings } from '../hooks/useLocalStorage';

interface SettingsProps {
  settings: PomodoroSettings;
  onUpdate: (settings: Partial<PomodoroSettings>) => void;
}

export const Settings: React.FC<SettingsProps> = ({ settings, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    onUpdate(localSettings);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setLocalSettings(settings);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all duration-200 shadow-sm hover:shadow-md z-50"
        title="Настройки"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={handleCancel} />
      
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 w-full max-w-md animate-fade-in border border-gray-200/50 dark:border-gray-700/50">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Настройки таймера
        </h2>

        <div className="space-y-5">
          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <span>🎯 Длительность фокуса</span>
              <span className="text-gray-500">{localSettings.focusDuration} мин</span>
            </label>
            <input
              type="range"
              min="1"
              max="60"
              value={localSettings.focusDuration}
              onChange={(e) => setLocalSettings(s => ({ ...s, focusDuration: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <span>☕ Короткий перерыв</span>
              <span className="text-gray-500">{localSettings.shortBreakDuration} мин</span>
            </label>
            <input
              type="range"
              min="1"
              max="30"
              value={localSettings.shortBreakDuration}
              onChange={(e) => setLocalSettings(s => ({ ...s, shortBreakDuration: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <span>🌿 Длинный перерыв</span>
              <span className="text-gray-500">{localSettings.longBreakDuration} мин</span>
            </label>
            <input
              type="range"
              min="5"
              max="45"
              value={localSettings.longBreakDuration}
              onChange={(e) => setLocalSettings(s => ({ ...s, longBreakDuration: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <span>🔄 Сессий до длинного перерыва</span>
              <span className="text-gray-500">{localSettings.sessionsBeforeLongBreak}</span>
            </label>
            <input
              type="range"
              min="2"
              max="8"
              value={localSettings.sessionsBeforeLongBreak}
              onChange={(e) => setLocalSettings(s => ({ ...s, sessionsBeforeLongBreak: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2
