

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useEffect, useState } from 'react';
import '@smastrom/react-rating/style.css'

import { Rating } from '@smastrom/react-rating'
import { Navigation } from 'swiper/modules';


const Testimonials = () => {
    const [reviews ,setReviews] = useState([])
    // const [rating ,setRating] =  useState('')

    useEffect(()=>{
        fetch('https://bistro-boss-server-kappa-ivory.vercel.app/reviews', {credentials: 'include'})
        .then(res => res.json())
        .then(data => setReviews(data) )
    },[])

    return (
        <section>
            <SectionTitle heading='TESTIMONIALS' subHeading='---What Our Clients Say---'></SectionTitle>
                
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper text-center w-8/12 mx-auto">
                {
                reviews.map(review => <SwiperSlide key={review._id} >
                    <div className="">
                        <Rating
                            className='mx-auto'
                            style={{ maxWidth: 180 }}
                            value={review.rating}
                            isRequired
                        />
                        <p className="w-5/6 mx-auto my-4">{review.details}</p>
                        <p className="text-2xl text-yellow-400">{review.name}</p>
                    </div>
                </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonials;