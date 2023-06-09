import React, {useEffect, useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import {SUBSERVER} from "@/common/sub-server.constant";

type ArticlesProps = {
  slug: string;
  url: string;
  altText: string;
  width: number;
  height: number;
  title: string;
  description: string;
  date: string;
}

//slug={attributes?.slug} url={attributes?.img?.data?.attributes?.url} width={attributes?.img?.data?.attributes?.width} height={attributes?.img?.data?.attributes?.height} title={attributes?.title} description={attributes?.ckeditor_content} date={attributes?.createDataArticles} altText={attributes?.img?.data?.attributes?.altText ? attributes?.img?.data?.attributes?.altText : attributes?.img?.data?.attributes?.name || 'image'}

export const ArticlesItem = ({attributes}: any) => {
  const [descriptionText, setDescriptionText] = useState<any>()

  useEffect(() => {
    setDescriptionText(<div dangerouslySetInnerHTML={{__html: attributes?.ckeditor_content}} />)
  }, [attributes?.ckeditor_content])

  return (
    <Link href={`/about/news/${attributes?.slug}`} className={'articlesItem'}>
      <div className={'articlesItem__img'}>
        {attributes.img.data
          ? <Image
            src={SUBSERVER + attributes?.img?.data?.attributes?.url}
            className={'articlesItem__image'}
            width={attributes?.img?.data?.attributes?.width}
            height={attributes?.img?.data?.attributes?.height}
            alt={attributes?.img?.data?.attributes?.altText ? attributes?.img?.data?.attributes?.altText : attributes?.img?.data?.attributes?.name || 'image'}
          />
          :<></>
        }
      </div>
      <div className={'description'}>
        <div className={'description__title'}>{attributes?.title}</div>
        <div className={'description__text'}>
          {descriptionText}
        </div>
        <div className={'description__date'}>{new Date(attributes?.createDataArticles).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
      </div>
    </Link>
  );
};
