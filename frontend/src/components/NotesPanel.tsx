import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import styles from './NotesPanel.module.css';

interface Note {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

interface NotesPanelProps {
  chapterId: string;
}

const NotesPanel: React.FC<NotesPanelProps> = ({ chapterId }) => {
  const { isAuthenticated } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      loadNotes();
    }
  }, [isAuthenticated, chapterId]);

  const loadNotes = async () => {
    try {
      const response = await api.get(`/notes?chapterId=${chapterId}`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const handleSave = async () => {
    if (!noteText.trim()) return;

    try {
      if (editingId) {
        await api.put(`/notes/${editingId}`, { text: noteText });
      } else {
        await api.post('/notes', { chapterId, text: noteText });
      }
      setNoteText('');
      setIsAdding(false);
      setEditingId(null);
      loadNotes();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleEdit = (note: Note) => {
    setEditingId(note.id);
    setNoteText(note.text);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this note?')) return;

    try {
      await api.delete(`/notes/${id}`);
      loadNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleCancel = () => {
    setNoteText('');
    setIsAdding(false);
    setEditingId(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.notesPanel}>
        <h3 className={styles.notesPanelTitle}>My Notes</h3>
        <div className={styles.loginPrompt}>
          <p>Login to add and view your personal notes for this chapter.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.notesPanel}>
      <h3 className={styles.notesPanelTitle}>My Notes</h3>

      {isAdding ? (
        <div className={styles.noteForm}>
          <textarea
            className={styles.noteTextarea}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write your note here..."
            autoFocus
          />
          <div className={styles.noteFormActions}>
            <button onClick={handleSave} className={styles.saveBtn}>
              {editingId ? 'Update' : 'Save'}
            </button>
            <button onClick={handleCancel} className={styles.cancelBtn}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)} className={styles.addNoteBtn}>
          + Add Note
        </button>
      )}

      <div className={styles.notesList}>
        {notes.length === 0 ? (
          <div className={styles.emptyState}>No notes yet. Add your first note!</div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className={styles.noteItem}>
              <div className={styles.noteActions}>
                <button onClick={() => handleEdit(note)} className={styles.editBtn}>
                  Edit
                </button>
                <button onClick={() => handleDelete(note.id)} className={styles.deleteBtn}>
                  Delete
                </button>
              </div>
              <p className={styles.noteText}>{note.text}</p>
              <div className={styles.noteDate}>{formatDate(note.updatedAt)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesPanel;
