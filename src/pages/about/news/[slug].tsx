import React, {useState} from 'react';
import Container from "@/components/Container";
import {ThirdTitle} from "@/components/titles/ThirdTitle";
import {TextParagraph} from "@/components/ui/typographuck/TextParagraph";
import {WhatsAppSvg} from "@/components/ui/svg/WhatsAppSvg";
import {TelegramSvg} from "@/components/ui/svg/TelegramSvg";
import {OkSvg} from "@/components/ui/svg/OkSvg";
import {VkSvg} from "@/components/ui/svg/VkSvg";
import {getCommonServerData, getDataPopulate} from "@/common/get-common-server";
import BlockManager from "@/shared/blockManager";
import {Breadcrumbs} from "@/components/BreadCrumbs";
import {Layout} from "@/components/Layout";
import Image from "next/image";
import {SUBSERVER} from "@/common/sub-server.constant";
import Head from "next/head";

function ArticlesItemPage({layoutData, pages, catalog, pageData}: any) {
  const [openPopUpImages, setOpenPopUpImages] = useState({})

  const bannersFirst = ['blocks.slider', 'blocks.banner-block-img']
  const firstBlocks = pageData?.attributes?.blocks.filter(({__component}: any) => bannersFirst.includes(__component));
  const secondBlocks = pageData?.attributes?.blocks.filter(({__component}: any) => !bannersFirst.includes(__component))

  const breadCrumbs = [...pages];

  breadCrumbs.push({
    id: -2,
    attributes: {
      slug: pageData?.attributes?.slug,
      title: pageData?.attributes?.title,
      parent: {
        data: {
          id: (pages.find((page: any) => page?.attributes?.slug === 'news')?.id) || -1
        }
      }
    }
  })

  return(
    <>
      <Layout layoutData={layoutData} pages={pages} pageData={pageData} catalog={catalog} popupData={openPopUpImages}
              setPopupData={setOpenPopUpImages} popup={null} setPopup={null} type={null} setType={null} >
        <Head>
          <meta property="og:type" content="article"/>
          <meta property="og:title" content={pageData?.attributes?.title}/>
          <meta property="og:description" content={pageData?.attributes?.seo?.metaDescription ? pageData?.attributes?.seo?.metaDescription : pageData?.attributes?.seo?.metaTitle}/>
          <meta property="og:image" content={SUBSERVER + pageData?.attributes?.img?.data?.attributes?.url}/>
          <meta property="og:url" content={`https://solber.ru/about/news/${pageData?.attributes?.slug}`}/>
          <meta property="article:published_time" content={pageData?.attributes?.publishedAt} />
        </Head>
        {pageData?.attributes?.blocks && <BlockManager blocks={firstBlocks} type={null} setType={null} popup={null} setPopup={null} />}
        {<Breadcrumbs items={breadCrumbs} pageData={pageData}/>}
        <div className={'articlesItemPage'}>
          <Container>
            <div className={'articlesItemPage__titles'}>
              {pageData?.attributes?.createDataArticles && <ThirdTitle nameSection={new Date(pageData?.attributes?.createDataArticles).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}/>}
              {pageData?.attributes?.title && <h1 className={'textH2 textH2_medium'} style={{color: '#333434'}}>{pageData?.attributes?.title}</h1>}
            </div>
            <div className={'content'}>
              <div className={'content__image'}>
                {pageData?.attributes?.img &&
                    <Image className={'content__img'} src={SUBSERVER + pageData?.attributes?.img?.data?.attributes?.url} width={pageData?.attributes?.img?.data?.attributes?.width} height={pageData?.attributes?.img?.data?.attributes?.height}
                           alt={pageData?.attributes?.img?.data?.attributes?.alternativeText ? pageData?.attributes?.img?.data?.attributes?.alternativeText : pageData?.attributes?.img?.data?.attributes?.name || 'image' }/>}
              </div>
              <div className={'content__description'}>
                <div dangerouslySetInnerHTML={{__html: pageData?.attributes?.ckeditor_content}} />
              </div>
            </div>
            <div className={'social'}>
              <div className={'social__title'}>
                <TextParagraph size={'textH5'} fontWeight={'medium'}>Поделиться в соцсетях:</TextParagraph>
              </div>
              <div className={'social__icons'}>
                <a href={'#'} className={'social__icon'}>
                  <WhatsAppSvg/>
                </a>
                <a href={'#'} className={'social__icon'}>
                  <TelegramSvg/>
                </a>
                <a href={'#'} className={'social__icon'}>
                  <OkSvg/>
                </a>
                <a href={'#'} className={'social__icon'}>
                  <VkSvg/>
                </a>
              </div>
            </div>
          </Container>
        </div>
        {pageData?.attributes?.blocks && <BlockManager blocks={secondBlocks} type={null} setType={null} popup={null} setPopup={null} />}
      </Layout>
    </>
  )
;
}

export default ArticlesItemPage;

export const getServerSideProps = async (context: any) => {
  const pageData = await getDataPopulate(`${context.query.slug}`, 'articles');

  const {layoutData, catalog, pages} = await getCommonServerData();

  return {props: {pageData, layoutData, catalog, pages}}
}
