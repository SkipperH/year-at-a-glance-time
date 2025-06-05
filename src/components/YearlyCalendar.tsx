
import React, { useState, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon } from 'lucide-react';
import { CalendarStats } from './CalendarStats';
import { NotesPanel } from './NotesPanel';
import { CalendarMonth } from './CalendarMonth';
import { useCalendarPersistence } from '@/hooks/useCalendarPersistence';
import { useCalendarUtils } from '@/hooks/useCalendarUtils';
import { SelectedDate, Note } from '@/types/calendar';

const YearlyCalendar = () => {
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());
  const [selectedMonths, setSelectedMonths] = useState<Set<string>>(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<SelectedDate | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState('');
  const [showNotesPanel, setShowNotesPanel] = useState(false);
  const [popoverNote, setPopoverNote] = useState<Note | null>(null);

  const { getDaysInMonth, getFirstDayOfMonth, formatDateKey, formatMonthKey, totalDaysInYear } = useCalendarUtils();

  // Use persistence hook
  useCalendarPersistence(
    { selectedDates, selectedMonths, notes },
    { setSelectedDates, setSelectedMonths, setNotes }
  );

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
  }, [isSelecting, selectionStart, selectedDates, formatDateKey]);

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
    const note = notes.find(note => note.dates.includes(dateKey));
    
    if (note) {
      e.stopPropagation();
      setPopoverNote(note);
    }
  };

  const selectedPercentage = ((selectedDates.size / totalDaysInYear(currentYear)) * 100).toFixed(1);

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
        <CalendarStats
          selectedDatesCount={selectedDates.size}
          selectedPercentage={selectedPercentage}
          selectedMonthsCount={selectedMonths.size}
          notesCount={notes.length}
          onClearSelection={clearSelection}
          onToggleNotesPanel={() => setShowNotesPanel(!showNotesPanel)}
        />

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
        <NotesPanel
          showNotesPanel={showNotesPanel}
          selectedDatesCount={selectedDates.size}
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
          onSaveNote={saveNote}
          notes={notes}
          onDeleteNote={deleteNote}
        />

        {/* Calendar Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          onMouseLeave={handleMouseUp}
        >
          {Array.from({ length: 12 }, (_, i) => {
            const monthKey = formatMonthKey(currentYear, i);
            const isMonthSelected = selectedMonths.has(monthKey);
            
            return (
              <CalendarMonth
                key={i}
                monthIndex={i}
                monthName={months[i]}
                year={currentYear}
                isMonthSelected={isMonthSelected}
                selectedDates={selectedDates}
                notes={notes}
                popoverNote={popoverNote}
                onMonthClick={handleMonthClick}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseUp={handleMouseUp}
                onDayClick={handleDayClick}
                onDeleteNote={deleteNote}
                setPopoverNote={setPopoverNote}
                getDaysInMonth={getDaysInMonth}
                getFirstDayOfMonth={getFirstDayOfMonth}
                formatDateKey={formatDateKey}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default YearlyCalendar;
