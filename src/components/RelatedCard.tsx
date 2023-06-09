import React from 'react';
import Image from 'next/image';
import {SUBSERVER} from '@/common/sub-server.constant';
import {formPrice} from '@/common/form-price';
import {LinkButton} from "@/components/ui/buttons/LinkButton";
import {ProductSpecs} from "@/components/ProductSpecs";

export const RelatedCard = ({product, link}: { product: any; link: string; }) => {

  return (
    <div className={'relatedProductSlide'}>
      <div className={'relatedProductSlide__image'}>
        {product?.attributes?.img?.data.length ? <Image
          className={'relatedProductSlide__img'}
          src={SUBSERVER + product?.attributes?.img?.data[0].attributes?.formats?.small?.url}
          width={product?.attributes?.img?.data[0].attributes?.formats?.small?.width}
          height={product?.attributes?.img?.data[0].attributes?.formats?.small?.height}
          alt={product?.attributes?.img?.data[0].attributes?.formats?.small?.alternativeText
            ? product?.attributes?.img?.data[0].attributes?.formats?.small?.alternativeText
            : product?.attributes?.img?.data[0].attributes?.formats?.small?.name || 'image'}/> : <></>}
      </div>
      <div className={'content'}>
        <div className={'content__price textH5 textH5_bold'}>{product?.attributes?.price?.price ? `от ${formPrice(Number(product?.attributes?.price?.price))}` : 'Цена по запросу'}{product?.attributes?.price?.price ? <span>{product?.attributes?.price?.priceMeasure}</span> : <></>}</div>
        <div className={'content__title textH6'}><span>{product?.attributes?.title}</span></div>
        <ProductSpecs title={'Фракция'} text={product?.attributes?.featureProduct?.fraction || '-'} size={'textMedium'}/>
        <ProductSpecs title={'Насыпная плотность'} text={product?.attributes?.featureProduct?.bulkDensity || '-'} size={'textMedium'}/>
        <ProductSpecs title={'ГОСТ'} text={product?.attributes?.featureProduct?.gost || '-'} size={'textMedium'}/>
        <div className={'content__button'}>
          <LinkButton href={link} name={'Подробнее'}/>
        </div>
      </div>
    </div>
  );
};