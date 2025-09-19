import getAllCategories from '@/apis/AllCategories';
import React from 'react'
import CategorySwiper from '../CategorySwiper/CategorySwiper'


const CategorySlider = async ()=> {

    const data = await getAllCategories();
    

  return (
    <CategorySwiper categories={data} />
  )
}

export default CategorySlider