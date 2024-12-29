import styles from "./Footer.module.css"
import { FiMapPin } from 'react-icons/fi';
import { SlSocialInstagram } from "react-icons/sl";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { BsWhatsapp, BsEnvelopeAt } from 'react-icons/bs';
import {BiLogoLinkedin} from "react-icons/bi";
import logo from "../assets/img/logoPVWhite.png";


function Footer (){
    return (
        <><div id="footer" className={styles.footer}>
            <section className={styles.sectionimg}>
                <img src={logo} alt="Logo Licenciada Vainstein" id="contacto"></img>
            </section>

            <section className={styles.sectioncontact}>
                <h2>CONTACTO:</h2>
                <p id="locicon"><FiMapPin />Guardia Vieja 3440</p>
                {/* <p><BsFillTelephoneOutboundFill /> (+54) 99738-6828 - Telefone</p> */}
                <p><BsWhatsapp /> (+54) 911 6488 3005- Whatsapp</p>
                <p><BsEnvelopeAt /> maru.vainstein@gmail.com</p>
            </section>

            <section className={styles.sectionsocial}>
                <h2>REDES SOCIALES</h2>
                <ul>
                    <li><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                        <SlSocialInstagram />
                    </a></li>
                    <li><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><TiSocialFacebookCircular /></a></li>
                    <li><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><BiLogoLinkedin /></a></li>
                </ul>
            </section>

        </div>
        <div className={styles.credits}>
                <p>Todos Los Derechos Rerservados &copy; María Paula Vainstein - 2025 - Desarrollado por <a href="https://linkedin.com/" target="_blank" rel="noreferrer">Walter Liendo</a></p>
            </div>
            </>

    );
}

export default Footer;