/**
 * Função criada para deixar a navbarfixa
 */
import styles from "../Header.module.css"
const handleScroll = () => {
    const navbar = document.querySelector(`nav`);
    //seleciono o elemento nav
    const scrollPosition = window.scrollY;
    //instancio uma variavel com o posição atual do scroll

    if (scrollPosition > 0) {
    //se mexer o scroll ele fica maior que 0 logo
    //chamo a classe que deixa a navbar fixa
    //poque so queremos que ela fique fixa quando rolarmos a pagina pra baixo
        navbar.classList.add(styles.fixed);
    } else {
        navbar.classList.remove(styles.fixed);
    //quando voltar pra posição 0 removo a classe
    }
    
    // Adiciona um ouvinte de evento de rolagem quando o componente é montado
    window.addEventListener('scroll', handleScroll);
    
    // Remove o ouvinte de evento de rolagem quando o componente é desmontado
    return () => {
        window.removeEventListener('scroll', handleScroll)
    
    }
}

export default handleScroll;