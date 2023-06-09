import React, {useEffect, useState} from 'react';
import Section from "@/components/sections/section/Section";
import {SUBSERVER} from "@/common/sub-server.constant";
import Image from "next/image";
import {useMediaQuery} from "react-responsive";
import Container from "@/components/Container";
import {ThirdTitle} from "@/components/titles/ThirdTitle";
import {SecondTitle} from "@/components/titles/SecondTitle";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper";

type Props = {
  theme: string;
  hTitle: {
    h2Title: string;
    h3Title: string;
  },
  imgLogo: any
}

const Index = ({theme, hTitle: {h2Title, h3Title}, imgLogo}: Props) => {
  const isMobile = useMediaQuery({maxWidth: 887});
  const [responsive, setResponsive] = useState()

  useEffect(() => {
    setResponsive(isMobile
      ? <div className={'sliderPartners'}>
        <Swiper
          slidesPerView={1}
          pagination={{
            el: `.sliderPartners__pagination`,
            clickable: true
          }}
          modules={[Pagination]}
          className={'sliderPartners'}
        >
          {imgLogo.length && imgLogo.map(({id, img: {data: {attributes: {name, url, alternativeText, width, height}}}}: any) =>  <SwiperSlide key={-id}>
            <div className={'sliderPartners__slide'}>
              <Image src={SUBSERVER + url} className={'sliderPartners__img'} width={width} height={height} alt={alternativeText ? alternativeText : name}/>
            </div>
          </SwiperSlide>)}
        </Swiper>
        <div className={'sliderPartners__pagination'}>
        </div>
      </div>
      : imgLogo && imgLogo.map(({id, img: {data}}: any) => <div key={id} className={'partnersSection__item'}>
        {data && <Image className={'partnersSection__img'} src={SUBSERVER + data.attributes.url} width={data.attributes.width}
                height={data.attributes.height}
                alt={data.attributes.alternativeText ? data.attributes.alternativeText : data.attributes.name || 'image'}/>}
      </div>)
    )
  }, [isMobile, imgLogo])

  return (
    <Section colorBack={theme}>
      <Container>
        {h3Title && <ThirdTitle nameSection={h3Title}/>}
        {h2Title && <SecondTitle title={h2Title}/>}
        <div className={`partnersSection ${theme}`}>
          {responsive}
        </div>
      </Container>
    </Section>
  );
};

Index.defaultProps = {};

export default Index;