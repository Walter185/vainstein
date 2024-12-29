import styles from "./Header.module.css";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import { BsFillTelephoneOutboundFill, BsWhatsapp } from "react-icons/bs";
import { SlSocialInstagram } from "react-icons/sl";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { BiLogoLinkedin } from "react-icons/bi";
import "./Nav.jsx";
import logo from "../assets/img/logoPV.png";
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import Barra from "./Nav.jsx";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../Context/Context.js";
import { PsiContext } from "../../Context/Context.js";

const Img = styled.img`
  width: 230px !important;
  height: 90px !important;
  padding-right: 50px;

  @media screen and (max-width: 800px) {
    width: 150px !important;
    height: 80px !important;
    margin-left: 2px;
    margin-right: -5px;
    padding-right: 0;
  }
`;

function Header({ children }) {
  const { logout, currentUser } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const { theme, toggleTheme } = useContext(PsiContext);

  const containerStyles = {
    backgroundColor: theme === "dark" ? "#343a40" : "#ED1C24",
    color: theme === "dark" ? "#fff" : "white",
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      if (currentUser) {
        const db = getFirestore();
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      }
    };

    fetchUserRole();
  }, [currentUser]);

  return (
    <>
      <div id="topper" className={styles.topper}>
        <div className={styles.loc}>
          <LiaMapMarkerAltSolid /> Guardia Vieja 3440 Piso 1°"B" - C.A.B.A.
        </div>
        <div className={styles.contact}>
          <BsFillTelephoneOutboundFill /> (54) 1164883005
          <BsWhatsapp /> (54) 1164883005
        </div>
        <ul className={styles.social}>
          <li>
            <a
              href="https://www.instagram.com/maruvainstein"
              target="_blank"
              rel="noreferrer"
            >
              <SlSocialInstagram />
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/profile.php?id=100075352380141"
              target="_blank"
              rel="noreferrer"
            >
              <TiSocialFacebookCircular />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/maria-paula-vainstein-b1700b39/"
              target="_blank"
              rel="noreferrer"
            >
              <BiLogoLinkedin />
            </a>
          </li>
        </ul>
      </div>

      <header className={styles.headercontainer}>
        {children}

        <nav className={styles.navbar}>
          <Nav.Link href="/">
            <Img src={logo} alt="Logo Paula Vainstein"></Img>
          </Nav.Link>
          <Barra />
          {currentUser && (
            <Nav.Link href="/admin" className="admin">
                Mis Turnos &nbsp; &nbsp; 
            </Nav.Link>
          )}
          {!currentUser && (
            <Nav.Link className="ingresar" href="/login">
                Ingresar
            </Nav.Link>
          )}
          {currentUser && (
            <Nav.Link
              id="logout"
              href="/"
              name="logout"
              onClick={async (e) => {
                await logout();
              }}
            >
              Salir
            </Nav.Link>
          )}
        </nav>
      </header>
    </>
  );
}

export default Header;
