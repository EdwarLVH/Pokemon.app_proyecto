import { Outlet, Link } from 'react-router-dom';

const Layout = () => (
  <div>
    <nav style={{ marginBottom: '20px', backgroundColor: '#f8f9fa', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
        <Link to="/types">Types</Link>
      </div>
      <span style={{ alignSelf: 'center', color: '#007bff', fontWeight: 'bold', fontSize: '18px' }}>
        Made by Eduard Leandro Vasquez Hidalgo
      </span>
    </nav>
    <Outlet />
  </div>
);

export default Layout;