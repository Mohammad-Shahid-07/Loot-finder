'use client'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
const HeroCarousel = () => {
    const images = [
        {imgUrl: '/assets/images/hero-1.svg', alt: 'Hero 1'},
        {imgUrl: '/assets/images/hero-2.svg', alt: 'Hero 2'},
        {imgUrl: '/assets/images/hero-3.svg', alt: 'Hero 3'},
        {imgUrl: '/assets/images/hero-4.svg', alt: 'Hero 4'},
        {imgUrl: '/assets/images/hero-5.svg', alt: 'Hero 5'}
    ]
  return (
    <div className="hero-carousel">
      <Carousel
      showThumbs={false}
      infiniteLoop
      // autoPlay
      // interval={2000}
      showStatus={false}
      showArrows={false}
      
      >
      {images.map((image) => (
        <Image
            src={image.imgUrl}
            height={484}
            width={484}
            alt={image.alt}
            key={image.alt}
            className="object-contain"
        />
      ))}
      </Carousel>
      <Image 
        src="/assets/icons/hand-drawn-arrow.svg"
        height={175}
        width={175}
        alt="Arrow Left"
        className="max-xl:hidden absolute -left-[15%] bottom-0 z-0"
        />
    </div>
  );
};

export default HeroCarousel;
