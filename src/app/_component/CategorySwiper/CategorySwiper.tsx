'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
import { Category } from '@/types/Products.type';

function CategorySwiper({ categories } : { categories: Category[] }) {
  return (
    <div className='mb-5'>
      <Swiper
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        breakpoints={{
          320: { slidesPerView: 2 },   
          480: { slidesPerView: 3 },  
          768: { slidesPerView: 4 }, 
          1024: { slidesPerView: 6 }, 
        }}
      >
        {categories.map((category, idx: number) => (
          <SwiperSlide key={idx} className="flex flex-col items-center">
            <Image
              width={500}
              height={500}
              src={category.image}
              alt={category.name}
              className='h-[80px] sm:h-[100px] md:h-[200px] w-full object-cover rounded-lg'
            />
            <p className='text-center my-3 text-sm sm:text-base md:text-lg'>{category.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CategorySwiper;
