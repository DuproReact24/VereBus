import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom'; // Import useLocation for active link detection
import '../header/Header.css'
import Login from '../../pages/Login/Login';

export default function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [username, setUsername] = useState('Đăng Nhập');
  const [token, setToken] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const history = useHistory(); // Initialize useHistory
  const location = useLocation(); // Get current location
  const name = localStorage.getItem('name');
  const storedToken = localStorage.getItem('token');
  useEffect(() => { 
    setToken(storedToken);
    if (storedToken) {
     
      setUsername(`${name}`); // Example placeholder
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <a href="#" className="logo" onClick={() => history.push('/')}>VeReBus</a>
        <ul className="nav-links">
          <li className={location.pathname === '/profile/orders' ? 'active' : ''}>
            <a href="#" onClick={() => history.push('/profile/orders')}>
              <i className="fas fa-ticket-alt" /> Đơn hàng của tôi
            </a>
          </li>
          <li><a href="#"><i className="fas fa-bus" /> Mở bán vé</a></li>
          <li className="dropdown">
            <a href="#"><i className="fas fa-concierge-bell" /> Dịch vụ</a>
            <ul className="dropdown-menu">
              <li><a href="#">Đặt vé trực tuyến</a></li>
              <li><a href="#">Thanh toán điện tử</a></li>
              <li><a href="#">Hỗ trợ khách hàng</a></li>
            </ul>
          </li>
          <li><a href="#"><i className="fas fa-phone" /> Liên hệ</a></li>
          <li 
            onMouseEnter={() => token && setIsDropdownOpen(true)} 
            onMouseLeave={() => setIsDropdownOpen(false)}
            onClick={() => !token && setIsPopupOpen(true)}
          >
            <a href="#"><i className="fas fa-phone" /> {username}</a>
            {isDropdownOpen && token && (
              <ul className="dropdown-menu">
                <li><a href="/profile">Profile</a></li>
                <li onClick={handleLogout}><a href="#">Logout</a></li>
              </ul>
            )}
          </li>
        </ul>
        <div className="menu-toggle">
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </div>
      </div>
      {isPopupOpen && <Login onClose={() => setIsPopupOpen(false)} />}
    </nav>
  )
}

