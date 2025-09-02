import { features } from '@/Types/Data';
import Image from 'next/image';
import React from 'react'
import bottom_banner_image from '../../../public/assets/bottom_banner_image.png'

const BottomBanner = () => {
  return (
    <div className=" relative mt-24">
      <Image
        src={bottom_banner_image}
        alt="banner"
        width={1000}
        height={1000}
        className="w-full "
      />
    

      <div className=" absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24">
        <div>
          <h1 className=" text-2xl md:text-3xl font-semibold text-btn mb-6">
            Why We Are the Best?
          </h1>
          {features.map((feature, index) => {
            return (
              <div key={index} className=" flex items-center gap-4 mt-2">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  className=" md:w-11 w-9"
                />
                <div>
                  <h3 className=" text-lg md:text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className=" text-gray-500/70 text-xs md:text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default BottomBanner
