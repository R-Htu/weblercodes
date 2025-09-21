import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AuthNavigation from '../features/auth/components/AuthNavigation';
import NotificationList from '../features/profile/pages/NotificationList';
import { useAuth } from '../features/auth/context/authContext';
import ChannelsButton from '../features/channels/components/ChannelsButton';

function Header() {
  const { userInfo } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

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

        {/* Auth actions */}
        <div className="auth-actions">
          {userInfo && <ChannelsButton />}
          {userInfo && <NotificationList />}
          <AuthNavigation />
        </div>
      </div>

      {/* Hamburger */}
      <button
        ref={buttonRef}
        className={`hamburger ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span style={{color:"blue"}}></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}

export default Header;
