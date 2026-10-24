import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocalStorage, PomodoroSettings, TimerMode, TimerStatus, SessionRecord } from './useLocalStorage';

const DEFAULT_SETTINGS: PomodoroSettings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsBeforeLongBreak: 4,
};

function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}

export function usePomodoro() {
  const [settings, setSettings] = useLocalStorage<PomodoroSettings>('pomodoro-settings', DEFAULT_SETTINGS);
  const [sessions, setSessions] = useLocalStorage<SessionRecord[]>('pomodoro-sessions', []);
  
  const [mode, setMode] = useState<TimerMode>('focus');
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(settings.focusDuration * 60);
  const [completedInCycle, setCompletedInCycle] = useState(0);
  
  const intervalRef = useRef<number | null>(null);
  const modeRef = useRef(mode);
  const settingsRef = useRef(settings);
  const completedRef = useRef(completedInCycle);

  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { settingsRef.current = settings; }, [settings]);
  useEffect(() => { completedRef.current = completedInCycle; }, [completedInCycle]);

  const getDuration = useCallback((m: TimerMode) => {
    switch (m) {
      case 'focus': return settings.focusDuration * 60;
      case 'shortBreak': return settings.shortBreakDuration * 60;
      case 'longBreak': return settings.longBreakDuration * 60;
    }
  }, [settings]);

  useEffect(() => {
    if (status === 'idle') {
      setTimeLeft(getDuration(mode));
    }
  }, [mode, settings, getDuration, status]);

  useEffect(() => {
    if (status === 'running') {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setTimeout(() => handleTimerComplete(), 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [status]);

  const handleTimerComplete = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setStatus('idle');

    const currentMode = modeRef.current;
    const currentSettings = settingsRef.current;
    const currentCompleted = completedRef.current;

    if (currentMode === 'focus') {
      const todayKey = getTodayKey();
      setSessions(prev => {
        const existing = prev.find(s => s.date === todayKey);
        if (existing) {
          return prev.map(s => 
            s.date === todayKey 
              ? { ...s, completedSessions: s.completedSessions + 1, totalFocusMinutes: s.totalFocusMinutes + currentSettings.focusDuration }
              : s
          );
        }
        return [...prev, { date: todayKey, completedSessions: 1, totalFocusMinutes: currentSettings.focusDuration }];
      });

      const newCompleted = currentCompleted + 1;
      setCompletedInCycle(newCompleted);

      if (newCompleted % currentSettings.sessionsBeforeLongBreak === 0) {
        setMode('longBreak');
      } else {
        setMode('shortBreak');
      }
    } else {
      setMode('focus');
    }

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      // Audio not supported
    }
  }, [setSessions]);

  const start = useCallback(() => {
    setStatus('running');
  }, []);

  const pause = useCallback(() => {
    setStatus('paused');
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setTimeLeft(getDuration(mode));
  }, [mode, getDuration]);

  const switchMode = useCallback((newMode: TimerMode) => {
    setStatus('idle');
    setMode(newMode);
    setTimeLeft(getDuration(newMode));
  }, [getDuration]);

  const updateSettings = useCallback((newSettings: Partial<PomodoroSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    if (status === 'idle') {
      const updatedSettings = { ...settings, ...newSettings };
      switch (mode) {
        case 'focus': setTimeLeft(updatedSettings.focusDuration * 60); break;
        case 'shortBreak': setTimeLeft(updatedSettings.shortBreakDuration * 60); break;
        case 'longBreak': setTimeLeft(updatedSettings.longBreakDuration * 60); break;
      }
    }
  }, [status, mode, settings, setSettings]);

  const todayStats = sessions.find(s => s.date === getTodayKey()) || { date: getTodayKey(), completedSessions: 0, totalFocusMinutes: 0 };

  const progress = 1 - timeLeft / getDuration(mode);

  return {
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
  };
}
