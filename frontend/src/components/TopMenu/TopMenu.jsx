import { useEffect, useState } from 'react';
import { socket } from '../../services/socket/socket.js';

const TopMenu = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    socket.connect();
    socket.on('usersCount', setUsersCount);

    return () => {
      window.clearInterval(timerId);
      socket.off('usersCount', setUsersCount);
      socket.disconnect();
    };
  }, []);

  return (
    <header className="top-menu">
      <div className="top-menu__time">
        <span className="top-menu__label">Current time</span>
        <strong className="top-menu__value">{currentTime.toLocaleTimeString()}</strong>
      </div>
      <div className="top-menu__counter" aria-live="polite">
        <span className="top-menu__label">Active users</span>
        <strong className="top-menu__value">{usersCount}</strong>
      </div>
    </header>
  );
};

export default TopMenu;
