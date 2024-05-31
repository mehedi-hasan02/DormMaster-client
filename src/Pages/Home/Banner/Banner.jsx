import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import Slide from './Slide';

import bannerImg1 from '../../../assets/banner/banner1.jpeg'
import bannerImg2 from '../../../assets/banner/banner2.jpg'
import bannerImg3 from '../../../assets/banner/banner3.jpeg'

const Banner = () => {
    return (
        <>
            <Swiper
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                pagination={true}
                // navigation={true}
                modules={[Autoplay, Pagination]}
                className="mySwiper">
                <SwiperSlide>
                    <Slide
                        image={bannerImg1}
                        heading='Seamless Meal Management'
                        description='Optimize meal planning and delivery with our seamless meal management system. Track dietary preferences, manage meal schedules, and ensure timely and nutritious meals for all residents.'
                    ></Slide>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={bannerImg2}
                        heading='Efficient Meal Tracking'
                        description='Monitor meal consumption and reduce food waste with our efficient tracking system. Keep accurate records of meal counts and dietary trends to optimize meal preparation and minimize leftovers.'
                    ></Slide>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={bannerImg3}
                        heading='Hassle-Free Meal Booking'
                        description='Streamline meal reservations with our hassle-free booking system. Allow students to easily book their meals in advance, ensuring better planning and reducing wait times during meal hours.






                        '
                    ></Slide>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Banner;