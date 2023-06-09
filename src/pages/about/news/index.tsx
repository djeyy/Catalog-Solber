import React, {useState} from 'react';
import {TextH1} from "@/components/ui/typographuck/TextH1";
import Container from "@/components/Container";
import {ArticlesItem} from "@/components/ArticlesItem";
import ButtonTransparent from "@/components/ui/buttons/ButtonTransparent";
import {getCommonServerData, getDataByFilter, getFetch} from "@/common/get-common-server";
import {Layout} from "@/components/Layout";
import BlockManager from "@/shared/blockManager";
import {Breadcrumbs} from "@/components/BreadCrumbs";

function Index({pageData, layoutData, pages, catalog, news}: any) {
  const [more, setMore] = useState(12)
  const [openPopUpImages, setOpenPopUpImages] = useState({})

  const clickMore = () => {
    setMore(more + 12)
  }

  const bannersFirst = ['blocks.slider', 'blocks.banner-block-img']
  const firstBlocks = pageData.attributes.blocks.filter(({__component}: any) => bannersFirst.includes(__component));
  const secondBlocks = pageData.attributes.blocks.filter(({__component}: any) => !bannersFirst.includes(__component))

  return (
    <Layout layoutData={layoutData} pageData={pageData} pages={pages} catalog={catalog} popupData={openPopUpImages}
            setPopupData={setOpenPopUpImages} type={null} setType={null} popup={null} setPopup={null}>
      {pageData?.attributes?.blocks && <BlockManager blocks={firstBlocks} type={null} setType={null} popup={null} setPopup={null} />}
      {<Breadcrumbs items={pages} pageData={pageData}/>}
      <div className={'articlesPage'}>
        <Container>
          <div className={'articlesPage__title'}>
            <TextH1 fontWeight={''}>Статьи</TextH1>
            <div className={'articlesPage__content'}>
              <div className={'articlesList'}>
                {news?.length && news.slice(0, more).map(({attributes, id}: any) =>
                  <ArticlesItem key={id} attributes={attributes}/>)
                }
              </div>
              {news?.length > more && <div className={'articlesPage__button'}>
                  <div className={'articlesPage__btn'}>
                      <ButtonTransparent onClick={clickMore} svg={null} text={'Показать ещё'} colorButton={''}/>
                  </div>
              </div>}
            </div>
          </div>
        </Container>
      </div>
      {pageData?.attributes?.blocks && <BlockManager blocks={secondBlocks} type={null} setType={null} popup={null} setPopup={null} />}
    </Layout>
  );
}

export default Index;

export const getServerSideProps = async (context: any) => {
  const pageData = await getDataByFilter('news', 'pages');

  const {layoutData, catalog, pages} = await getCommonServerData();

  const responseNews = await getFetch(`/api/articles?populate=*`)

  const {data: news} = await responseNews.json()

  return {props: {pageData, layoutData, catalog, pages, news}}
}
