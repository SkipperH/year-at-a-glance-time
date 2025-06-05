
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar, X } from 'lucide-react';
import { Note } from '@/types/calendar';

interface CalendarMonthProps {
  monthIndex: number;
  monthName: string;
  year: number;
  isMonthSelected: boolean;
  selectedDates: Set<string>;
  notes: Note[];
  popoverNote: Note | null;
  onMonthClick: (monthIndex: number) => void;
  onMouseDown: (year: number, month: number, day: number) => void;
  onMouseEnter: (year: number, month: number, day: number) => void;
  onMouseUp: () => void;
  onDayClick: (year: number, month: number, day: number, e: React.MouseEvent) => void;
  onDeleteNote: (noteId: string) => void;
  setPopoverNote: (note: Note | null) => void;
  getDaysInMonth: (year: number, month: number) => number;
  getFirstDayOfMonth: (year: number, month: number) => number;
  formatDateKey: (year: number, month: number, day: number) => string;
}

export const CalendarMonth: React.FC<CalendarMonthProps> = ({
  monthIndex,
  monthName,
  year,
  isMonthSelected,
  selectedDates,
  notes,
  popoverNote,
  onMonthClick,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  onDayClick,
  onDeleteNote,
  setPopoverNote,
  getDaysInMonth,
  getFirstDayOfMonth,
  formatDateKey
}) => {
  const getDateNote = (dateKey: string) => {
    return notes.find(note => note.dates.includes(dateKey));
  };

  const getDayDisplayClass = (dateKey: string, isSelected: boolean) => {
    const note = getDateNote(dateKey);
    
    if (note) {
      return `${note.color} text-white shadow-lg border-2 border-white`;
    }
    
    if (isSelected) {
      return 'bg-blue-500 text-white shadow-md transform scale-105';
    }
    
    return 'hover:bg-blue-100 hover:text-blue-700';
  };

  const daysInMonth = getDaysInMonth(year, monthIndex);
  const firstDay = getFirstDayOfMonth(year, monthIndex);
  const days = [];

  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = formatDateKey(year, monthIndex, day);
    const isSelected = selectedDates.has(dateKey);
    const note = getDateNote(dateKey);
    
    const dayElement = (
      <div
        key={day}
        className={`w-8 h-8 flex items-center justify-center text-sm cursor-pointer rounded-md transition-all duration-200 select-none ${getDayDisplayClass(dateKey, isSelected)} ${note ? 'relative' : ''}`}
        onMouseDown={() => onMouseDown(year, monthIndex, day)}
        onMouseEnter={() => onMouseEnter(year, monthIndex, day)}
        onMouseUp={onMouseUp}
        onClick={(e) => onDayClick(year, monthIndex, day, e)}
      >
        {day}
        {note && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full border border-gray-300"></div>
        )}
      </div>
    );

    if (note) {
      days.push(
        <Popover key={day} open={popoverNote?.id === note.id} onOpenChange={(open) => !open && setPopoverNote(null)}>
          <PopoverTrigger asChild>
            {dayElement}
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Note Preview</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPopoverNote(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-sm text-gray-600">
                {note.dates.length} day{note.dates.length !== 1 ? 's' : ''} selected
              </div>
              <p className="text-sm">{note.content}</p>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-gray-500">
                  {note.createdAt.toLocaleDateString()}
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDeleteNote(note.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      );
    } else {
      days.push(dayElement);
    }
  }

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${isMonthSelected ? 'ring-2 ring-blue-400 bg-blue-50' : ''}`}>
      <CardHeader className="pb-2">
        <CardTitle 
          className={`text-lg font-semibold text-center cursor-pointer transition-colors ${
            isMonthSelected ? 'text-blue-700' : 'text-gray-700 hover:text-blue-600'
          }`}
          onClick={() => onMonthClick(monthIndex)}
        >
          <div className="flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" />
            {monthName}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="text-xs font-medium text-gray-500 text-center py-1">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </CardContent>
    </Card>
  );
};
