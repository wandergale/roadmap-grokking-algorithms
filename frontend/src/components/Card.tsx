import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css';

interface CardProps {
  id: string;
  title: string;
  preview: string;
}

const Card: React.FC<CardProps> = ({ id, title, preview }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    document.body.classList.add('bg-active');
    setTimeout(() => {
      navigate(`/chapters/${id}`);
    }, 100);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.cardNumber}>{id}</div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardPreview}>{preview}</p>
    </div>
  );
};

export default Card;
