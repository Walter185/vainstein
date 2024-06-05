import styles from "./Header.module.css";
import { LiaMapMarkerAltSolid } from 'react-icons/lia';
import { BsFillTelephoneOutboundFill, BsWhatsapp } from 'react-icons/bs';
import { SlSocialInstagram } from "react-icons/sl";
import { TiSocialFacebookCircular} from "react-icons/ti";
import {BiLogoLinkedin} from "react-icons/bi";
import "./Nav.jsx";
import logo from "../assets/img/logoPV.png"
import styled from "styled-components";
import Nav from 'react-bootstrap/Nav';
import Barra from "./Nav.jsx";

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

function Header ({children}){
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
            <ul>
                <li><a href="https://www.instagram.com/maruvainstein" target="_blank" rel="noreferrer">
                    <SlSocialInstagram />
                </a></li>
                <li><a href="https://www.facebook.com/profile.php?id=100075352380141" target="_blank" rel="noreferrer"><TiSocialFacebookCircular /></a></li>
                <li><a href="https://www.linkedin.com/in/maria-paula-vainstein-b1700b39/" target="_blank" rel="noreferrer"><BiLogoLinkedin /></a></li>
            </ul>
        </div>
        
        <header className={styles.headercontainer}>
                {children}




                <nav className={styles.navbar}>
                <Nav.Link href='/'>
                        <Img src={logo} alt="Logo Paula Vainstein"></Img>
                 </Nav.Link>
                    <Barra></Barra>
                    <button className={styles.btn}><a href="https://wa.me/5491164883005?text=Hola%20me%20gustaria%20reservar%20un%20turno!" target="_blank" rel="noreferrer">Agendar Turno</a> </button>
                </nav>



            </header></>
    );
}

export default Header;
