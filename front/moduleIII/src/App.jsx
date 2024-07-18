import { Routes, Route } from "react-router-dom";
import Home from "./views/Home/Home";
import NavBar from "./components/Navbar/NavBar";
import Instalaciones from "./views/Instalaciones/Instalaciones";
import Reserva from "./views/Reservas/Reserva";
import Register from "./views/Reservas/Register/Register";
import MisTurnos from "./views/Reservas/Appointments/MisTurnos";
import Contacto from "./views/Contacto/Contacto";
import Login from "./views/Reservas/Login/Login";
import { useLocation } from "react-router-dom";
import MiPerfil from "./views/Reservas/Appointments/MiPerfil/MiPerfil";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser } from "./redux/reducer";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  // Recuperar usuario de localStorage
  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    if (savedUserId) {
      dispatch(addUser(savedUserId));
    }
  }, [dispatch]);

  return (
    <>
      {/* {isMisTurnosRoute ? <NavBarMisTurnos /> : <NavBar />} */}
      {location.pathname !== "/MisTurnos" &&
        location.pathname !== "/MiPerfil" && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Instalaciones" element={<Instalaciones />} />
        <Route path="/Reserva" element={<Reserva />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/MisTurnos" element={<MisTurnos />} />
        <Route path="/MiPerfil" element={<MiPerfil />} />
        <Route path="/Contacto/" element={<Contacto />} />
      </Routes>
    </>
  );
}

export default App;
