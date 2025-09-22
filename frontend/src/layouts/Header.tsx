import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AuthNavigation from '../features/auth/components/AuthNavigation';
import NotificationList from '../features/profile/pages/NotificationList';
import { useAuth } from '../features/auth/context/authContext';
import ChannelsButton from '../features/channels/components/ChannelsButton';
import { useDarkMode } from '../context/DarkModeContext'; 

function Header() {
  const { userInfo } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const { darkMode, toggleDarkMode } = useDarkMode(); 

  // Apply/remove dark class on body when context changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="wb-home-header">
      <div className="logo">
        <Link to="/">
          <img src="https://i.ibb.co/bgw03TLp/weblerlogo2.png" alt="Logo" />
        </Link>
      </div>

      <div ref={menuRef} className={`right-side ${menuOpen ? 'open' : ''}`}>
        {/* Nav Links */}
        <nav className="nav-links">
          <Link to="/Courses" onClick={() => setMenuOpen(false)}>Courses</Link>
          <Link to="/Codes" onClick={() => setMenuOpen(false)}>Codes</Link>
          <Link to="/Discuss" onClick={() => setMenuOpen(false)}>Discuss</Link>
          <Link to="/Feed" onClick={() => setMenuOpen(false)}>Feed</Link>
          {userInfo && userInfo.roles.some(role => role !== 'User') && (
            <Link to="/Tools" onClick={() => setMenuOpen(false)}>Tools</Link>
          )}
        </nav>

        {/* Auth actions + Dark Mode Button */}
        <div className="auth-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {userInfo && <ChannelsButton />}
          {userInfo && <NotificationList />}
          <AuthNavigation />
        </div>
      </div>
      
      {/* 🌙 Dark mode toggle button */}
      <button
        onClick={toggleDarkMode} 
        className="dark-mode-toggle"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? '☀' : '☾'}
      </button>

      {/* Hamburger */}
      <button
        ref={buttonRef}
        className={`hamburger ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}

export default Header;
