import React, {useEffect, useState} from 'react';
import {SecondTitle} from "@/components/titles/SecondTitle";
import {ProductSpecs} from "@/components/ProductSpecs";
import {formPrice} from "@/common/form-price";
import {Button} from "@/components/ui/buttons/Button";
import ButtonTransparent from "@/components/ui/buttons/ButtonTransparent";
import {SupportSvg} from "@/components/ui/svg/SupportSvg";
import {useMediaQuery} from "react-responsive";
import {ProductSlider} from "@/components/ProductSlider";
import {SUBSERVER} from "@/common/sub-server.constant";
import Image from "next/image";
import {Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import {openPopUp} from "@/common/open-close-popup.function";

export const ProductItem = ({products, popupData, setPopupData, popup, setPopup, type, setType}: any) => {

  const isMobile = useMediaQuery({maxWidth: 887});
  const [response, setResponse] = useState(<div className={'product-certificates__images'}>
    {products?.attributes?.docsProducts.map((imageDoc: any, index: number) =>
      <div key={index} className={'product-certificates__imageBox'}>
        <div className={'product-certificates__image'}>
          {imageDoc?.img?.data && <Image className={'product-certificates__img'}
                                         src={SUBSERVER + imageDoc?.img?.data?.attributes?.formats?.small?.url}
                                         width={imageDoc?.img?.data?.attributes?.formats?.small?.width}
                                         height={imageDoc?.img?.data?.attributes?.formats?.small?.height}
                                         alt={imageDoc?.img?.data?.attributes?.formats?.small?.alternativeText ? imageDoc?.img?.data?.attributes?.formats?.small?.alternativeText : imageDoc?.img?.data?.attributes?.formats?.small?.name || 'image'}/>}
        </div>
        <div>{imageDoc?.title}</div>
      </div>
    )}
    {/*<CertificatesSlider slides={products?.attributes?.docsProducts} nameSection={''} title={''} id={3} all={false} active={false}/>*/}
  </div>)
  const [mobNameTitle, setMobNameTitle] = useState(<></>)
  const [nameTitle, setNameTitle] = useState(<></>)

  useEffect(() => {
    setResponse(isMobile
      ? <div className={`certificatesSlider defaultSlider`}>
        <div className={'certificatesSlider__wrapper defaultSlider__wrapper'}>
          <Swiper
            pagination={{
              el: `.nav__pagination_${products?.attributes?.docsProducts?.id}`,
              clickable: true
            }}
            slidesPerView={1}
            modules={[Pagination]}
          >
            {products?.attributes?.docsProducts?.length && products?.attributes?.docsProducts?.map(({id, title, img: {data}}: any, index: number) =>
              <SwiperSlide key={index}>
                <div className={'certificatesSlider__slide defaultSlider__slide'}>
                  <div className={'photoItem'}>
                    {data && <Image className={'photoItem__img'} width={data.attributes.width} height={data.attributes.height}
                                    src={SUBSERVER + data.attributes.url}
                                    alt={data.attributes.alternativeText ? data.attributes.alternativeText : data.attributes.name || 'image'}/>}
                  </div>
                  <div className={'description'}>{title}</div>
                </div>
              </SwiperSlide>)}
          </Swiper>
          <div className={`nav__pagination nav__pagination_${products?.attributes?.docsProducts?.id}`}></div>
        </div>
      </div>
      : <div className={'product-certificates__images'}>
        {products?.attributes?.docsProducts.map((imageDoc: any, index: number) =>
          <div key={index} className={'product-certificates__imageBox'}>
            <div className={'product-certificates__image'}>
              {imageDoc?.img?.data && <Image className={'product-certificates__img'}
                                             src={SUBSERVER + imageDoc?.img?.data?.attributes?.url}
                                             width={imageDoc?.img?.data?.attributes?.width}
                                             height={imageDoc?.img?.data?.attributes?.height}
                                             alt={imageDoc?.img?.data?.attributes?.alternativeText ? imageDoc?.img?.data?.attributes?.alternativeText : imageDoc?.img?.data?.attributes?.name || 'image'}/>}
            </div>
            <div>{imageDoc?.title}</div>
          </div>
        )}
        {/*<CertificatesSlider slides={products?.attributes?.docsProducts} nameSection={''} title={''} id={3} all={false} active={false}/>*/}
      </div>)

    setMobNameTitle(isMobile
      ? <h1 className={'textH5'} style={{color: '#333434'}}>{products?.attributes?.title}</h1>
      : <></>
    )

    setNameTitle(isMobile
      ? <></>
      : <h1 className={'textH2 textH2_medium'} style={{color: '#333434'}}>{products?.attributes?.title}</h1>
    )
  }, [isMobile])

  const productSpec: Record<string, string> = {
    gost: 'ГОСТ',
    view: 'Вид',
    fraction: 'Фракция',
    strengthGrade: 'Марка Прочности',
    bulkDensity: 'Насыпная Плотность',
    group: 'Группа',
    leshchadnost: 'Лещадность',
    frostResistance: 'Морозостойкость',
    sizeModule: 'Модуль крупности',
    class: 'Класс',
    clayContent : 'Содержание глины',
  }

  return(
    <div className={'productPage'}>
      <div className={'productPage__wrapper'}>
        <div className={'productPage__title'}>
          {nameTitle}
        </div>
        <div className={'productPage__content'}>
          <div className={'product'}>
            <div className={'product__top'}>
              <ProductSlider sliders={products?.attributes?.img?.data} popupData={popupData} setPopupData={setPopupData}/>
              <div className={'price mob'}>
                <div className={'price__titles'}>
                  <div className={`price__inStock ${products?.attributes?.price?.inStock && 'green'}`}>
                    <span></span>
                    {products?.attributes?.price?.inStock
                      ? 'В наличии'
                      : 'Нет в наличии'
                    }
                  </div>
                  <div className={'price__text textH3 textH3__medium'}>
                    {products?.attributes?.price?.price ? `от ${formPrice(Number(products?.attributes?.price?.price))}` : 'Цена по запросу'}{products?.attributes?.price?.price ? <span>{products?.attributes?.price?.priceMeasure}</span> : <></>}
                  </div>
                  <div className={'productPage__title'}>
                    <SecondTitle title={products?.attributes?.title}/>
                  </div>
                </div>
                {mobNameTitle}
                <div className={'price__buttons'}>
                  <Button onClick={() => {
                    setPopup(openPopUp)
                    setType('calculateTheCost')
                  }} svg={null} disabled={false} sending={false} modifier={''} color={''} colorSvg={''}>Рассчитать стоимость</Button>
                </div>
              </div>
              <div className={'product-specs'}>
                <div className={'product-specs__title textH5 textH5_bold'}>Основные характеристики</div>
                <div>
                  {Object.entries(products?.attributes?.featureProduct).map(([key, value]: any, index) => (!productSpec[key] || !String(value) || value === null) ? null : <ProductSpecs key={index} title={productSpec[key]} text={value} size={'textH6'}/>)}
                </div>
                <div className={'product-specs__bullets list-bullet'}>
                  {products?.attributes?.bulletIconText.map((el: any, index: number) =>
                    <div key={index} className={'product-specs__bullet'}>
                        <span>
                          {el?.icon.data?.attributes?.url && <Image
                            src={SUBSERVER + el?.icon.data?.attributes?.url}
                            width={el?.icon.data?.attributes?.width}
                            height={el?.icon.data?.attributes?.height}
                            alt={el?.icon.data?.attributes?.alternativeText ? el?.icon.data?.attributes?.alternativeText : el?.icon.data?.attributes?.name || 'image'}/>
                          }
                        </span>
                      {el?.text}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={'product__bottom'}>
              <div className={'product-description'}>
                <div className={'product-description__box'}>
                  <div className={'product-description__title textH5 textH5_medium'}>Описание материала</div>
                  <div className={'product-description__text textH6'} dangerouslySetInnerHTML={{__html: products?.attributes?.materialDescription?.content}} />
                </div>
                <div className={'product-description__box'}>
                  <div className={'product-description__title textH5 textH5_medium'}>Область применения</div>
                  <div className={'product-description__text'} dangerouslySetInnerHTML={{__html: products?.attributes?.materiaScope?.content}} />
                </div>
              </div>
              <div className={'product-certificates'}>
                <div className={'product-certificates__title textH5 textH5_medium'}>Сертификаты и паспорта</div>
                {response}
              </div>
            </div>
          </div>
          <div className={'void'}>
            <div className={'price'}>
              <div className={'price__titles'}>
                <div className={`price__inStock ${products?.attributes?.price?.inStock && 'green'}`}>
                  <span></span>
                  {products?.attributes?.price?.inStock
                    ? 'В наличии'
                    : 'Нет в наличии'
                  }
                </div>
                <div className={'price__text textH3 textH3__medium'}>
                  {products?.attributes?.price?.price
                    ? `от ${products?.attributes?.price?.price} `
                    : 'Цена по запросу'
                  }
                  {products?.attributes?.price?.priceMeasure && products?.attributes?.price?.price
                    ? products?.attributes?.price?.priceMeasure
                    : ''
                  }
                </div>
              </div>
              <div className={'price__buttons'}>
                {products?.attributes?.price?.button && products?.attributes?.price?.button.map((button: any, index: number) =>
                  button?.orangeButton
                    ? <Button key={index} onClick={() => {
                      setPopup(openPopUp)
                      setType('calculateTheCost')
                    }} svg={null} disabled={false} sending={false} modifier={''} color={''} colorSvg={''}>{button?.text}</Button>
                    : <ButtonTransparent key={index} onClick={() => {
                      setPopup(openPopUp)
                      setType('consultation')
                    }} svg={<SupportSvg/>} text={button?.text} colorButton={''}/>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
