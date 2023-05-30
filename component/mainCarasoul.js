import React from 'react'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Slider from '../Images/Slider.png'
import styles from "../styles/MainCarasoul.module.css";
import Image from 'next/image';

const MainCarousel = () => {
  return (
    // <Carousel className={`${styles["main-slide"]} ${styles["container"]}`} showThumbs={false} autoPlay="false">
    <div>
        <Image src={Slider} alt="slider"   className={styles.imgslider}   />
    </div>
   
// </Carousel>
  )
}
export default MainCarousel