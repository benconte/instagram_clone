import React from 'react'
import { dummyData } from "../../../dummy"
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Navigation, HashNavigation } from "swiper";

function Story() {
  console.log(dummyData)
  return (
    <div className='w-full h-28 flex items-center bg-white rounded-[8px] pl-3 md:pl-5 border border-solid border-[#DBDBDB] overflow-x-hidden'>
      <Swiper
        slidesPerView={6}
        spaceBetween={1}
        pagination={{
          enabled: false,
        }}
        navigation={true}
        modules={[Navigation]}


        // allowTouchMove={false}
        className="mySwiper"
      >
        {dummyData.map((story, index) => (
          <SwiperSlide key={index} data-hash={`slide${index}`}>
            <div className='h-[83px] w-auto cursor-pointer'>
              <div className="instagram-story relative">
                <img src={story.user.profile} className="w-[65px] h-[65px] p-[3px] rounded-full" />
                <span className='absolute -bottom-5 w-full h-auto text-center text-sm lowercase text-[rgb(139,139,139)] truncate block'>{story.user.name}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Story