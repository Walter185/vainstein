import styles from "../Sobre2/Sobre2.module.css";
import useScrollReveal from "../../Core/useScrollReveal";
import { boxcontents } from "../../contents";

function Sobre2 (){
    const { useReveal } = useScrollReveal();
    useReveal("#boxescontainer");
    return (
            <div className={styles.containersobre}>
            <div className={styles.boxsobrecontainer} id="boxescontainer">
                        <div className={styles.boxsobrecontent}>
                            <h1> Por qué tener acompañamiento Psicológico? 
                            </h1>
                <div className={styles.boxsobreitemcontainer}>
            {
                boxcontents.map(item => (
                    
                            <div key={item.id} className={styles.boxsobreitem}>
                                <img src={item.icon} width="70" height="70" alt={item.title} />
                                <div className={styles.boxsobreitemtitle}>
                                    <h2>{item.title}</h2>
                                </div>
                                
                                <p>{item.description}</p>
                            </div>
                    
                ))
            }
                </div>
                    </div>
            </div>
            </div>

    );
}

export default Sobre2;