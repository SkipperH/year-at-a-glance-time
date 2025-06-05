import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, StickyNote, Calendar, X } from 'lucide-react';

interface SelectedDate {
  year: number;
  month: number;
  day: number;
}

interface Note {
  id: string;
  dates: string[];
  content: string;
  createdAt: Date;
  color: string;
}

const YearlyCalendar = () => {
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());
  const [selectedMonths, setSelectedMonths] = useState<Set<string>>(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<SelectedDate | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState('');
  const [showNotesPanel, setShowNotesPanel] = useState(false);
  const [popoverNote, setPopoverNote] = useState<Note | null>(null);

  const currentYear = new Date().getFullYear();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const noteColors = [
    'bg-emerald-400',
    'bg-purple-400', 
    'bg-orange-400',
    'bg-pink-400',
    'bg-cyan-400',
    'bg-yellow-400',
    'bg-red-400',
    'bg-indigo-400'
  ];

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('yearlyCalendarData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.selectedDates) {
          setSelectedDates(new Set(parsedData.selectedDates));
        }
        if (parsedData.selectedMonths) {
          setSelectedMonths(new Set(parsedData.selectedMonths));
        }
        if (parsedData.notes) {
          const notesWithDates = parsedData.notes.map((note: any) => ({
            ...note,
            createdAt: new Date(note.createdAt)
          }));
          setNotes(notesWithDates);
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    const dataToSave = {
      selectedDates: Array.from(selectedDates),
      selectedMonths: Array.from(selectedMonths),
      notes: notes
    };
    localStorage.setItem('yearlyCalendarData', JSON.stringify(dataToSave));
  }, [selectedDates, selectedMonths, notes]);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  const formatMonthKey = (year: number, month: number) => {
    return `${year}-${month.toString().padStart(2, '0')}`;
  };

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

  const handleMonthClick = (monthIndex: number) => {
    const monthKey = formatMonthKey(currentYear, monthIndex);
    const newSelectedMonths = new Set(selectedMonths);
    const newSelectedDates = new Set(selectedDates);
    
    if (selectedMonths.has(monthKey)) {
      // Remove month and all its days
      newSelectedMonths.delete(monthKey);
      const daysInMonth = getDaysInMonth(currentYear, monthIndex);
      for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = formatDateKey(currentYear, monthIndex, day);
        newSelectedDates.delete(dateKey);
      }
    } else {
      // Add month and all its days
      newSelectedMonths.add(monthKey);
      const daysInMonth = getDaysInMonth(currentYear, monthIndex);
      for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = formatDateKey(currentYear, monthIndex, day);
        newSelectedDates.add(dateKey);
      }
    }
    
    setSelectedMonths(newSelectedMonths);
    setSelectedDates(newSelectedDates);
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
    setSelectedMonths(new Set());
  };

  const saveNote = () => {
    if (currentNote.trim() && selectedDates.size > 0) {
      const colorIndex = notes.length % noteColors.length;
      const newNote: Note = {
        id: Date.now().toString(),
        dates: Array.from(selectedDates),
        content: currentNote.trim(),
        createdAt: new Date(),
        color: noteColors[colorIndex]
      };
      setNotes([...notes, newNote]);
      setCurrentNote('');
      clearSelection();
    }
  };

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    setPopoverNote(null);
  };

  const handleDayClick = (year: number, month: number, day: number, e: React.MouseEvent) => {
    const dateKey = formatDateKey(year, month, day);
    const note = getDateNote(dateKey);
    
    if (note) {
      e.stopPropagation();
      setPopoverNote(note);
    }
  };

  const totalDaysInYear = (year: number) => {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 366 : 365;
  };

  const selectedPercentage = ((selectedDates.size / totalDaysInYear(currentYear)) * 100).toFixed(1);

  const renderMonth = (monthIndex: number) => {
    const daysInMonth = getDaysInMonth(currentYear, monthIndex);
    const firstDay = getFirstDayOfMonth(currentYear, monthIndex);
    const monthKey = formatMonthKey(currentYear, monthIndex);
    const isMonthSelected = selectedMonths.has(monthKey);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(currentYear, monthIndex, day);
      const isSelected = selectedDates.has(dateKey);
      const note = getDateNote(dateKey);
      
      const dayElement = (
        <div
          key={day}
          className={`w-8 h-8 flex items-center justify-center text-sm cursor-pointer rounded-md transition-all duration-200 select-none ${getDayDisplayClass(dateKey, isSelected)} ${note ? 'relative' : ''}`}
          onMouseDown={() => handleMouseDown(currentYear, monthIndex, day)}
          onMouseEnter={() => handleMouseEnter(currentYear, monthIndex, day)}
          onMouseUp={handleMouseUp}
          onClick={(e) => handleDayClick(currentYear, monthIndex, day, e)}
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
                    onClick={() => deleteNote(note.id)}
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
      <Card key={monthIndex} className={`transition-all duration-300 hover:shadow-lg ${isMonthSelected ? 'ring-2 ring-blue-400 bg-blue-50' : ''}`}>
        <CardHeader className="pb-2">
          <CardTitle 
            className={`text-lg font-semibold text-center cursor-pointer transition-colors ${
              isMonthSelected ? 'text-blue-700' : 'text-gray-700 hover:text-blue-600'
            }`}
            onClick={() => handleMonthClick(monthIndex)}
          >
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              {months[monthIndex]}
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

        {/* Stats and Controls */}
        <div className="flex justify-center gap-6 mb-8 flex-wrap">
          <div className="bg-white rounded-lg shadow-md px-6 py-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{selectedDates.size}</div>
            <div className="text-sm text-gray-600">Selected Days</div>
          </div>
          <div className="bg-white rounded-lg shadow-md px-6 py-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">{selectedPercentage}%</div>
            <div className="text-sm text-gray-600">of Year</div>
          </div>
          <div className="bg-white rounded-lg shadow-md px-6 py-4 text-center">
            <div className="text-2xl font-bold text-green-600">{selectedMonths.size}</div>
            <div className="text-sm text-gray-600">Selected Months</div>
          </div>
          <button
            onClick={clearSelection}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
          >
            Clear Selection
          </button>
          <button
            onClick={() => setShowNotesPanel(!showNotesPanel)}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <StickyNote className="w-4 h-4" />
            Notes ({notes.length})
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-blue-600 border-blue-600">Tips</Badge>
          </div>
          <div className="text-gray-600 text-sm space-y-1">
            <p>• Click on individual days to select them, or click and drag to select a range of days.</p>
            <p>• Click on month names to select/deselect entire months.</p>
            <p>• Use the Notes panel to add notes to your selected time periods.</p>
            <p>• Days with notes are color-coded and show a small indicator dot.</p>
            <p>• Click on colored days to view note previews in a popup.</p>
          </div>
        </div>

        {/* Notes Panel */}
        {showNotesPanel && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <StickyNote className="w-5 h-5" />
              Notes for Selected Period
            </h3>
            
            {selectedDates.size > 0 && (
              <div className="mb-4">
                <Textarea
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  placeholder="Add a note for the selected time period..."
                  className="mb-2"
                />
                <Button onClick={saveNote} disabled={!currentNote.trim()}>
                  Save Note
                </Button>
              </div>
            )}

            {selectedDates.size === 0 && (
              <p className="text-gray-500 mb-4">Select some dates first to add notes.</p>
            )}

            {notes.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Saved Notes:</h4>
                {notes.map((note) => (
                  <div key={note.id} className="border rounded-lg p-3 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded ${note.color}`}></div>
                        <span className="text-sm text-gray-600">
                          {note.dates.length} day{note.dates.length !== 1 ? 's' : ''} selected
                        </span>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteNote(note.id)}
                      >
                        Delete
                      </Button>
                    </div>
                    <p className="text-gray-800">{note.content}</p>
                    <span className="text-xs text-gray-500">
                      {note.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

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
