import styles from "./Header.module.css";
import handleScroll from "./functions/fixedNavbar";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-scroll";
import Nav from "react-bootstrap/Nav";
import { animated, useSpring } from "@react-spring/web";

export default function Barra() {
  const [mobile, setMobile] = useState();
  const [display, setDisplay] = useState(false); // Cambiado a booleano

  const springs = useSpring({
    from: { height: 0 },
    to: { height: display ? 210 : 0 }, // Cambiado para que dependa de display
    config: { duration: 100 },
    reset: true,
  });

  const handleClick = () => {
    setDisplay(!display); // Alterna entre true y false
  };

  const verificaRes = useCallback(() => {
    const res = window.innerWidth;

    if (res <= 1000) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    return res;
  }, []);

  useEffect(() => {
    verificaRes();
    const addResizeListener = () => {
      window.addEventListener("resize", verificaRes);
    };
    handleScroll();
    addResizeListener();

    return () => {
      window.removeEventListener("resize", verificaRes);
    };
  }, [verificaRes]);

  return (
    <>
      {/** MOBILE */}
      {mobile === true && (
        <>
          <div
            id="hamburguer"
            className={styles.navbartrigger}
            onClick={handleClick}
          >
            ☰
          </div>
          <ul style={{ display: display ? "flex" : "none" }}>
            <animated.div style={springs}>
              <li>
              <Nav.Link href="/"
                  to="topper"
                  spy={true}
                  smooth={true}
                  onClick={handleClick}
                >
                  Inicio
                </Nav.Link>
              </li>
              <li>
                <Link to="sobre" spy={true} smooth={true} onClick={handleClick}>
                  Acerca de mí
                </Link>
              </li>
              <li>
                <Link
                  to="contacto"
                  spy={true}
                  smooth={true}
                  onClick={handleClick}
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  to="ubicacion"
                  spy={true}
                  smooth={true}
                  onClick={handleClick}
                >
                  Ubicación
                </Link>
              </li>
            </animated.div>
          </ul>
        </>
      )}
      {/** DESKTOP */}
      {mobile === false && (
        <ul>
          <li>
              <Nav.Link href="/"
                  to="topper"
                  spy={true}
                  smooth={true}
                  onClick={handleClick}
                > 
                Inicio
              </Nav.Link>
          </li>
          <li>
            <Link to="sobre" spy={true} smooth={true}>
              Acerca de mí
            </Link>
          </li>
          <li>
            <Link to="contacto" spy={true} smooth={true}>
              Contacto
            </Link>
          </li>
          <li>
            <Link to="ubicacion" spy={true} smooth={true}>
              Ubicación
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}
