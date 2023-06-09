import {SUBSERVER} from "@/common/sub-server.constant";

const defaultOptions = {
  method: 'get',
  headers: {
    'content-type': 'Application/json'
  }
}

export const allBlockslist = '=contentSleder,contentSleder.ButtonSliderLink,contentSleder.img,' +
  'CategoryBlock,CategoryBlock.img,hTitle,tabContent,tabContent.img,tabContent.textGroup,' +
  'Images,Images,Images.img,imgLogo,imgLogo.img,articles,articles,articles.img,buttonLink,bullet,img,' +
  'BulletIconText,BulletIconText.icon,SectionFaq,Map,RichContent,RichContent.hTitle,map,content,' +
  'groupSteps,groupSteps.img,DocSliderContent,DocSliderContent.imgGroup,DocSliderContent.hTitle,' +
  'DocSliderContent.imgGroup.img,GroupBulletIcon,GroupBulletIcon.icon,buttonLinkMain,hTitleMain,hTitleFooter,' +
  'products,products.img,products.featureProduct,products.price,products.seo,products.categories,products.category,' +
  'products.categories.childrens,products.categories.parent,products.categories.parent.parent,' +
  'products.categories.parent.parent.parent,products.categories.parent.parent.parent.parent,' +
  'products.categories.parent.parent.parent.parent.parent,products.categories.parent.parent.parent.parent.parent.parent,' +
  'products.categories.parent.parent.parent.parent.parent.parent.parent,' +
  'products.categories.products,products.categories.parent.childrens,tableProductsRelated,' +
  'tableProductsRelated.hTitle,tableProductsRelated.products,buttonDown,buttonForm,' +
  'tableProductsRelated.products.price,tableProductsRelated.products.category,buttonDown.file,buttonDown.icon,buttonDownload,buttonDownload.file,' +
  'buttonDownload.icon'

export const getFetch = (url: string) => fetch(`${SUBSERVER}${url}`, defaultOptions)

export const getWithParent = async (moduleName: string) => {

  const response = await getFetch(`/api/${moduleName}/?populate=parent`)
  const {data} = await response.json();
  return data;
}

export const getDataById = async (id: string | number, moduleName: string) => {

  const response = await getFetch(`/api/${moduleName}/${id}?populate=deep`)
  const {data: pageData} = await response.json();
  return pageData;
}

export const getDataPopulate = async (slug: string, moduleName: string,) => {
  const response = await getFetch(`/api/${moduleName}/?filters[slug][$eq]=${slug}&populate=*`)
  const {data} = await response.json();

  //

  return data?.length ? data[0]: null;
}

export const getDataByFilter = async (slug: string, moduleName: string) => {
  const response = await getFetch(`/api/${moduleName}/?filters[slug][$eq]=${slug}&populate[blocks][populate]${allBlockslist}&populate[seo][populate]=*`)
  const {data} = await response.json();

  return data?.length ? data[0]: null;
}

const modules = {
  'products': getDataById,
  'categories': getDataByFilter,
  'pages': getDataByFilter,
}

export type ModulesName = keyof typeof modules

export const getCommonServerData = async () => {

  try {
    const [layoutResponse, catalog, pages] = await Promise.all([
      getFetch('/api/global?populate=deep'),
      getWithParent('categories'),
      getWithParent('pages'),
    ])
    const layoutData = await layoutResponse.json()

    return {layoutData, catalog, pages}

  } catch (error) {
    console.log('&'.repeat(10))
    console.log(error)
    console.log('&'.repeat(10))
    return {layoutData: null, catalog: null, pages: null}
  }
}
