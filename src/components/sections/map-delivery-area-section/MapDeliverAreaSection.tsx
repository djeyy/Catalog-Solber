import React, {useMemo, useState} from 'react';
import Container from '@/components/Container';
import {ThirdTitle} from '@/components/titles/ThirdTitle';
import {SecondTitle} from '@/components/titles/SecondTitle';
import Image from "next/image";

type Props = {
  hTitle: {
    h2Title: string | null;
    h3Title: string | null;
  },
  content: string;
  map: string;
}

export const Index = ({
                        hTitle,
                        content,
                        map
                      }: Props) => {
  const [imageMap, setImageMap] = useState<any>(<Image className={'mapDeliverAreaSection__img'} src={'/images/map.png'} width={960} height={696} alt={'map'}/>)

  useMemo(() => {
    map
      ? setImageMap(<div dangerouslySetInnerHTML={{__html: map}} />)
      : setImageMap(<Image className={'mapDeliverAreaSection__img'} src={'/images/map.png'} width={960} height={696} alt={'map'}/>)
  }, [map])

  return (
    <div className={'mapDeliverAreaSection'}>
      <Container>
        <div className={'mapDeliverAreaSection__content'}>
          {hTitle.h3Title && <ThirdTitle nameSection={hTitle.h3Title}/>}
          {hTitle.h2Title && <SecondTitle title={hTitle.h2Title}/>}
          <div className={'mapDeliverAreaSection__text'}>
            <div dangerouslySetInnerHTML={{__html: content}} />
          </div>
        </div>
      </Container>
      <div className={'mapDeliverAreaSection__image'}>
        {imageMap}
      </div>
    </div>
  );
};

Index.defaultProps = {};

export default Index;