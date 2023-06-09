import React from 'react';
import {ThirdTitle} from "@/components/titles/ThirdTitle";
import {SecondTitle} from "@/components/titles/SecondTitle";
import Container from "@/components/Container";
import Section from "@/components/sections/section/Section";

const Index = ({RichContent}: any) => {
  return (
    <Section colorBack={RichContent?.theme}>
      <div className={'richContentSection'}>
        <Container>
          {RichContent.map(({id, hTitle, content}: any) =>
            <div key={id} className={'richContentSection__wrapper'}>
              {hTitle.h3Title && <ThirdTitle nameSection={hTitle.h3Title}/>}
              {hTitle.h2Title && <SecondTitle title={hTitle.h2Title}/>}
              <div className={'richContentSection__box'} dangerouslySetInnerHTML={{__html: content}} />
            </div>
          )}
        </Container>
      </div>
    </Section>
  );
};

Index.defaultProps = {};

export default Index