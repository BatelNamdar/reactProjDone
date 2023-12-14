import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import userServices from "../../services/userServices";
import Logo from "./logo";

const NavBar = () => {
  const { user } = useAuth();

  const isBusiness = user?.isBusiness;
  const [pic, setPic] = useState("");

  useEffect(() => {
    if (user) {
      const getAvatar = async () => {
        const avatar = await userServices.getUserObject();
        console.log(avatar);
        const pic = avatar.image.url;
        setPic(pic);
        return avatar;
      };

      getAvatar();
    }
  }, [user]);

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-info shadow">
        <div class="container">
          <Link to="/" className="navbar-brand">
            <Logo />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li>
                <NavLink to="/" className={"nav-link"}>
                  Home
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink to="/About" className={"nav-link"}>
                  About
                </NavLink>
              </li>
              {user ? (
                <li class="nav-item">
                  <NavLink to="/Favorite" className={"nav-link"}>
                    Favorite
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              {isBusiness && (
                <li class="nav-item">
                  <NavLink to="/Mycards" className={"nav-link"}>
                    My Cards
                  </NavLink>
                </li>
              )}
            </ul>
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              {user ? (
                <li class="nav-item">
                  <NavLink to="/Logout" className={"nav-link"}>
                    Log Out
                  </NavLink>
                </li>
              ) : (
                <>
                  <li class="nav-item">
                    <NavLink to="/SignIn" className={"nav-link"}>
                      Sign In
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink to="/SignUp" className={"nav-link"}>
                      SignUp
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink to="/SignUpBiz" className={"nav-link"}>
                      Sign Up Buissness
                    </NavLink>
                  </li>
                </>
              )}
              {user && (
                <Link to={"/EditUser"}>
                  <>
                    <img
                      className=" rounded-circle my-auto d-md-none d-lg-flex"
                      style={{ maxHeight: "2em" }}
                      src={pic}
                      alt=""
                    />
                  </>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
