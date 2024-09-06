import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="layout_component">
        <header className="header">
          <div className="block_1_header">
            <Link to={`/`}>
              <img src="" alt="" />
            </Link>
          </div>
          <nav className="navbar">
            <ul>
              <li>
                <Link to={`/`}>Home</Link>
              </li>
            </ul>
          </nav>
          <div className="block_3_header"></div>
        </header>
        <Outlet />
        <footer className="footer"></footer>
      </div>
    </>
  );
};

export default Layout;
