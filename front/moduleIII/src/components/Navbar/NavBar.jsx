import { Link } from "react-router-dom";
import LogoLogin from "./Image/logo-login.svg";

const NavBar = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary poppins-medium">
        <div className="container-fluid poppins-medium">
          <Link to="/" className="navbar-brand poppins-semibold">
            POLIDEPORTIVO
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  INICIO
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Instalaciones" className="nav-link">
                  INSTALACIONES
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Reserva" className="nav-link">
                  RESERVA
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Contacto" className="nav-link">
                  CONTACTO
                </Link>
              </li>
            </ul>
          </div>
          <div
            style={{
              marginRight: "50px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Link to="/Login">
              <img src={LogoLogin} alt="LogoLogin" style={{ width: "30px" }} />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
