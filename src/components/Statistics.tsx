import React from 'react';

interface StatisticsProps {
  completedSessions: number;
  totalFocusMinutes: number;
}

export const Statistics: React.FC<StatisticsProps> = ({ completedSessions, totalFocusMinutes }) => {
  const hours = Math.floor(totalFocusMinutes / 60);
  const minutes = totalFocusMinutes % 60;

  return (
    <div className="animate-fade-in w-full max-w-md mx-auto">
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Статистика за сегодня
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-red-100 dark:border-red-800/30">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">{completedSessions}</div>
            <div className="text-xs font-medium text-red-500/70 dark:text-red-400/70 mt-1">Сессий</div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-4 border border-emerald-100 dark:border-emerald-800/30">
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`}
            </div>
            <div className="text-xs font-medium text-emerald-500/70 dark:text-emerald-400/70 mt-1">Время фокуса</div>
          </div>
        </div>

        {completedSessions > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
              <span>Прогресс до дневной цели</span>
              <span>{Math.min(completedSessions * 12.5, 100)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(completedSessions * 12.5, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
              Цель: 8 сессий в день
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
