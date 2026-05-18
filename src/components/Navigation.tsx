import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';

export default function Navigation() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth transition: 0-80px scroll range
  const progress = Math.min(scrollY / 80, 1);
  const showWhiteBg = isHome ? progress > 0.5 : true;

  const bgOpacity = isHome ? progress * 0.96 : 0.96;
  const blurPx = isHome ? progress * 12 : 12;
  const borderOpacity = isHome ? progress : 1;
  const shadowOpacity = isHome ? progress * 0.04 : 0.04;

  const navLinks = [
    { label: '关于左安', path: '/' },
    { label: '核心能力', path: '/services' },
    { label: '资源智库', path: '/resources' },
    { label: '人才入席', path: '/join' },
  ];

  const textColor = showWhiteBg ? '#1a2332' : '#FFFFFF';
  const mutedColor = showWhiteBg ? '#5a6779' : 'rgba(255,255,255,0.7)';

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: `rgba(255,255,255,${bgOpacity})`,
        backdropFilter: `blur(${blurPx}px)`,
        WebkitBackdropFilter: `blur(${blurPx}px)`,
        borderBottom: `1px solid rgba(226,230,237,${borderOpacity})`,
        boxShadow: `0 1px 3px rgba(0,0,0,${shadowOpacity})`,
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-1.5">
          <span className="text-sm font-bold tracking-[0.15em]" style={{ color: '#10b981', fontFamily: 'var(--font-display)' }}>
            ZAN
          </span>
          <span className="text-xs" style={{ color: 'rgba(160,190,245,0.4)' }}>·</span>
          <span className="text-sm font-medium" style={{ color: textColor, transition: 'color 0.3s ease' }}>左安</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="text-sm transition-colors duration-200 hover:text-[#10b981] relative group"
              style={{ color: mutedColor, transition: 'color 0.3s ease' }}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#10b981] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link
            to="/find-talent"
            className="text-sm px-5 py-2 text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{ backgroundColor: '#10b981' }}
          >
            招贤纳士
          </Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="菜单">
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <path d={menuOpen ? "M2 2L18 12M18 2L2 12" : "M0 1h20M0 7h20M0 13h20"} stroke={textColor} strokeWidth="1.5"/>
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 py-4 bg-white border-t border-gray-100">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.path} className="block py-2 text-sm text-[#5a6779]" onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link to="/find-talent" className="block mt-2 text-sm px-5 py-2 text-white text-center" style={{ backgroundColor: '#10b981' }} onClick={() => setMenuOpen(false)}>
            招贤纳士
          </Link>
        </div>
      )}
    </nav>
  );
}
