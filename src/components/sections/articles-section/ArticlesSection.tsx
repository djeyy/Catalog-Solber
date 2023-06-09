import React from 'react';
import Section from "@/components/sections/section/Section";
import ButtonTransparent from "@/components/ui/buttons/ButtonTransparent";
import Image from 'next/image';
import Container from "@/components/Container";
import {ThirdTitle} from "@/components/titles/ThirdTitle";
import {SecondTitle} from "@/components/titles/SecondTitle";
import {SUBSERVER} from "@/common/sub-server.constant";
import {useRouter} from "next/router";
import Link from "next/link";

type Props = {
  theme: string;
  hTitle: {
    h2Title: string | null;
    h3Title: string | null;
  },
  articles: {
    data: []
  }
  buttonLink: {
    link: string;
    text: string;
  }
}

const validationDate = (value: string) => {
  return new Date(value).toLocaleDateString()
}

export const Index = ({theme, hTitle, buttonLink: {link, text}, articles: {data}}: Props) => {
  const router = useRouter();

  return (
    <Section colorBack={theme}>
      <Container>
        {hTitle?.h3Title && <ThirdTitle nameSection={hTitle?.h3Title}/>}
        {hTitle?.h2Title && <SecondTitle title={hTitle?.h2Title}/>}
        <div className={'articlesSection'}>
          <div className={'articlesSection__wrapper'}>
            {data.map(({
                         id,
                         attributes: {
                           title,
                           ckeditor_content,
                           publishedAt,
                           slug,
                           img: {data}}}: any) =>
              <Link href={`/about/news/${slug}`} key={id} className={'articlesSection__item'}>
              <div className={'articlesSection__img'}>
                {data && <Image src={SUBSERVER + data.attributes.url} className={'articlesSection__image'}
                        width={data.attributes.width} height={data.attributes.height}
                        alt={data.attributes.alternativeText ? data.attributes.alternativeText : data.attributes.name || 'image'}/>
                }
              </div>
              <div className={'description'}>
                <div className={'description__title'}>{title}</div>
                <div className={'description__text'}>
                  {ckeditor_content && <div dangerouslySetInnerHTML={{__html: ckeditor_content}}/>}
                </div>
                <div className={'description__date'}>{validationDate(publishedAt)}</div>
              </div>
            </Link>
            )}
          </div>
          <div className={'articlesSection__btn'}>
            <div className={'articlesSection__button'}>
              <ButtonTransparent
                onClick={() => router.push(`/${link}`)}
                svg={null}
                text={text}
                colorButton={''}/>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

Index.defaultProps = {};

export default Index;