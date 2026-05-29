import { NavLink } from 'react-router-dom';

const NavigationMenu = () => (
  <aside className="navigation-menu">
    <h1 className="navigation-menu__logo">Orders & Products</h1>
    <nav className="navigation-menu__nav" aria-label="Main navigation">
      <NavLink
        to="/orders"
        className={({ isActive }) =>
          `navigation-menu__link${isActive ? ' navigation-menu__link--active' : ''}`
        }
      >
        Orders
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          `navigation-menu__link${isActive ? ' navigation-menu__link--active' : ''}`
        }
      >
        Products
      </NavLink>
    </nav>
  </aside>
);

export default NavigationMenu;
