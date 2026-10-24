import React from 'react';
import { usePomodoro } from './hooks/usePomodoro';
import { TimerDisplay } from './components/TimerDisplay';
import { Controls } from './components/Controls';
import { Settings } from './components/Settings';
import { Statistics } from './components/Statistics';

function App() {
  const {
    mode,
    status,
    timeLeft,
    progress,
    settings,
    todayStats,
    completedInCycle,
    start,
    pause,
    reset,
    switchMode,
    updateSettings,
  } = usePomodoro();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-200/20 dark:bg-red-900/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-200/10 dark:bg-orange-900/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <Settings settings={settings} onUpdate={updateSettings} />

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-lg">
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            Pomodoro
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"> Фокус</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Будьте сосредоточены и продуктивны</p>
        </div>

        <TimerDisplay
          timeLeft={timeLeft}
          progress={progress}
          mode={mode}
          status={status}
        />

        <Controls
          status={status}
          mode={mode}
          onStart={start}
          onPause={pause}
          onReset={reset}
          onSwitchMode={switchMode}
          completedInCycle={completedInCycle}
          sessionsBeforeLongBreak={settings.sessionsBeforeLongBreak}
        />

        <Statistics
          completedSessions={todayStats.completedSessions}
          totalFocusMinutes={todayStats.totalFocusMinutes}
        />

        <div className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
          <p>Нажмите кнопку воспроизведения, чтобы начать</p>
          <p className="mt-1">Данные сохраняются локально в вашем браузере</p>
        </div>
      </div>
    </div>
  );
}

export default App;
