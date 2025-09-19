'use client'
import React from 'react'
import banner1 from '@/assets/images/grocery-banner.png'
import banner2 from '@/assets/images/grocery-banner-2.jpeg'
import slider1 from '@/assets/images/slider-image-1.jpeg'
import slider2 from '@/assets/images/slider-image-2.jpeg'
import slider3 from '@/assets/images/slider-image-3.jpeg'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

function MainSlider() {
  return (
 <section className='mb-10 flex'>
    <div className="w-2/3">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        <SwiperSlide> <Image src={slider1} alt='slider1' className='h-[200px] md:h-[400px] w-full object-cover'/></SwiperSlide>
        <SwiperSlide> <Image src={slider2} alt='slider2' className='h-[200px] md:h-[400px] w-full object-cover'/></SwiperSlide>
        <SwiperSlide> <Image src={slider3} alt='slider3' className='h-[200px] md:h-[400px] w-full object-cover'/></SwiperSlide>
      </Swiper>
    </div>

    <div className="w-1/3 flex flex-col">
      <Image src={banner1} alt='banner1' className='w-full h-[100px] md:h-[200px] object-cover'/>
      <Image src={banner2} alt='banner2' className='w-full h-[100px] md:h-[200px] object-cover'/>
    </div>
 </section>
    
  )
}

export default MainSlider
