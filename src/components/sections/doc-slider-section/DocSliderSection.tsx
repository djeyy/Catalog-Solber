import React, {useEffect, useState} from 'react';
import Container from "@/components/Container";
import {TabButtons} from "@/components/TabButtons";
import Section from "@/components/sections/section/Section";
import {ThirdTitle} from "@/components/titles/ThirdTitle";
import {SecondTitle} from "@/components/titles/SecondTitle";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";
import Image from "next/image";
import {SUBSERVER} from "@/common/sub-server.constant";

type Props = {
  tab: boolean;
  DocSliderContent: []
}

type DataSliderProps ={
  id: number;
  all: boolean;
  active: boolean;
  h2Title: string;
  h3Title: string;
  imgGroup: [];
}

const Index = ({tab, DocSliderContent}: Props) => {
  const [dataSlider, setDataSlider] = useState<any>([])


  useEffect(() => {
    const data = [];

    // @ts-ignore
    for (const {id, hTitle: {h2Title, h3Title}, titleTab: tabText, imgGroup} of DocSliderContent) {
      data.push({
        id,
        active: id === 9999,
        h2Title,
        h3Title,
        tabText,
        imgGroup
      })
    }

    data.unshift({id: 9999, active: true, tabText: 'Все сертификаты', all: true})

    setDataSlider(data)
  }, [DocSliderContent])

  return (
    <Section colorBack={''}>
      <div className={'docSliderSection'}>
        <Container>
          {tab && dataSlider?.imgGroup?.length && <TabButtons stateTabs={dataSlider} setStateTabs={setDataSlider}/>}
          {dataSlider.map(({id, all, active, h2Title, h3Title, imgGroup}: DataSliderProps) =>
            <div key={id} className={`certificatesSlider defaultSlider ${active && 'active'} ${all && 'none'}`}>
              <div className={'certificatesSlider-header defaultSlider-header'}>
                <div className={'certificatesSlider-header__title defaultSlider-header__titles'}>
                  <div className={'certificatesSlider-header__titleName defaultSlider-header__titleName'}>
                    {h3Title && <ThirdTitle nameSection={h3Title}/>}
                  </div>
                  <div className={'certificatesSlider-header__title defaultSlider-header__title'}>
                    {h2Title && <SecondTitle title={h2Title}/>}
                  </div>
                </div>
                <div className={'nav-button'}>
                  {imgGroup?.length > 4 && <div className={`prev nav-buttons__prev_${id}`}><span></span></div>}
                  {imgGroup?.length > 4 && <div className={`next nav-buttons__next_${id}`}><span></span></div>}
                </div>
              </div>
              <div className={'certificatesSlider__wrapper defaultSlider__wrapper'}>
                {imgGroup?.length
                  ? <Swiper
                      spaceBetween={24}
                      navigation={{
                      prevEl: `.nav-buttons__prev_${id}`,
                      nextEl: `.nav-buttons__next_${id}`
                    }}
                      pagination={{
                      el: `.nav__pagination_${id}`,
                      clickable: true
                    }}
                      breakpoints={{
                      0: {
                      slidesPerView: 1
                    },
                      640: {
                      slidesPerView:2
                    },
                      887: {
                      slidesPerView: 3
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
                    {imgGroup?.map(({id, title, img: {data}}: any) =>
                      <SwiperSlide key={id}>
                        <div className={'certificatesSlider__slide defaultSlider__slide'}>
                          <div className={'photoItem'}>
                            {data && <Image className={'photoItem__img'} width={data.attributes.width} height={data.attributes.height}
                              src={SUBSERVER + data.attributes.url}
                              alt={data.attributes.alternativeText ? data.attributes.alternativeText : data.attributes.name || 'image'}/>}
                          </div>
                          <div className={'description'}>{title}</div>
                        </div>
                      </SwiperSlide>)
                    }
                  </Swiper>
                  : <></>
                }
              <div className={`nav__pagination nav__pagination_${id}`}></div>
              </div>
            </div>
          )}
        </Container>
      </div>
    </Section>
  );
};

Index.defaultProps = {};

export default Index;
