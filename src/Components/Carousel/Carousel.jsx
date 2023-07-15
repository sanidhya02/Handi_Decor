import React, { useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import 'react-alice-carousel/lib/alice-carousel.css';
import BannerData from '../../Helpers/HomePageBanner'
import "./Carousel.css"

const Carousel = () => {
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3, itemsFit: 'contain' },
    };
    const carouselRef = useRef();

    const handlePrevClick = () => {
        if (carouselRef.current) {
            carouselRef.current.slidePrev();
        }
    };

    const handleNextClick = () => {
        if (carouselRef.current) {
            carouselRef.current.slideNext();
        }
    };

    const items = BannerData.map((item) => (
        <Link to={`product/type/${item.name.toLowerCase()}`} key={item.name}>
            <div className="item" style={{ marginTop: 10 }}>
                <img className='carousel-image' src={item.img} loading='lazy' alt={item.name}/>
            </div>
        </Link>
    ));
    const stagePadding = {
        paddingLeft: 0,
        paddingRight: 0,
      };
    return (
        <>
            <div className="carousel-buttons">
                <AliceCarousel
                    animationType="fadeout"
                    animationDuration={800}
                    disableButtonsControls
                    infinite
                    items={items}
                    touchTracking
                    mouseTracking
                    disableDotsControls
                    autoPlay
                    autoPlayInterval={2500}
                    responsive={responsive}
                    stagePadding={stagePadding}
                    ref={carouselRef}
                    keyboardNavigation={true}
                    
                />


                <button onClick={handlePrevClick} className="carousel-button left-button">
                    <AiOutlineArrowLeft />
                </button>
                <button onClick={handleNextClick} className="carousel-button right-button">
                    <AiOutlineArrowRight />
                </button>
            </div>
        </>
    );
}

export default Carousel;
