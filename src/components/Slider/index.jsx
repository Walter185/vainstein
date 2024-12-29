// import Swiper from "swiper"
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import styles from "./Slider.module.css";
import useScrollReveal from "../../Core/useScrollReveal.js";
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/bundle";
import "swiper/css/autoplay";
import "swiper/swiper-bundle.css";
import { data } from "../../contents";


export default function Slider() {
  const { useReveal } = useScrollReveal();
  useReveal(styles.slidercontainer);


  return (

      <div id="Slider" className={styles.slidercontainer}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
      >
           {data.map(item => (
                <SwiperSlide key={item.id}>
                    <div className={styles.sliderimage}>
                        <img src={item.image} alt={item.title}/>
                        {/* <div className={styles.boxblack}></div>
                        <div className={styles.slidetext}>
                        <span>
                            <h1>{item.title}</h1>
                        </span>
                        <p>{item.description}</p>
                        </div> */}
                    </div>
                </SwiperSlide>
            ))}
          </Swiper>
      </div>
  )
}

