import React, {useEffect, useState} from 'react';
import Container from "@/components/Container";
import {useMediaQuery} from "react-responsive";
import {TextH6} from "@/components/ui/typographuck/TextH6";
import ButtonTransparent from "@/components/ui/buttons/ButtonTransparent";
import {ThirdTitle} from "@/components/titles/ThirdTitle";
import {SecondTitle} from "@/components/titles/SecondTitle";
import {makeProductLink} from "@/common/make-product-link.function";
import {openBitrixPopup, openPopUp} from "@/common/open-close-popup.function";

type Props = {
  tableProductsRelated: {
    hTitle?: {
      h2Title?: string
      h3Title?: string
    };
    products: any;
    id: number;
  }[];
  setPopupData: any;
  catalog: any;
  popup: any;
  setPopup: any;
  type: any;
  setType: any;
}

export const TableProducts = ({tableProductsRelated, catalog, setPopupData, popup, setPopup, type, setType}: Props) => {
  const isMobile = useMediaQuery({maxWidth: 887});
  const [mobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    setMobile(isMobile)
  }, [isMobile])

  return (
    <div className={'tableProducts'}>
      <Container>
        {tableProductsRelated.map((el) =>
          <div key={el?.id} className={'tableProducts__content'}>
            {el?.hTitle?.h3Title && <ThirdTitle nameSection={el?.hTitle?.h3Title}/>}
            {el?.hTitle?.h2Title && <SecondTitle title={el?.hTitle?.h2Title}/>}
            <div className={'tableProducts__box'}>
              {!mobile && <div className={'tableProducts__titles'}>
                  <div className={'tableProducts__title'}>
                      <TextH6 fontWeight={'medium'}>Наименование</TextH6>
                  </div>
                  <div className={'tableProducts__title'}>
                      <TextH6 fontWeight={'medium'}>Цена с доставкой</TextH6>
                  </div>
              </div>}
              {el?.products?.data.length && el?.products?.data.map((item: any) =>
                <div key={item?.id} className={'itemPrice'}>
                  <div onClick={() => mobile ? item.link ? openBitrixPopup(item.link, setPopupData) : console.log('notLink') : <></>} className={'itemPrice__name'}>
                    <a className={'textH6'} href={`/${makeProductLink(item, catalog)}`}>{item?.attributes?.title}</a>
                  </div>
                  <div className={'itemPrice__priceBox'}>
                    <div className={'itemPrice__price'}>
                      <TextH6 fontWeight={''}>{item?.attributes?.price?.price ? `от ${item?.attributes?.price?.price} ${item?.attributes?.price?.priceMeasure || ''}` : 'Цена по запросу'}</TextH6>
                    </div>
                    {!mobile && <div className={'itemPrice__button'}>
                        <ButtonTransparent
                            onClick={() => {
                              setPopup(openPopUp)
                              setType('orderPopup')
                              localStorage.setItem('product', item?.attributes?.title ? item?.attributes?.title : 'Неизвестный материал')
                              localStorage.setItem('productType', item?.attributes?.price?.priceMeasure ? item?.attributes?.price?.priceMeasure.split('/')[1] : 'м³')
                            }}
                            svg={null}
                            text={'Заказать'}
                            colorButton={''}
                            props={null}/>
                    </div>}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};