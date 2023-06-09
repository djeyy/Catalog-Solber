import HeaderDesktop from '@/components/Header';
import {Footer} from "@/components/Footer";
import {BottomNavMobile} from "@/components/BottomNavMobile";
import {Popup} from "@/components/popups/Popup";
import React, {useEffect, useState} from "react";
import Container from "@/components/Container";
import {SUBSERVER} from "@/common/sub-server.constant";
import {CallBackForm, CallMeBackForm, ConsultationForm, SendRequestForm} from "@/common/form-components";
import {ButtonClose} from "@/components/ui/buttons/ButtonClose";
import {closePopUp, openBitrixPopup} from "@/common/open-close-popup.function";
import {initializeTagManager} from "@/common/gtm";
import Head from "next/head";
import {CalculateTheCostPopup} from "@/components/popups/CalculateTheCostPopup";
import {ConsultationPopup} from "@/components/popups/ConsultationPopup";
import {OrderPopup} from "@/components/popups/OrderPopup";

export type FormTypes = 'CallMeBackForm' | 'SendRequestForm' | 'CallBackForm' | 'ConsultationForm';

const formItems = {
  'CallMeBackForm': (value: string) => <CallMeBackForm showForm={value} />,
  'SendRequestForm': (value: string) => <SendRequestForm showForm={value} />,
  'CallBackForm': (value: string) => <CallBackForm showForm={value} />,
  'ConsultationForm': (value: string) => <ConsultationForm showForm={value} />,
}

type LayoutProps = {
  layoutData: any;
  pages: any[];
  catalog: any[];
  children: any;
  setPopupData?: any;
  popupData?: any;
  pageData?: any;
  popup: any;
  setPopup: any;
  type: any
  setType: any
}


export const Layout = ({layoutData, pageData, pages, catalog, children, setPopupData, popupData, popup, setPopup, type, setType}: LayoutProps) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    initializeTagManager();
  }, []);

  const typePopup: { [state: string]: any } = {
    'calculateTheCost': (<Popup setPopup={setPopup} popup={popup} title={'Рассчитать стоимость'} content={<CalculateTheCostPopup pageData={pageData} setPopup={setPopup}/>}/>),
    'orderPopup': (<Popup setPopup={setPopup} popup={popup} title={'Отправить заявку'} content={<OrderPopup setPopup={setPopup}/>}/>),
    'consultation': (<Popup setPopup={setPopup} popup={popup} title={'Отправить заявку'} content={<ConsultationPopup setPopup={setPopup}/>}/>)
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={pageData?.attributes?.seo?.canonicalURL} />
        <title>{pageData?.attributes?.seo?.metaTitle}</title>
        <meta name="viewport" content={pageData?.attributes?.seo?.metaViewport}/>
        <meta name="keywords" content={pageData?.attributes?.seo?.keywords} />
        <meta name="description" content={pageData?.attributes?.seo?.metaDescription}/>
        <meta name="robots" content={pageData?.attributes?.seo?.metaRobots}/>
        <meta property="og:locale" content="ru_RU" />
        {/*<script type="application/ld+json">{pageData?.attributes?.seo?.structuredData}</script>*/}
        <link rel="image src" href={SUBSERVER + pageData?.attributes?.seo?.metaImage?.data?.attributes?.url} />

      </Head>

      <noscript><div><img src="https://mc.yandex.ru/watch/74342080" style={{position:'absolute', left: '-9999px'}} alt="" /></div></noscript>
      <div style={{display: 'none'}} itemScope itemType="http://schema.org/Organization">
        <span itemProp="name">ООО «НТК Солбер»</span>
        Контакты:
        <div itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
          Адрес:
          <span itemProp="streetAddress">Профсоюзная, 56</span>
          <span itemProp="postalCode"> 117393</span>
          <span itemProp="addressLocality">Москва</span>,
        </div>
        Телефон:<span itemProp="telephone">8 800 500–32–44</span>,
        Электронная почта: <span itemProp="email">zakaz@solber.ru</span>
      </div>
      <div className={' wrapper'}>
        <div className={`popup-images ${popupData?.active && 'active'}`}>
          <Container>
            <div onClick={() => setPopupData({...popupData, active: closePopUp()})} className={`popup-images__closeWrapper ${popupData?.active && 'active'}`}></div>
            <div className={'popup-images__wrapper'}>
              <div onClick={() => setPopupData({...popupData, active: closePopUp()})} className={'popup-images__closeBtn'}><ButtonClose/></div>
              {popupData?.content}
            </div>
          </Container>
        </div>
        <div className={'main__wrapper'}>
          <HeaderDesktop
            layoutData={layoutData}
            pages={pages}
            catalog={catalog}
            popupData={popupData}
            setPopupData={setPopupData}
            active={active}
            setActive={setActive}/>
          <div className="main">
            <div className={`form-popup ${popupData.open && 'active'}`}>
              <span onClick={() => openBitrixPopup(layoutData?.data?.attributes?.Header?.buttonLink[0].link, setPopupData)}></span>
              {popupData?.link && formItems[popupData?.link as FormTypes].call(this, popupData?.link)}
            </div>
            {children}
          </div>
        </div>
        {typePopup[type]}
        <BottomNavMobile setIsActive={setActive}/>
        <Footer layoutData={layoutData} pages={pages} catalog={catalog} popupData={popupData} setPopupData={setPopupData}/>
      </div>
      {/*<Script id={'b24'} data-b24-form="inline/28/ar0fp7" data-skip-moving="true">*/}
      {/*  {`(function(w,d,u){var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);})(window,document,'https://cdn-ru.bitrix24.ru/b16837542/crm/form/loader_28.js');`}*/}
      {/*</Script>*/}
    </>
)};
