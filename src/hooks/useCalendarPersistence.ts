
import { useEffect } from 'react';
import { Note } from '@/types/calendar';

interface CalendarData {
  selectedDates: Set<string>;
  selectedMonths: Set<string>;
  notes: Note[];
}

interface CalendarSetters {
  setSelectedDates: (dates: Set<string>) => void;
  setSelectedMonths: (months: Set<string>) => void;
  setNotes: (notes: Note[]) => void;
}

export const useCalendarPersistence = (data: CalendarData, setters: CalendarSetters) => {
  const { selectedDates, selectedMonths, notes } = data;
  const { setSelectedDates, setSelectedMonths, setNotes } = setters;

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
  }, [setSelectedDates, setSelectedMonths, setNotes]);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    const dataToSave = {
      selectedDates: Array.from(selectedDates),
      selectedMonths: Array.from(selectedMonths),
      notes: notes
    };
    localStorage.setItem('yearlyCalendarData', JSON.stringify(dataToSave));
  }, [selectedDates, selectedMonths, notes]);
};
