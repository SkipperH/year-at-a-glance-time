
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon } from 'lucide-react';

interface SelectedDate {
  year: number;
  month: number;
  day: number;
}

const YearlyCalendar = () => {
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<SelectedDate | null>(null);

  const currentYear = new Date().getFullYear();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  const handleMouseDown = (year: number, month: number, day: number) => {
    setIsSelecting(true);
    setSelectionStart({ year, month, day });
    const dateKey = formatDateKey(year, month, day);
    
    const newSelectedDates = new Set(selectedDates);
    if (selectedDates.has(dateKey)) {
      newSelectedDates.delete(dateKey);
    } else {
      newSelectedDates.add(dateKey);
    }
    setSelectedDates(newSelectedDates);
  };

  const handleMouseEnter = useCallback((year: number, month: number, day: number) => {
    if (isSelecting && selectionStart) {
      const startDate = new Date(selectionStart.year, selectionStart.month, selectionStart.day);
      const endDate = new Date(year, month, day);
      const [earlierDate, laterDate] = startDate <= endDate ? [startDate, endDate] : [endDate, startDate];
      
      const newSelectedDates = new Set(selectedDates);
      const currentDate = new Date(earlierDate);
      
      while (currentDate <= laterDate) {
        const dateKey = formatDateKey(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        );
        newSelectedDates.add(dateKey);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      setSelectedDates(newSelectedDates);
    }
  }, [isSelecting, selectionStart, selectedDates]);

  const handleMouseUp = () => {
    setIsSelecting(false);
    setSelectionStart(null);
  };

  const clearSelection = () => {
    setSelectedDates(new Set());
  };

  const totalDaysInYear = (year: number) => {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 366 : 365;
  };

  const selectedPercentage = ((selectedDates.size / totalDaysInYear(currentYear)) * 100).toFixed(1);

  const renderMonth = (monthIndex: number) => {
    const daysInMonth = getDaysInMonth(currentYear, monthIndex);
    const firstDay = getFirstDayOfMonth(currentYear, monthIndex);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(currentYear, monthIndex, day);
      const isSelected = selectedDates.has(dateKey);
      
      days.push(
        <div
          key={day}
          className={`w-8 h-8 flex items-center justify-center text-sm cursor-pointer rounded-md transition-all duration-200 select-none ${
            isSelected
              ? 'bg-blue-500 text-white shadow-md transform scale-105'
              : 'hover:bg-blue-100 hover:text-blue-700'
          }`}
          onMouseDown={() => handleMouseDown(currentYear, monthIndex, day)}
          onMouseEnter={() => handleMouseEnter(currentYear, monthIndex, day)}
          onMouseUp={handleMouseUp}
        >
          {day}
        </div>
      );
    }

    return (
      <Card key={monthIndex} className="transition-all duration-300 hover:shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-center text-gray-700">
            {months[monthIndex]}
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CalendarIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Yearly Overview</h1>
          </div>
          <p className="text-gray-600 text-lg">Track and visualize your selected time periods throughout {currentYear}</p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md px-6 py-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{selectedDates.size}</div>
            <div className="text-sm text-gray-600">Selected Days</div>
          </div>
          <div className="bg-white rounded-lg shadow-md px-6 py-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">{selectedPercentage}%</div>
            <div className="text-sm text-gray-600">of Year</div>
          </div>
          <button
            onClick={clearSelection}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
          >
            Clear Selection
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-blue-600 border-blue-600">Tip</Badge>
          </div>
          <p className="text-gray-600 text-sm">
            Click on individual days to select them, or click and drag to select a range of days. 
            Selected days will appear in blue.
          </p>
        </div>

        {/* Calendar Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          onMouseLeave={handleMouseUp}
        >
          {Array.from({ length: 12 }, (_, i) => renderMonth(i))}
        </div>
      </div>
    </div>
  );
};

export default YearlyCalendar;
