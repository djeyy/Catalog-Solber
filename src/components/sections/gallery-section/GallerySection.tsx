import React from 'react';
import Section from "@/components/sections/section/Section";
import Container from "@/components/Container";
import {ThirdTitle} from "@/components/titles/ThirdTitle";
import {SecondTitle} from "@/components/titles/SecondTitle";
import {Navigation, Pagination} from "swiper";
import Image from "next/image";
import {SUBSERVER} from "@/common/sub-server.constant";
import {Swiper, SwiperSlide} from "swiper/react";

export const Index = (data: any) => {
  return (
    <Section colorBack={data.theme}>
      <div className={'gallerySection'}>
        <Container>
          <div className={'defaultSlider'}>
            <div className={'defaultSlider-header'}>
              <div className={'defaultSlider-header__titles'}>
                <div className={'defaultSlider-header__titleName'}>
                  {data?.hTitle?.h3Title && <ThirdTitle nameSection={data?.hTitle?.h3Title}/>}
                </div>
                <div className={'defaultSlider-header__title'}>
                  {data?.hTitle?.h2Title && <SecondTitle title={data?.hTitle?.h2Title}/>}
                </div>
              </div>
              <div className={'nav-button'}>
                {data?.Images > 4 && <div className={`prev nav-button__prev`}><span></span></div>}
                {data?.Images > 4 && <div className={`next nav-button__next`}><span></span></div>}
              </div>
            </div>
            <div className={'defaultSlider__wrapper'}>
              <Swiper
                spaceBetween={24}
                navigation={{
                  prevEl: '.nav-button__prev',
                  nextEl: '.nav-button__next'
                }}
                pagination={{
                  el: `.nav__pagination`,
                  clickable: true
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 1
                  },
                  887: {
                    slidesPerView: 2
                  },
                  1150: {
                    slidesPerView: 3
                  },
                  1472: {
                    slidesPerView: 4
                  }
                }}
                modules={[Navigation, Pagination]}
              >
                {data?.Images.map(({id, img: {data}}: any) =>  <SwiperSlide key={id}>
                  <div className={'photoItem'}>
                    {data && <Image className={'photoItem__img'}
                                    width={data?.attributes?.width}
                                    height={data?.attributes?.height}
                                    src={SUBSERVER + data?.attributes?.url}
                                    alt={data?.attributes?.alternativeText ? data?.attributes?.alternativeText : data?.attributes?.name}/>}
                  </div>
                </SwiperSlide>)}
              </Swiper>
              <div className={'nav__pagination'}></div>
            </div>
          </div>
          {data?.content && <div className={'gallerySection__description textH6'} dangerouslySetInnerHTML={{__html: data?.content}} />}
        </Container>
      </div>
    </Section>
  );
};

Index.defaultProps = {};

export default Index;