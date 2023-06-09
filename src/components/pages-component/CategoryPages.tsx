import React, {useEffect, useState} from 'react';
import Container from "@/components/Container";
import {RelatedCard} from "@/components/RelatedCard";
import {ProductItem} from "@/components/pages-component/Product";
import {declensionOfNumeralsFunction} from "@/common/declension-of-numerals.function";
import ButtonTransparent from "@/components/ui/buttons/ButtonTransparent";
import {CustomSelect} from "@/components/ui/MySelect";
import {fillMenuChildrenItems} from "@/common/fill-menu-children-items.function";
import {useRouter} from "next/router";
import {childrenProducts} from "@/common/childrent-products.function";
import {makeProductLink} from "@/common/make-product-link.function";


type Props = {
  isProduct: boolean;
  products: any;
  pageData: any;
  pages: any;
  catalog: any;
  popupData: any;
  setPopupData: React.Dispatch<any>
  popup: any;
  setPopup: any;
  type: any;
  setType: any;
}

export const optionVolume = [
  {value: 'Сначала дешевле', label: 'Сначала дешевле', dataset: 'ASC', selected: true},
  {value: 'Сначала дороже', label: 'Сначала дороже', dataset: 'DESC', selected: false}
];

export const CategoryPages = (
  {
    isProduct,
    products,
    pageData,
    pages,
    catalog,
    popupData,
    setPopupData,
    popup,
    setPopup,
    type,
    setType
  }: Props) => {

  const router = useRouter();
  const isMobile = false;//useMediaQuery({maxWidth: 887});
  const [more, setMore] = useState(12)

  const [buttonActive, setButtonActive] = useState(-1)
  const handleItemClick = (index: number) => {
    if (index === buttonActive) {
      setButtonActive(-1)
      return
    }
    setButtonActive(index);
  };

  const [priceFilter, setPriceFilter] = useState({value: 'Сначала дешевле', label: 'Сначала дешевле', dataset: 'ASC', selected: true})

  const [categoryFilter, setCategoryFilter] = useState<string>(router?.query?.categoryFilter as string || '');

  const [sorting, setSorting] = useState<'ASC' | 'DESC'>('ASC');
  const sortingFunc = (a: any, b: any) => priceFilter.dataset === 'ASC' ? Number(a?.attributes?.price?.price) - Number(b?.attributes?.price?.price) : Number(b?.attributes?.price?.price) - Number(a?.attributes?.price?.price)

  const [productsList, setProductsList] = useState<any[]>(products);

  const findRootCatalog = catalog.filter((el: any) => !el?.attributes?.parent?.data?.id);

  const menu: any[] = fillMenuChildrenItems(catalog, findRootCatalog);

  useEffect(() => {
    const categoriesId = childrenProducts(catalog, router?.query?.categoryFilter || pageData?.attributes?.slug);
    setProductsList(products.filter((el: any) => categoriesId.includes(el?.attributes?.category?.data.id)))
  }, [products]);

  useEffect((...args) => {
    if (!categoryFilter && router.query?.categoryFilter) {
      // @ts-ignore
      router.push(`/${router?.query?.slug?.join('/')}`);
      setProductsList(products)
      return;
    }

    if(categoryFilter) {
      if(categoryFilter !== router.query?.categoryFilter) {
        // @ts-ignore
        router.push(`#${router?.query?.slug?.join('/')}?categoryFilter=${categoryFilter}`);
      }

      const categoriesId = childrenProducts(catalog, categoryFilter || pageData?.attributes?.slug);

      setProductsList(products.filter((el: any) => categoriesId.includes(el?.attributes?.category?.data.id)))
    }
  }, [categoryFilter, sorting])

  return (
    <div className={'catalogPage'}>
      <Container>
        {isProduct
          ? <ProductItem
            products={pageData}
            popupData={popupData}
            catalog={catalog}
            setPopupData={setPopupData}
            popup={popup}
            setPopup={setPopup}
            type={type}
            setType={setType}
          />
          : <>
            {pageData?.attributes?.contentSeoText && <div className={'catalogPage__description textH5'}
                                                          dangerouslySetInnerHTML={{__html: pageData?.attributes?.contentSeoText}}/>}
            {pageData?.attributes?.seoText &&
              <div className={'catalogPage__description'}>{pageData?.attributes?.seoText}</div>}

            {pageData?.attributes?.title && <div className={'catalogPage__titles'}>
              <div className={'catalogPage__title textH2'}>{`${pageData?.attributes?.title}`}</div>
              <div
                className={'catalogPage__subTitle textH4'}>{`${productsList.length} ${declensionOfNumeralsFunction(productsList.length, ['товар', 'товара', 'товаров'])}`}</div>
            </div>}
            <div className={'buttonsFilter'}>
              {catalog.filter((el: any) => el?.attributes?.parent?.data?.id === pageData.id).map((el: any, index: number) =>
                <div className={`buttonsFilter__btn textH6 ${index === buttonActive ? 'active' : ''}`} key={el.id} onClick={() => {
                  if (index === buttonActive) {
                    setButtonActive(-1)
                  }
                  handleItemClick(index)
                  setCategoryFilter(router?.query?.categoryFilter === el.attributes.slug ? '' : el.attributes.slug);
                }}>{el.attributes.title}<span></span></div>
              )}
            </div>
            <div className={'catalogPage__select'}>
              <CustomSelect
                placeholder={optionVolume[0].label}
                noOptionsMessage={"Нет вариантов"}
                isClearable={false}
                isSearchable={false}
                options={optionVolume}
                value={priceFilter}
                setValue={setPriceFilter}
              />
            </div>
            <div className={'catalogPage__content'}>
              <div className={'listCard'}>
                {productsList.sort(sortingFunc).slice(0, more).map((product: any, index: number) => <div key={index}
                                                                                       className={'listCard__item'}>
                  <RelatedCard product={product} link={makeProductLink(product, catalog)}/>
                </div>)}
              </div>
              {productsList.length && productsList.length > more ? <div className={'catalogPage__button'}>
                <ButtonTransparent onClick={() => setMore(more + (isMobile ? 4 : 12))} svg={null} text={'Показать ещё'}
                                   colorButton={''}/>
              </div> : <></>}
            </div>
          </>
        }

      </Container>
    </div>
  );
};
