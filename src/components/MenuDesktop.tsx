import React, {useEffect, useState} from 'react';
import Container from '@/components/Container';
import Link from "next/link";
import {fillMenuChildrenItems} from "@/common/fill-menu-children-items.function";
import {SearchSvg} from "@/components/ui/svg/SearchSvg";
import {InputSearch} from "@/components/ui/inputs/InputSearch";
import {CloseSvg} from "@/components/ui/svg/CloseSvg";
import {makeProductLink, recursiveCatalogLinks} from "@/common/make-product-link.function";
import {useMediaQuery} from "react-responsive";
import DownloadLink from "@/components/ui/DownloadLink";
import ButtonTransparent from "@/components/ui/buttons/ButtonTransparent";
import {navLink} from "@/components/BottomNavMobile";
import {closePopUp, openBitrixPopup} from "@/common/open-close-popup.function";
import {PhoneSvg} from "@/components/ui/svg/PhoneSvg";

type MenuItem = {
  id: number;
  path: string;
  title: string;
  items: MenuItem[]
}

type Props = {
  pages: any;
  catalog: any;
  active: boolean;
  setActive: any;
  searchInput: string;
  setSearchInput: any;
  searchProducts: any;
  layoutData: any;
  setPopupData: any;
  openMenu: any;
  searchResults: any;
  setSearchResults: any
}

const searchCache: {
  [searchInput: string]: {
    dateTime: number;
    results: any[];
  }
} = {}

export const MenuDesktop = ({
                              openMenu,
                              pages,
                              catalog,
                              active,
                              setActive,
                              searchInput,
                              setSearchInput,
                              searchProducts,
                              layoutData,
                              setPopupData,
                              searchResults,
                              setSearchResults}: Props) => {
  const isMobile = useMediaQuery({maxWidth: 887});
  const [mobile, setMobile] = useState<boolean>(false);
  const [searchBtn, setSearchBtn] = useState<boolean>(false);
  const [open, setOpen] = useState<any>(null);

  const openSubMenu = (el: any) => {
    if(open === el) {
      setOpen(null)
      return
    }
    setOpen(el)
  }

  useEffect(() => {
    setMobile(isMobile)
  }, [isMobile])

  const recursiveMenu = (menu: any[], path = '') => menu.map((el) =>
    <div key={el?.id} className={`menuDesktop__list`}>
      <div className={`menuDesktop__item ${!el?.items?.length ? 'empty' : ''}`}>
        {(el?.title.trim() === 'Щебень' && mobile) || (el?.title.trim() === 'Песок' && mobile) || (el?.title.trim() === 'О компании' && mobile)
          ? <div className={`menuDesktop__link textH5_medium notLink ${open === el?.title.trim()? 'open' : ''}`} onClick={() => openSubMenu(el?.title.trim())}>{el?.title}</div>
          : <Link onClick={() => {
            mobile && openMenu(active, setActive, setSearchInput);

            for (const [, content] of Object.entries(navLink)) {
              content.active = false
            }
          }}
                  className={'menuDesktop__link textH5_medium'}
                  href={path + el?.path}>{el?.title}</Link>
        }
        {el?.items?.length ?
          <div className={`menuDesktop__box ${open === el?.title.trim()? 'open' : ''}`}>{recursiveMenu(el?.items, path + el?.path)}</div> : <></>}
      </div>
    </div>
  )

  const onLink = () => {
    setSearchInput('')
    setSearchResults([])
    setSearchBtn(!searchBtn)
  }

  if (!catalog || !pages) {
    return (<></>)
  }

  const menu = [];

  const findRootCatalog = catalog.filter((el: any) => !el?.attributes?.parent?.data?.id);

  const menu1: any[] = fillMenuChildrenItems(catalog, findRootCatalog);

  const findRootPages = pages.filter((el: any) => !el?.attributes?.parent?.data?.id);

  const menu2: any[] = fillMenuChildrenItems(pages, findRootPages);

  const filterMenu = menu2.filter(({sorting}: any) => sorting !== 1)

  menu.push(...menu1, ...filterMenu);

  return (
    <nav className={`menuDesktop ${active ? 'active' : ''}`}>
      <div className={'menuDesktop__navList'}>
        <Container>
          <div className={'menuDesktop__wrapper'}>
            {recursiveMenu(menu.sort((a, b) => a.sorting - b.sorting))}
            <div onClick={onLink} className={'search__btn'}>{searchBtn ? <CloseSvg/> :
              <SearchSvg/>}</div>
            <div onClick={() => isMobile && setActive(closePopUp)} className={'contacts'}>
              <div className={'contacts__item'}>
                <a href={`tel: ${layoutData?.data?.attributes?.Header?.phone}`} className={'contacts__phone'}>{layoutData?.data?.attributes?.Header?.phone}</a>
              </div>
              <div className={'contacts__item'}>
                <a href={`mailto: ${layoutData?.data?.attributes?.Header?.email}`} className={'contacts__email'}>{layoutData?.data?.attributes?.Header?.email}</a>
              </div>
              {layoutData?.data?.attributes?.Header?.buttonDownload.map((item: any) => <div key={item.id} className={'contacts__item'}>
                <DownloadLink
                  file={item}
                  svg={item}
                  text={item.text}
                />
              </div>)}
              <ButtonTransparent onClick={() => openBitrixPopup(layoutData?.data?.attributes?.Header?.buttonLink[0].link, setPopupData)} svg={<PhoneSvg/>} text={'Обратный звонок'} colorButton={''}/>
            </div>
          </div>
        </Container>
      </div>
      <div className={`search__input ${searchBtn ? 'active' : ''}`}>
        <Container>
          <InputSearch autoFocus value={searchInput} onInput={setSearchInput}  placeholder={'Поиск по сайту...'}/>
        </Container>
      </div>
      {searchResults?.length
        ? <div className={`searchRes ${searchBtn && searchResults?.length ? 'active' : ''}`}>
          <Container>
            <div className={'searchRes__title textH1'}>{`Результаты поиска: «${searchInput}»`}</div>
            <div className={'searchRes__list'}>
              {searchResults.map((el: any, index: number) =>
                el?.isCategory
                  ? <Link href={recursiveCatalogLinks(el, catalog)} onClick={() => onLink()} key={index} className={'searchRes__item textH6'}>
                    <p>{el?.attributes?.title}</p>
                    <p >{recursiveCatalogLinks(el, catalog)}</p>
                  </Link>
                  : el?.attributes?.category?.data && <Link href={makeProductLink(el, catalog)} key={index} onClick={() => onLink()} className={'searchRes__item textH6'}>
                    <p>{el?.attributes?.title}</p>
                    <p >{makeProductLink(el, catalog)}</p>
                  </Link>
              )}
            </div>
          </Container>
        </div>
        : <></>
      }
    </nav>
  )
};



