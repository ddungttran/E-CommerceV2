import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="header">
      <nav className="first-nav">
        <ul className="first-nav-list">
          <li className="first-nav-item">
            <Link to="/profile" className="first-nav-link">Profile</Link> {/* Replaced Search with Profile */}
          </li>
          <li className="first-nav-item">
            <Link to="/products" className="first-nav-link">Products</Link>
          </li>
          <li className="first-nav-item">
            <Link to="/contact" className="first-nav-link">Contact Us</Link>
          </li>
          <li className="first-nav-item">
            <Link to="/login" className="first-nav-link">Sign In</Link>
          </li>
          <li className="first-nav-item">
            <Link to="/cart" className="first-nav-link">
              <i className="fas fa-shopping-cart">(0)</i>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="heading">
        <h1 className="heading-text">
          <Link to="/" className="home-link">Furniture Store</Link>
        </h1>
      </div>
    </header>
  );
}

export default Navbar;
