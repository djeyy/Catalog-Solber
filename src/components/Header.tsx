import React, {useEffect, useState} from 'react';
import Container from "@/components/Container";
import DownloadLink from "@/components/ui/DownloadLink";
import ButtonTransparent from "@/components/ui/buttons/ButtonTransparent";
import {Logo} from "@/components/Logo";
import Link from "next/link";
import {MenuDesktop} from "@/components/MenuDesktop";
import {InputSearch} from "@/components/ui/inputs/InputSearch";
import {makeProductLink, recursiveCatalogLinks} from "@/common/make-product-link.function";
import {getFetch} from "@/common/get-common-server";
import {SearchSvg} from "@/components/ui/svg/SearchSvg";
import {navLink} from "@/components/BottomNavMobile";
import {openBitrixPopup} from "@/common/open-close-popup.function";
import {PhoneSvg} from "@/components/ui/svg/PhoneSvg";


type Props = {
  layoutData: any;
  pages: any;
  catalog: any;
  popupData: any;
  setPopupData: any;
  active: boolean;
  setActive: React.Dispatch<boolean>
}


const searchProducts = async (input: string) => {
  const response = await getFetch(`/api/products?filters[title][$containsi]=${input}&populate=slug,category`)
  const {data} = await response.json();
  return data;
}

const searchCache: {
  [searchInput: string]: {
    dateTime: number;
    results: any[];
  }
} = {}

export const openMenu = (active: boolean, setActive: React.Dispatch<boolean>, setSearchInput: React.Dispatch<string>) => {
  active
    ? window.document.querySelector('body')?.classList.remove('off')
    : window.document.querySelector('body')?.classList.add('off')
  setSearchInput('');
  setActive(!active);
}

export default function header({layoutData, pages, catalog, popupData, setPopupData, active, setActive}: Props) {
  const [searchBtn, setSearchBtn] = useState(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState([]);

  const onLink = () => {
    // @ts-ignore
    document.querySelector('body').classList.toggle('off')
    setSearchInput('')
    setSearchResults([])
  }

  useEffect(() => {
    if (!searchInput) {
      window.document.querySelector('body')?.classList.remove('off')
      setSearchResults([])
      return;
    }

    window.document.querySelector('body')?.classList.add('off')

    // @ts-ignore
    const foundCategories = catalog.filter((el: any) => el?.attributes?.title.toLowerCase().includes(searchInput?.toLowerCase()));

    const result = foundCategories.map((el: any) => ({...el, isCategory: true}));

    if (searchCache[searchInput]) {
      result.unshift(...searchCache[searchInput].results)
      setSearchResults(result);
      return;
    }

    searchProducts(searchInput).then((data: any[]) => {
      result.unshift(...data)
      searchCache[searchInput] = {
        dateTime: +(new Date()),
        results: data
      }

      setSearchResults(result);
    }).catch(console.log)

  }, [searchInput]);

  return (
    <header className={'header'}>
      <Container>
        <div className={'header__wrapper'}>
          <div className={'header__logoBox'}>
            <Link href={'/'} className={'header__logo'} onClick={() => {
              for (const [, content] of Object.entries(navLink)) {
                content.active = false
              }
            }}>
              <Logo />
            </Link>
            <div className={'header__description'}>
              Поставки нерудных материалов по Москве и Московской области.
              <span>Работаем с 2014 года!</span>
            </div>
          </div>
          {layoutData?.data?.attributes?.Header?.buttonDownload.map((item: any) => <DownloadLink
            key={item.id}
            style={{marginLeft: '54px'}}
            file={item}
            svg={item}
            text={item.text}
          />)}
          <div className={'header__box'}>
            <div className={'header__contacts'}>
              <div className={'header__phone'}>
                <Link href={`tel:${layoutData?.data?.attributes?.Header?.phone.replace(/\s/g, '')}`}>{layoutData?.data?.attributes?.Header?.phone}</Link>
              </div>
              <div className={'header__mail'}>
                <Link href={`mailto:${layoutData?.data?.attributes?.Header?.email}`}>{layoutData?.data?.attributes?.Header?.email}</Link>
              </div>
            </div>
            <div className={'header__btn'}>
              <ButtonTransparent
                onClick={() => openBitrixPopup(layoutData?.data?.attributes?.Header?.buttonLink[0].link, setPopupData)}
                svg={<PhoneSvg/>}
                text={layoutData?.data?.attributes?.Header?.buttonLink[0]?.text}
                colorButton={''}
               />
            </div>
          </div>
          <div className={'buttons'}>
            <div onClick={() => {
              setSearchBtn(!searchBtn);setSearchInput('')
              !searchBtn && openMenu(!searchBtn , setActive, setSearchInput)}
            }
                 className={`buttons__search ${searchBtn ? 'active' : ''}`}
            ><SearchSvg/></div>
            <a href={`tel:${layoutData?.data?.attributes?.Header?.phone}`} className={'buttons__phone'}>
              <PhoneSvg/>
            </a>
            <div onClick={() => {
              openMenu(active, setActive, setSearchInput);
              setSearchBtn(false)
            }} className={'buttons__burger'}>
              <div className={'buttons__btn'}></div>
            </div>
          </div>
        </div>
      </Container>
      <div className={`search ${searchBtn ? 'active' : ''}`}>
        <Container>
          <div className={`search__input`}>
            <InputSearch autoFocus value={searchInput} onInput={setSearchInput}  placeholder={'Поиск по сайту...'}/>
          </div>
        </Container>
      </div>
      {searchResults?.length
        ? <div className={`searchRes active`}>
          <Container>
            <div className={'searchRes__title textH1'}>{`Результаты поиска: «${searchInput}»`}</div>
            <div className={'searchRes__list'}>
              {searchResults.map((el: any, index) =>
                el?.isCategory
                  ? <Link href={recursiveCatalogLinks(el, catalog)} onClick={onLink} key={index} className={'searchRes__item textH6'}>
                    <p>{el?.attributes?.title}</p>
                    <p >{recursiveCatalogLinks(el, catalog)}</p>
                  </Link>
                  : el?.attributes?.category?.data && <Link href={makeProductLink(el, catalog)} key={index} onClick={onLink} className={'searchRes__item textH6'}>
                    <p>{el?.attributes?.title}</p>
                    <p >{makeProductLink(el, catalog)}</p>
                </Link>
              )}
            </div>
          </Container>
        </div>
        : <></>
      }
      <MenuDesktop
        openMenu={openMenu}
        setPopupData={setPopupData}
        layoutData={layoutData}
        pages={pages}
        catalog={catalog}
        active={active}
        setActive={setActive}
        searchInput={searchInput}
        searchProducts={searchProducts}
        setSearchInput={setSearchInput}
        searchResults={searchResults}
        setSearchResults={setSearchResults}/>
    </header>
  );
}
