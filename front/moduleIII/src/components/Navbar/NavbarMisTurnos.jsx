import { Link } from "react-router-dom";
import LogoOut from "./Image/logo-loginout.svg";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import styles from "./NavarMisTurnos.module.css";
import { useSelector } from "react-redux";

const NavBarMisTurnos = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const handleLogout = () => {
    swal({
      title: "¿Estás seguro de cerrar sesión?",
      text: "Se cerrará la sesión actual",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        navigate("/");
      }
    });
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary poppins-medium">
        <div className="container-fluid poppins-medium">
          <div className="navbar-brand poppins-semibold"> POLIDEPORTIVO</div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/MisTurnos" className="nav-link">
                  Mis Turnos
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/MiPerfil" className="nav-link">
                  Mi Perfil
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
            <div className={styles.containerIcon}>
              <div className={styles.icono}>
                <img
                  src={
                    userData.photo ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="logo"
                />
              </div>
            </div>
            <div>
              <img
                src={LogoOut}
                alt="logoOut"
                className={styles.logoOut}
                onClick={handleLogout}
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBarMisTurnos;
