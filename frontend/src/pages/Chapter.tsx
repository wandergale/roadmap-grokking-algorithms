import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import NotesPanel from '../components/NotesPanel';
import styles from './Chapter.module.css';

interface ChapterData {
  id: string;
  title: string;
  summary: string;
  topics: string[];
  algorithm?: string;
}

const Chapter: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState<ChapterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChapter();
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleBack();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [id]);

  const loadChapter = async () => {
    try {
      const response = await api.get(`/chapters/${id}`);
      setChapter(response.data);
    } catch (error) {
      console.error('Error loading chapter:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    document.body.classList.remove('bg-active');
    navigate('/');
  };

  if (loading) {
    return <div className={styles.loading}>Loading chapter...</div>;
  }

  if (!chapter) {
    return <div className={styles.loading}>Chapter not found</div>;
  }

  return (
    <div className={styles.chapter}>
      <button onClick={handleBack} className={styles.backButton}>
        ← Back to Chapters
      </button>

      <div className={styles.chapterHeader}>
        <div className={styles.chapterNumber}>Chapter {chapter.id}</div>
        <h1 className={styles.chapterTitle}>{chapter.title}</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Summary</h2>
          <p className={styles.summary}>{chapter.summary}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Topics Covered</h2>
          <ul className={styles.topicsList}>
            {chapter.topics.map((topic, index) => (
              <li key={index} className={styles.topicItem}>
                {topic}
              </li>
            ))}
          </ul>
        </div>

        {chapter.algorithm && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Algorithm</h2>
            <pre className={styles.algorithmCode}>{chapter.algorithm}</pre>
          </div>
        )}

        <NotesPanel chapterId={chapter.id} />
      </div>
    </div>
  );
};

export default Chapter;
