import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode, Navigation, Pagination, Thumbs} from "swiper";
import {useMediaQuery} from "react-responsive";
import {SUBSERVER} from "@/common/sub-server.constant";
import Image from "next/image";
import {openImages} from "@/common/open-close-popup.function";

export const ProductSlider = ({sliders, slidesLength, popupData, setPopupData, bannerClass}: any) => {
  const isMobile = useMediaQuery({maxWidth: 887});
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();
  const [direction, setDirection] = useState<any>('vertical');

  useEffect(() => {
    setDirection(isMobile ? 'horizontal' : 'vertical')
  }, [isMobile])

  return (
    <div className={`productSlider ${bannerClass}`}>
      <div className={'productSlider-small'}>
        {sliders?.length
          ? <Swiper
            onClick={setThumbsSwiper}
            direction={direction}
            loop={false}
            freeMode={false}
            spaceBetween={10}
            slidesPerView={4}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
            className={'productSlider-small__slider'}
          >
            {sliders.map((slide: any, index: number) =>
              <SwiperSlide key={index}>
                <div className={'productSlider-small__slide'}>
                  <Image className={'product-certificates__img'}
                         src={SUBSERVER + slide?.attributes?.formats?.small?.url}
                         width={slide?.attributes?.formats?.small?.width}
                         height={slide?.attributes?.formats?.small?.height}
                         alt={slide?.attributes?.formats?.small?.alternativeText ? slide?.attributes?.formats?.small?.alternativeText : slide?.attributes?.formats?.small?.name || 'image'}/>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
          : <></>
        }
      </div>

      <div className={'productSlider-big'}>
        {slidesLength &&
            <div className={'productSlider__navButtons'}>
              {sliders?.length > slidesLength && <div className={`prev nav-buttons__prev_${slidesLength}`}><span></span></div>}
              {sliders?.length > slidesLength && <div className={`next nav-buttons__next_${slidesLength}`}><span></span></div>}
            </div>
        }
        <Swiper
          loop={true}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          pagination={{
            el: `.productSlider-big__pagination`
          }}
          navigation={{
            prevEl: `.nav-buttons__prev_${slidesLength}`,
            nextEl: `.nav-buttons__next_${slidesLength}`
          }}
          modules={[FreeMode, Pagination, Navigation, Thumbs]}
          className={'productSlider-big__slider'}
        >
          {sliders.map((slide: any, index: number) =>
            <SwiperSlide key={index}>
              <div onClick={() => openImages(popupData, setPopupData, <ProductSlider bannerClass={'productSliderBanner'} sliders={sliders} slidesLength={2} popupData={popupData} setPopupData={setPopupData}/>)} className={'productSlider-big__slide'}>
                <Image className={'product-certificates__img'}
                       src={SUBSERVER + slide?.attributes?.formats?.small?.url}
                       width={slide?.attributes?.formats?.small?.width}
                       height={slide?.attributes?.formats?.small?.height}
                       alt={slide?.attributes?.formats?.small?.alternativeText ? slide?.attributes?.formats?.small?.alternativeText : slide?.attributes?.formats?.small?.name || 'image'}/>
              </div>
            </SwiperSlide>
          )}
          <div className={'productSlider-big__pagination sliderPartners__pagination'}></div>
        </Swiper>
      </div>
    </div>
  );
};