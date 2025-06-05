
import React from 'react';
import { StickyNote } from 'lucide-react';
import { Note } from '@/types/calendar';

interface CalendarStatsProps {
  selectedDatesCount: number;
  selectedPercentage: string;
  selectedMonthsCount: number;
  notesCount: number;
  onClearSelection: () => void;
  onToggleNotesPanel: () => void;
}

export const CalendarStats: React.FC<CalendarStatsProps> = ({
  selectedDatesCount,
  selectedPercentage,
  selectedMonthsCount,
  notesCount,
  onClearSelection,
  onToggleNotesPanel
}) => {
  return (
    <div className="flex justify-center gap-6 mb-8 flex-wrap">
      <div className="bg-white rounded-lg shadow-md px-6 py-4 text-center">
        <div className="text-2xl font-bold text-blue-600">{selectedDatesCount}</div>
        <div className="text-sm text-gray-600">Selected Days</div>
      </div>
      <div className="bg-white rounded-lg shadow-md px-6 py-4 text-center">
        <div className="text-2xl font-bold text-indigo-600">{selectedPercentage}%</div>
        <div className="text-sm text-gray-600">of Year</div>
      </div>
      <div className="bg-white rounded-lg shadow-md px-6 py-4 text-center">
        <div className="text-2xl font-bold text-green-600">{selectedMonthsCount}</div>
        <div className="text-sm text-gray-600">Selected Months</div>
      </div>
      <button
        onClick={onClearSelection}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
      >
        Clear Selection
      </button>
      <button
        onClick={onToggleNotesPanel}
        className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
      >
        <StickyNote className="w-4 h-4" />
        Notes ({notesCount})
      </button>
    </div>
  );
};
