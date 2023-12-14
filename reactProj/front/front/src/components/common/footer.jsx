import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth.context";

const Footer = () => {
  const { user } = useAuth();
  return (
    <footer className="py-3 bg-info">
      <ul className="nav justify-content-center pb-3 mb-3">
        <li className="nav-item">
          <Link to="/" className="nav-link link-flush text-muted">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/About" className="nav-link link-flush text-muted">
            About
          </Link>
        </li>
        {user?.isBusiness && (
          <>
            <li className="nav-item">
              <Link to="/MyCards" className="nav-link link-flush text-muted">
                My Cards
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Favorite" className="nav-link link-flush text-muted">
                Favorite
              </Link>
            </li>
          </>
        )}
      </ul>
      <p className="text-center text-body-secondary mb-0">
        © 2023 Made By Batel Namdar
      </p>
    </footer>
  );
};

export default Footer;
