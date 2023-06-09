import React from 'react';
import {ThirdTitle} from '@/components/titles/ThirdTitle';
import {SecondTitle} from '@/components/titles/SecondTitle';
import Container from '@/components/Container'

type Props = {
  hTitle: {
    h2Title: string;
    h3Title: string;
  }
  content: any;
}

const Index = ({hTitle, content}: Props) => {

  return (
    <div className={'descriptionSection'}>
      <Container>
        {hTitle?.h3Title && <ThirdTitle nameSection={hTitle.h3Title}/>}
        {hTitle?.h2Title && <SecondTitle title={hTitle.h2Title}/>}
        <div dangerouslySetInnerHTML={{__html: content}} />
      </Container>
    </div>
  );
};

Index.defaultProps = {};

export default Index;
