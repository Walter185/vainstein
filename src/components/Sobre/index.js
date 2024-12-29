import styles from "./Sobre.module.css";
import button from "../Header/Header.module.css";
import useScrollReveal from "../../Core/useScrollReveal";
import { boxcontents } from "../../contents";

function Sobre ({children}){

    const { useReveal } = useScrollReveal();
    useReveal("#containersobre", 'left', 2000, '100px');
    return (
        
        <div className={styles.containersobre} id="containersobre">
            <div className={styles.sobremim}>
            <div className={styles.sobreimg}>
                <img  id="sobre" src="/img/mpv.png" alt="Psicologa Maria Paula Vainstein"/>
            </div>
            <div  className={styles.textsobre}>
                <h1>Psicóloga María Paula Vainstein</h1>
                <h2>Egresada con Honores de la Universidad de Buenos Aires (UBA).</h2>
                    <p>No espere más en invertir en su bienestar mental! 
                    Agende su consulta y comience su transformación!
                    </p>
                    <button className={button.btn}><a href="/turnos" target="_blank" rel="noreferrer">Agendar Consulta </a></button>
                    
                
            </div>
            </div>
            {children}
        </div>
        

    );
}

export default Sobre;