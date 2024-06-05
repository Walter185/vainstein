import styles from "./Slider.module.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay} from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/bundle";
import "swiper/css/autoplay";
import { data } from "../../contents";
import useScrollReveal from "../../core/useScrollReveal";
function Slider (){
    const { useReveal } = useScrollReveal();
    useReveal(styles.slidercontainer);

    return (
        <div className={styles.slidercontainer}>
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, Autoplay]}
            slidesPerView={1}
            pagination={{clickable: true}}
            navigation
            autoplay={{ delay: 10000, pauseOnMouseEnter: true }}
            
        >     
            {data.map(item => (
                <SwiperSlide key={item.id}>
                    <div className={styles.sliderimage}>
                        <img src={item.image} alt={item.title}/>
                        <div className={styles.boxblack}></div>
                        <div className={styles.slidetext}>
                        <span>
                            <h1>{item.title}</h1>
                        </span>
                        <p>{item.description}</p>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
        </div>
    );
}

export default Slider;