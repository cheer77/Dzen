import { Outlet, useLocation } from 'react-router-dom';
import NavigationMenu from '../components/NavigationMenu/NavigationMenu.jsx';
import TopMenu from '../components/TopMenu/TopMenu.jsx';

const App = () => {
  const location = useLocation();

  return (
    <div className="app">
      <NavigationMenu />
      <div className="app__content">
        <TopMenu />
        <main className="app__main">
          <div className="route-transition" key={location.pathname}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
