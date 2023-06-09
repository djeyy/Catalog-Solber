import React from 'react';
import Section from "@/components/sections/section/Section";
import {MaterialUse} from "@/components/MaterialUse";
import Container from "@/components/Container";

type Props = {
  theme: string;
  hTitle: {
    h2Title: string | null;
    h3Title: string | null;
  },
  tabContent: []
}

export const Index = ({theme, hTitle, tabContent}: Props) => {

  return (
    <Section
      colorBack={theme}
    >
      <div className={'materialUseSection'}>
        <Container>
          <MaterialUse h2Title={hTitle.h2Title} h3Title={hTitle.h3Title} materialItems={tabContent}/>
        </Container>
      </div>
    </Section>
  );
};

Index.defaultProps = {};

export default Index;