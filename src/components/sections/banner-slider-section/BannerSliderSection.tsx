import React from 'react';
import {Autoplay, EffectFade, Navigation, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import Container from "@/components/Container";
import {Button} from "@/components/ui/buttons/Button";
import 'swiper/css';
import "swiper/css/effect-fade";
import {SUBSERVER} from "@/common/sub-server.constant";
import Image from "next/image";
import {openBitrixPopup} from "@/common/open-close-popup.function";

export const Index = ({contentSleder, setPopupData}: any) => {

  return (
    <div className={'bannerSliderSection'}>
      <Swiper
        effect={"fade"}
        slidesPerView={1}
        autoplay={{
          delay: 3000
        }}
        navigation={{
          prevEl: `.banner__prev`,
          nextEl: `.banner__next`
        }}
        pagination={{
          el: `.banner__pagination`,
          clickable: true
        }}
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
        className={'bannerSlider'}
      >
        {contentSleder.map(({id, h1_text, text, ButtonSliderLink: {link, text: buttonText}, img: {data}}: any) =>  <SwiperSlide key={id}>
          <div className={'bannerSlider__slide'}>
            {data && <Image src={SUBSERVER + data.attributes.url} className={'bannerSlider__img'} width={data.attributes.width}
                    height={data.attributes.height}
                    alt={data.attributes.alternativeText ? data.attributes.alternativeText : data.attributes.name}/>}
            <div className={'content'}>
              <div className={'content__titles'}>
                {h1_text && <div className={'content__title'}>
                    <h2 className={'textH1'}>{h1_text}</h2>
                </div>}
                {text && <div className={'content__subTitle'}>{text}</div>}
              </div>
              <div className={'content__btn'}>
                <Button
                  onClick={() => link ? openBitrixPopup(link, setPopupData) : console.log('notLink')}
                  svg={null}
                  disabled={false}
                  sending={false}
                  modifier={''}
                  color={''}
                  colorSvg={''}
                >
                  {buttonText}
                </Button>
              </div>
            </div>
          </div>
        </SwiperSlide>)}
      </Swiper>
      <div className={'bannerSlider__navBtn'}>
        <Container>
          <div className={'bannerSlider__buttons'}>
            <div className={`prev banner__prev bannerSlider__prev`}><span></span></div>
            <div className={`next banner__next bannerSlider__next`}><span></span></div>
          </div>
        </Container>
      </div>
      <div className={'bannerSlider__pagination'}>
        <div className={`pagination banner__pagination`}></div>
      </div>
    </div>
  );
};

Index.defaultProps = {};

export default Index;