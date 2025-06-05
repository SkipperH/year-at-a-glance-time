
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StickyNote } from 'lucide-react';
import { Note } from '@/types/calendar';

interface NotesPanelProps {
  showNotesPanel: boolean;
  selectedDatesCount: number;
  currentNote: string;
  setCurrentNote: (note: string) => void;
  onSaveNote: () => void;
  notes: Note[];
  onDeleteNote: (noteId: string) => void;
}

export const NotesPanel: React.FC<NotesPanelProps> = ({
  showNotesPanel,
  selectedDatesCount,
  currentNote,
  setCurrentNote,
  onSaveNote,
  notes,
  onDeleteNote
}) => {
  if (!showNotesPanel) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <StickyNote className="w-5 h-5" />
        Notes for Selected Period
      </h3>
      
      {selectedDatesCount > 0 && (
        <div className="mb-4">
          <Textarea
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            placeholder="Add a note for the selected time period..."
            className="mb-2"
          />
          <Button onClick={onSaveNote} disabled={!currentNote.trim()}>
            Save Note
          </Button>
        </div>
      )}

      {selectedDatesCount === 0 && (
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
                  onClick={() => onDeleteNote(note.id)}
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
  );
};
