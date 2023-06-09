import React from 'react';
import Section from "@/components/sections/section/Section";
import Container from "@/components/Container";
import {ThirdTitle} from "@/components/titles/ThirdTitle";
import {SecondTitle} from "@/components/titles/SecondTitle";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";
import Image from "next/image";
import {SUBSERVER} from "@/common/sub-server.constant";
import {formPrice} from "@/common/form-price";
import Link from "next/link";
import {makeProductLink} from "@/common/make-product-link.function";
import {Button} from "@/components/ui/buttons/Button";

type Props = {
  theme: string;
  hTitle: {
    h2Title: string | null;
    h3Title: string | null;
  },
  products: any;
  catalog: any[];
}

const Index = ({theme,
                 hTitle,
                 products, catalog}: Props) => {
  return (
    <Section colorBack={theme}>
      <div className={'relatedProduct'}>
        <Container>
          <div className={'relatedProductSlider'}>
            <div className={'relatedProductSlider-header'}>
              <div className={'relatedProductSlider-header__titles'}>
                <div className={'relatedProductSlider-header__titleName'}>
                  {hTitle?.h3Title && <ThirdTitle nameSection={hTitle?.h3Title}/>}
                </div>
                <div className={'relatedProductSlider-header__title'}>
                  {hTitle?.h2Title && <SecondTitle title={hTitle?.h2Title}/>}
                </div>
              </div>
              <div className={'nav-button'}>
                <div className={`prev relatedProductSlider__prev`}><span></span></div>
                <div className={`next relatedProductSlider__next`}><span></span></div>
              </div>
            </div>
            <div className={'relatedProductSlider__wrapper'}>
              <Swiper
                spaceBetween={24}
                navigation={{
                  prevEl: '.relatedProductSlider__prev',
                  nextEl: '.relatedProductSlider__next'
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
                {products.data?.length && products.data.map((el: any, index: number) =>
                  <SwiperSlide key={index}>
                    <div className={'relatedProductSlide'}>
                      <div className={'relatedProductSlide__image'}>
                        {el?.attributes?.img?.data?.length &&
                            <Image className={'relatedProductSlide__img'}
                                   width={el?.attributes?.img?.data[0].attributes?.width}
                                   height={el?.attributes?.img?.data[0].attributes?.height}
                                   src={SUBSERVER + el?.attributes?.img?.data[0].attributes?.url}
                                   alt={el?.attributes?.img?.data[0].attributes?.alternativeText ? el?.attributes?.img?.data[0].attributes?.alternativeText : el?.attributes?.img?.data[0].attributes?.name || 'image'}/>
                        }                </div>
                      <div className={'content'}>
                        <div className={'content__price textH5 textH5_bold'}>{el?.attributes?.price?.price ? `от ${formPrice(Number(el?.attributes?.price?.price))}` : 'Цена по запросу'}{el?.attributes?.price?.price ? <span>{el?.attributes?.price?.priceMeasure}</span> : <></>}</div>
                        <div className={'content__title textH6'}>{el?.attributes?.title}</div>
                        <div className={'content__item textMedium'}>
                          <div className={'content__name'}>Вид</div>
                          <div className={'content__description'}>{el?.attributes?.featureProduct?.view || '-'}</div>
                        </div>
                        <div className={'content__item textMedium'}>
                          <div className={'content__name'}>Модуль крупности</div>
                          <div className={'content__description'}>{el?.attributes?.featureProduct?.fraction || '-'}</div>
                        </div>
                        <div className={'content__item textMedium'}>
                          <div className={'content__name'}>Насыпная плотность</div>
                          <div className={'content__description'}>{el?.attributes?.featureProduct?.bulkDensity || '-'}</div>
                        </div>
                        <div className={'content__button'}>
                          <Link href={makeProductLink(el, catalog)}>
                            <Button svg={null} disabled={false} sending={false} modifier={''} color={''} colorSvg={''}>
                              {'Подробнее'}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>)}
              </Swiper>
              <div className={'nav__pagination'}></div>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
};

Index.defaultProps = {};

export default Index;
