import React, {useEffect, useState} from 'react';
import Container from "@/components/Container";
import {ArrowSvg} from "@/components/ui/svg/ArrowSvg";
import Link from "next/link";
import {SUBSERVER} from "@/common/sub-server.constant";
import Image from "next/image";
import Section from "@/components/sections/section/Section";
import {useMediaQuery} from "react-responsive";
import {ThirdTitle} from "@/components/titles/ThirdTitle";
import {SecondTitle} from "@/components/titles/SecondTitle";

type Props = {
  theme: string;
  isMap: boolean;
  Map: any;
  hTitle: {
    h2Title: string | null;
    h3Title: string | null;
  },
  content_main: string;
  content_footer: string;
  CategoryBlock: [];
}

const Index = ({
                        theme,
                        hTitle: {h2Title, h3Title},
                        content_main,
                        content_footer, CategoryBlock
                      }: Props) => {
  const isMobile = useMediaQuery({maxWidth: 887});
  const [padding, setPadding] = useState('120px')
  useEffect(() => {
    setPadding(isMobile ? '40px' : '120px')
  }, [isMobile])

  return (
    <Section style={{paddingBottom: padding}} colorBack={theme}>
      <Container>
        <div className={'catalogSection'}>
          <div className={'catalogSection__description'}>
            <div dangerouslySetInnerHTML={{__html: content_main}} />
          </div>
          <div className={'catalogSection__titles'}>
            <ThirdTitle nameSection={h3Title}/>
            <SecondTitle title={h2Title}/>
          </div>
          <div className={'listCatalog'}>
            {CategoryBlock.map(({id, link, text, img: {data}}: any) => <Link href={link ? link : '#'} key={id} className={'listCatalog__item'}>
              <div className={'listCatalog__img'}>
                {data && <Image src={SUBSERVER + data.attributes.url} className={'listCatalog__image'}
                        width={data.attributes.width} height={data.attributes.height}
                        alt={data.attributes.alternativeText ? data.attributes.alternativeText : data.attributes.name}/>}
              </div>
              <div className={'listCatalog__textBox'}>
                <div className={'listCatalog__text'}>{text}</div>
                <div className={'listCatalog__arrow'}>{<ArrowSvg/>}</div>
              </div>
            </Link>)}
          </div>
          <div className={'catalogSection__description list-bullet'}>
            <div dangerouslySetInnerHTML={{__html: content_footer}} />
          </div>
        </div>
      </Container>
    </Section>
  );
};

Index.defaultProps = {};

export default Index;
