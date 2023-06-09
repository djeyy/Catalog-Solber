import React from 'react';
import Section from "@/components/sections/section/Section";
import Container from "@/components/Container";
import {ThirdTitle} from "@/components/titles/ThirdTitle";
import {SecondTitle} from "@/components/titles/SecondTitle";
import Image from "next/image";
import {SUBSERVER} from "@/common/sub-server.constant";

type Props = {
  theme: string;
  hTitle: {
    h2Title: string;
    h3Title: string;
  };
  text: string;
  BulletIconText: {}[];
}

const Index = ({theme, hTitle, text, BulletIconText}: Props) => {

  return (
    <Section colorBack={theme}>
      <div className={'excellenceSection'}>
        <Container>
          <div className={'excellence'}>
            <div className={'excellence__left'}>
              {hTitle?.h3Title && <ThirdTitle nameSection={hTitle?.h3Title}/>}
              {hTitle?.h2Title && <SecondTitle title={hTitle?.h2Title}/>}
              <div className={'excellence__description'}>{text}</div>
            </div>
            <div className={'excellence__right'}>
              {BulletIconText.map(({id, text, icon: {data}}: any) => <div key={id} className={'excellence__item'}>
                <div className={'excellence__svg'}>
                  {data && <Image src={SUBSERVER + data.attributes.url} className={'excellence__img'}
                                  width={data.attributes.width} height={data.attributes.height}
                                  alt={data.attributes.alternativeText ? data.attributes.alternativeText : data.attributes.name || 'image'}/>}
                </div>
                <div className={'excellence__text'}>{text}</div>
              </div>)}
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
};

Index.defaultProps = {};

export default Index;
