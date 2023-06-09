import React, {useState} from 'react';
import {
  getDataByFilter,
  getDataById,
  getCommonServerData
} from "@/common/get-common-server";

import {Layout} from "@/components/Layout";
import BlockManager from "@/shared/blockManager";
import {Breadcrumbs} from "@/components/BreadCrumbs";
import {CategoryPages} from "@/components/pages-component/CategoryPages";
import {findByCategory} from "@/common/childrent-products.function";
import {collectBreadcrumbs} from "@/common/collect-breadcrumbs.function";

type CatalogItemProps = {
  pageData: any;
  layoutData: any;
  catalog: any;
  pages: any;
  products: any;
  isCatalog: boolean;
  isProduct: boolean;
}

const CatalogItem = ({pageData, layoutData, pages, catalog, products, isCatalog, isProduct}: CatalogItemProps) => {
  const [popupData, setPopupData] = useState({})
  const [popup, setPopup] = useState(false)
  const [type, setType] = useState('')

  if (!pageData) {
    pageData = {attributes: {blocks: [{__component: '404'}]}}
  }

  const breadcrumbs = isCatalog ? [...catalog] : [...pages];


  if (isProduct) {
    // @ts-ignore
    pageData.attributes['parent'] = {data: {id: pageData?.category?.data?.id}}
    breadcrumbs.push({
      id: pageData?.id,
      attributes: {
        parent: {
          data: {
            id: pageData?.attributes?.category?.data?.id
          }
        },
        slug: pageData?.attributes?.slug,
        title: pageData?.attributes?.title
      }
    })
  }

  const bannersFirst = ['blocks.slider', 'blocks.banner-block-img']
  const firstBlocks = pageData.attributes.blocks.filter(({__component}: any) => bannersFirst.includes(__component));
  const secondBlocks = pageData.attributes.blocks.filter(({__component}: any) => !bannersFirst.includes(__component));

  return (
    <Layout layoutData={layoutData} pageData={pageData} pages={pages} catalog={catalog} popupData={popupData}
            setPopupData={setPopupData} popup={popup} setPopup={setPopup} type={type} setType={setType}>

      <div className={'page'}>
        {firstBlocks.length ? <BlockManager blocks={firstBlocks} catalog={catalog} popupData={popupData} setPopupData={setPopupData} popup={popup} setPopup={setPopup} type={type} setType={setType}/> : <></>}
        {<Breadcrumbs items={breadcrumbs} pageData={pageData}/>}
        {isCatalog || isProduct
          ? <CategoryPages
            isProduct={isProduct}
            products={products}
            pages={pages}
            pageData={pageData}
            catalog={catalog}
            popupData={popupData}
            popup={popup}
            setPopupData={setPopupData}
            setPopup={setPopup}
            type={type}
            setType={setType}
          />
          : <></>}
        {secondBlocks.length ? <BlockManager blocks={secondBlocks} catalog={catalog} popupData={popupData} setPopupData={setPopupData} popup={popup} setPopup={setPopup} type={type} setType={setType}/> : <></>}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  try {
    if (!context.query?.slug) {
      context.query['slug'] = ['index'];
    }

    if(!Array.isArray(context.query?.slug)) {
      context.query.slug = [context.query?.slug]
    }

    let pageData: any = null;

    let [pageName] = context.query.slug.reverse();
    let isCatalog = false;
    let isProduct = false;
    let productId = '';

    if ((new RegExp(/^\d+-.+/)).test(pageName)) {
      productId = pageName.split('-').shift()
      pageData = await getDataById(productId, 'products');

      isProduct = true;
      isCatalog = true;
    } else {
      if (pageData !== 'index') {
        pageData = await getDataByFilter(pageName, 'categories');
      }

      if (!pageData) {
        pageData = await getDataByFilter(pageName, 'pages');
      } else {
        isCatalog = true;
      }
    }

    const {layoutData, catalog, pages} = await getCommonServerData();

    const products: any[] = isCatalog && !isProduct ? await findByCategory(catalog, pageName) : [];

    if (!pageData) {
      context.res.statusCode = 404;
    } else if(!isCatalog && !isProduct && pageName !== 'index') {
      const bc = collectBreadcrumbs(pages, pageData);
      if(!bc || !context.query['slug'].reverse().every((slug: string, index: number) => bc[index].attributes.slug === slug)) {
        context.res.statusCode = 404;
        pageData = null;
      }
    } else if(!isProduct && isCatalog) {
      const bc = collectBreadcrumbs(catalog, pageData);
      if(!bc || !context.query['slug'].reverse().every((slug: string, index: number) => bc[index].attributes.slug === slug)) {
        context.res.statusCode = 404;
        pageData = null;
      }
    } else if(isProduct) {
      const breadcrumbs = JSON.parse(JSON.stringify(catalog));

      //
      // @ts-ignore
      pageData.attributes['parent'] = {data: {id: pageData?.category?.data?.id || null}};
      breadcrumbs.push({
        id: pageData?.id,
        attributes: {
          parent: {
            data: {
              id: pageData?.attributes?.category?.data?.id
            }
          },
          slug: pageData?.attributes?.slug,
          title: pageData?.attributes?.title
        }
      })

      const bc = collectBreadcrumbs(breadcrumbs, pageData);
      // @ts-ignore
      bc[bc.length - 1].attributes.slug = productId + '-' + bc[bc.length - 1].attributes.slug;

      if(!bc || !context.query['slug'].reverse().every((slug: string, index: number) => bc[index].attributes?.slug === slug)) {
        context.res.statusCode = 404;
        pageData = null;
        isCatalog = false;
        isProduct = false;
      }
    }

    return {props: {pageData, layoutData, catalog, pages, products, isCatalog, isProduct}}
  } catch (error) {
    console.log('##################')
    console.log(error)
    console.log('##################')
    return {
      props: {pageData: null},
    };
  }
};

export default CatalogItem;
