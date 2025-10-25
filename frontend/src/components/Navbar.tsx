import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import styles from './Navbar.module.css';
import logo from '../../public/book-logo.jpg';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <a href="/" className={styles.logo_img}>
            <img src={logo} alt="Book Logo" />
          </a>
          <h1 className={styles.title}>Grokking Algorithms</h1>
        </div>
        <div className={styles.actions}>
          <a
            href="https://github.com/wandergale/roadmap-grokking-algorithms"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubBtn}
          >
            GitHub
          </a>
          {isAuthenticated ? (
            <>
              <div className={styles.userInfo}>
                <div className={styles.avatar}>{getInitials(user!.name)}</div>
                <span className={styles.username}>{user!.name}</span>
              </div>
              <button onClick={logout} className={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => setShowAuthModal(true)} className={styles.loginBtn}>
              Login
            </button>
          )}
        </div>
      </nav>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default Navbar;
