import BannerSection from '../../components/sections/banner-section';
import descriptionSection from '../../components/sections/description-section';
import bulletContent from '../../components/sections/excellence-section/ExcellenceSection';
import photoSlider from '../../components/sections/gallery-section/GallerySection';
import groupLogo from '../../components/sections/partners-section/PartnersSection';
import lidForm from '../../components/sections/call-back-form-section/CallBackSection';
import catalogMaterial from '../../components/sections/catalog-section/CatalogSection';
import Use from '../../components/sections/material-use-section/MaterialUseSection';
import relatedArticles from '../../components/sections/articles-section/ArticlesSection';
import bannerSlider from '../../components/sections/banner-slider-section/BannerSliderSection';
import faq from '../../components/sections/faq-section/FaqSection';
import geography from '../../components/sections/map-delivery-area-section/MapDeliverAreaSection';
import steps from '../../components/sections/how-work-section/HowWorkSection';
import docSlider from '../../components/sections/doc-slider-section/DocSliderSection';
import usageAdvantages from '../../components/sections/usage-advantages-section/UsageAdvantagesSection';
import richContent from '../../components/sections/rich-content-section/RichContentSection';
import relatedProduct from '../../components/sections/related-product-section/RelatedProductSection';
import {Section404} from "@/components/sections/section-404/Section404";
import {TableProducts} from "@/components/sections/table-products/TableProducts";
import {InfoMessage} from "@/components/sections/info-message/InfoMessage";
import contactsCompany from '../../components/sections/contacts-section/ContactsSection';

export const blocksList: {
  [key: string]: any
} = {
  'blocks.slider': bannerSlider,
  'blocks.banner-block-img': BannerSection,
  'blocks.text': descriptionSection,
  'blocks.bullet-content-block': bulletContent,
  'blocks.photo-slider': photoSlider,
  'blocks.group-logo-block': groupLogo,
  'blocks.lid-form-block': lidForm,
  'blocks.catalog-material-block': catalogMaterial,
  'blocks.use-block': Use,
  'blocks.related-articles': relatedArticles,
  'blocks.faq-block': faq,
  'blocks.geography-block': geography,
  'blocks.steps-block': steps,
  'blocks.doc-slider': docSlider,
  'blocks.usage-advantages-block': usageAdvantages,
  'blocks.rich-content-blcok': richContent,
  'blocks.related-product': relatedProduct,
  'blocks.table-products': TableProducts,
  'blocks.info-message': InfoMessage,
  'blocks.contacts-company': contactsCompany,
  404: Section404
}

type Props = {
  blocks: any;
  setPopupData?: any;
  catalog?: any;
  popupData?: any;
  popup: any;
  setPopup: any;
  type: any;
  setType: any;
}

const BlockManager = ({blocks, setPopupData, catalog, popupData, popup, setPopup, type, setType}: Props) =>
  blocks.map(({__component, ...rest}: { __component: string }, index: number) => {
    if (!blocksList[__component]) {
      return null;
    }
    const Block = blocksList[__component];
    return <Block key={`index-${index}`} {...rest} catalog={catalog} popupData={popupData} setPopupData={setPopupData} popup={popup} setPopup={setPopup} type={type} setType={setType}/>
  });


BlockManager.defaultProps = {
  blocks: [],
};

export default BlockManager;
