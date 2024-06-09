import ScrollReveal from "scrollreveal";
import { useEffect } from "react";
    export default function useReveal(props, origin, duration, distance, easing){
    useEffect(() =>{
        ScrollReveal().reveal(props, {
            duration: duration || 1000,
            origin: origin || 'top', // ou 'left', 'right', 'top'
            distance: distance || '20px',
            easing: easing || 'ease-in-out',
        })
    }, [props]);

    return {
        useReveal,
    }
    }

    

