import React, {useEffect, useState} from 'react';
import Container from '@/components/Container';
import {Logo} from '@/components/Logo';
import {Button} from '@/components/ui/buttons/Button';
import img1 from '../assets/images/pay1.png'
import img2 from '../assets/images/pay2.png'
import img3 from '../assets/images/pay3.png'
import img4 from '../assets/images/pay4.png'
import Image from 'next/image';
import Link from 'next/link';
import {useMediaQuery} from 'react-responsive';
import {getMenuFunction} from '@/common/get-menu.function';
import {fillMenuChildrenItems} from '@/common/fill-menu-children-items.function';
import {navLink} from '@/components/BottomNavMobile';
import {openBitrixPopup} from '@/common/open-close-popup.function';
import {PhoneSvg} from "@/components/ui/svg/PhoneSvg";

const variablePay = {
  1: img1,
  2: img2,
  3: img3,
  4: img4,
}

const recursiveMenu = (menu: any[], i= 1, prefix = '') => menu.map((el) =>
    <div key={el.id} className={`menuFooter__list`}>
      <div className={`menuFooter__item ${!el.items.length ? 'empty' : ''}`}>
        <Link className={'menuFooter__link'} href={prefix + el.path}>{el.title}</Link>
        {el.items.length && i > 0 ? <div className={'menuFooter__box'}>{recursiveMenu(el.items, i-1, prefix +  el.path)}</div> : <></>}
      </div>
    </div>
  )

export const Footer = ({layoutData, pages, catalog, popupData, setPopupData}: any) => {
  const isMobile = useMediaQuery({maxWidth: 887});
  const [payCards, setPayCards] = useState(<></>)

  const menuCatalog = getMenuFunction(catalog, fillMenuChildrenItems)

  const menuPages = getMenuFunction(pages, fillMenuChildrenItems);

  const filterMenuPages = menuPages.filter(({sorting}: any) => sorting !== 1)

  useEffect(() => {
    setPayCards(!isMobile ? <></> : <div className={'payCards'}>
      {Object.entries(variablePay).map(([key, image]) => <div key={key} className={'payCards__card'}>
        <Image className={'payCards__img'} src={image} alt={key} width={60} height={30}/>
      </div>)}
    </div>)
  }, [isMobile])

  return (
    <footer className={'footer'}>
      <Container>
        <div className={'topPart'}>
          <div className={'topPart__left'}>
            <Link className={'topPart__logo'} href={'/'} onClick={() => {
              for (const [, content] of Object.entries(navLink)) {
                content.active = false
              }
            }}><Logo /></Link>
            <div className={'topPart__description textSmall'}>
              Поставки нерудных материалов по Москве и Московской области.
              <span className={'textMedium'}>Более 8 лет на рынке! </span>
            </div>
          </div>
          <div className={'topPart__right'}>
            <div className={'payCards'}>
              {Object.entries(variablePay).map(([key, image]) => <div key={key} className={'payCards__card'}>
                <Image className={'payCards__img'} src={image} alt={key} width={60} height={30}/>
              </div>)}
            </div>
            <div className={'buttons'}>
              <Button
                onClick={() => openBitrixPopup(layoutData?.data?.attributes?.Footer?.buttonLink.link, setPopupData)}
                svg={<PhoneSvg/>}
                disabled={false}
                sending={false}
                modifier={''}
                color={''}
                colorSvg={''}>Заказать звонок</Button>
            </div>
          </div>
        </div>
        <div className={'bottomPart'}>
          <div className={'menu'}>
            <div className={'menu__category'}>
              {recursiveMenu(menuCatalog.sort((a: { sorting: number; }, b: { sorting: number; }) => a.sorting - b.sorting), 1)}
            </div>
            <div className={'menu__pages'}>
              {recursiveMenu(filterMenuPages.sort((a: { sorting: number; }, b: { sorting: number; }) => a.sorting - b.sorting))}
            </div>
          </div>
          <div className={'contacts'}>
            <div className={'contacts__item textH6'}>Связаться с нами</div>
            <a className={'contacts__phone textH4 textH4_bold'} href={`tel:${layoutData?.data?.attributes?.Footer?.Phone}`}>{layoutData?.data?.attributes?.Footer?.Phone}</a>
            <div className={'contacts__item textH6'}>E-mail: <a className={'textH6_bold'} href={`mailto:${layoutData?.data?.attributes?.Footer?.email}`}>{layoutData?.data?.attributes?.Footer?.email}</a></div>
            <div className={'contacts__item textH6'}>Отгрузка материала: <span className={'textH6_bold'}>{layoutData?.data?.attributes?.Footer?.openingHours}</span></div>
            <div className={'contacts__item textH6'}>Время работы офиса: <span className={'textH6_medium'}>{layoutData?.data?.attributes?.Footer?.officeHours}</span></div>
          </div>
        </div>
        <div className={'copyright textSmall'}>
          {payCards}
          <div className={'copyright__item'}>{layoutData?.data?.attributes?.Footer?.Copyright}</div>
          {layoutData?.data?.attributes?.Footer.TextLink.map(({id, link, text}: {id: number, link: string, text: string}) => <Link key={id} href={link ? link : '#'} className={'copyright__item'}>{text}</Link>)}
          <div className={'copyright__item'}>{layoutData?.data?.attributes?.Footer?.CreateText}&nbsp;<a href={`https://${layoutData?.data?.attributes?.Footer?.CreateTextLink}`} target={'_blank'} rel='noreferrer'>{layoutData?.data?.attributes?.Footer?.CreateTextLink}</a></div>
        </div>
      </Container>
    </footer>
  );
};

