import React from 'react';
import Section from "@/components/sections/section/Section";
import {ThirdTitle} from "@/components/titles/ThirdTitle";
import {SecondTitle} from "@/components/titles/SecondTitle";
import Container from "@/components/Container";
import {TextH5} from "@/components/ui/typographuck/TextH5";
import {TextH4} from "@/components/ui/typographuck/TextH4";
import Image from "next/image";
import {SUBSERVER} from "@/common/sub-server.constant";

type Props = {
  theme: string;
  hTitle: {
    h2Title: string | null;
    h3Title: string | null;
  },
  groupSteps: []
}

export const Index = ({
                        theme,
                        hTitle,
                        groupSteps
                      }: Props) => {
  return (
    <Section colorBack={theme}>
      <Container>
        <div className={'howWorkSection'}>
          {hTitle?.h3Title && <ThirdTitle nameSection={hTitle.h3Title}/>}
          {hTitle?.h2Title && <SecondTitle title={hTitle.h2Title}/>}
          <div className={'howWorkSection__content'}>
            {groupSteps.map(({id, desc, title, img: {data}}: any) =>
                <div key={id} className={'step'}>
                  <div className={'step__arrow'}></div>
                  <div className={'step__icon'}>
                    <Image src={SUBSERVER + data.attributes.url} className={'listCatalog__image'} width={data.attributes.width} height={data.attributes.height} alt={data.attributes.alternativeText ? data.attributes.alternativeText : data.attributes.name || 'image'}/>
                  </div>
                  <div className={'step__texts'}>
                    <TextH4 fontWeight={'bold'}>{title}</TextH4>
                    <TextH5 fontWeight={''}>{desc}</TextH5>
                  </div>
                </div>)}
          </div>
        </div>
      </Container>
    </Section>
  );
};

Index.defaultProps = {};

export default Index;