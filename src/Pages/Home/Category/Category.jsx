import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import slide1 from '../../../assets/home/slide1.jpg'
import slide2 from '../../../assets/home/slide2.jpg'
import slide3 from '../../../assets/home/slide3.jpg'
import slide4 from '../../../assets/home/slide4.jpg'
import slide5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';


const Category = () => {
    return (
        <section >
            <SectionTitle  heading={'ORDER ONLINE'} subHeading={'---From 11am to 10:pm---'}></SectionTitle>
        <Swiper
            slidesPerView={4}
            spaceBetween={30}
            pagination={{
            clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
        >
            <SwiperSlide>
                <img src={slide1} alt="" />
                <h3 className='text-4xl uppercase text-center -mt-16 text-white bg-black '>Salads</h3>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide2} alt="" />
                <h3 className='text-4xl uppercase text-center -mt-16 text-white bg-black '>soups</h3>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide3} alt="" />
                <h3 className='text-4xl uppercase text-center -mt-16 text-white bg-black '>pizza</h3>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide4} alt="" />
                <h3 className='text-4xl uppercase text-center -mt-16 text-white bg-black '>desserts</h3>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide5} alt="" />
                <h3 className='text-4xl uppercase text-center -mt-16 text-white bg-black '>Salads</h3>
            </SwiperSlide>
        </Swiper>
    </section>
    );
};

export default Category;