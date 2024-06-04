import styles from "./Header.module.css";
import { LiaMapMarkerAltSolid } from 'react-icons/lia';
import { BsFillTelephoneOutboundFill, BsWhatsapp } from 'react-icons/bs';
import { SlSocialInstagram } from "react-icons/sl";
import { TiSocialFacebookCircular} from "react-icons/ti";
import {BiLogoLinkedin} from "react-icons/bi";
import "./Nav.jsx";
import Nav from "./Nav.jsx";
import logo from "../assets/img/logoPV.png"
import styled from "styled-components";

const Img = styled.img`
    padding: 10px;
`;

function Header ({children}){
    return (
        <>
        <div id="topper" className={styles.topper}>
            <div className={styles.loc}>
                <LiaMapMarkerAltSolid /> Guardia Vieja 3440 Piso 1° Dto."B" - Almagro
            </div>
            <div className={styles.contact}>
                {/* <BsFillTelephoneOutboundFill /> (+54) 1164883005 */}
                <BsWhatsapp /> (+54) 1164883005
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
                    <div className={styles.logo}>
                        <Img src={logo} alt="Logo Paula Vainstein"></Img>
                    </div>
                    <Nav></Nav>
                    <button className={styles.btn}><a href="https://wa.me/5491164883005?text=Hola%20me%20gustaria%20reservar%20un%20turno!" target="_blank" rel="noreferrer">Agendar Turno</a> </button>
                </nav>



            </header></>
    );
}

export default Header;
