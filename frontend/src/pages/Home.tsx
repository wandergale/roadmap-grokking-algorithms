import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Card from '../components/Card';
import styles from './Home.module.css';

interface Chapter {
  id: string;
  title: string;
  preview: string;
}

const Home: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.remove('bg-active');
    loadChapters();
  }, []);

  const loadChapters = async () => {
    try {
      const response = await api.get('/chapters');
      setChapters(response.data);
    } catch (error) {
      console.error('Error loading chapters:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.home}>Loading...</div>;
  }

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Grokking Algorithms Roadmap</h1>
        <p className={styles.headerSubtitle}>
          An illustrated guide to algorithms. Click on any chapter to explore its content,
          algorithms, and add your personal notes.
        </p>
      </div>
      <div className={styles.grid}>
        {chapters.map((chapter) => (
          <Card
            key={chapter.id}
            id={chapter.id}
            title={chapter.title}
            preview={chapter.preview}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
