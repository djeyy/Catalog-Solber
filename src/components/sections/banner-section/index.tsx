import React from 'react';
import Container from "@/components/Container";
import {TextH1} from "@/components/ui/typographuck/TextH1";
import {Button} from "@/components/ui/buttons/Button";
import Image from "next/image";
import {CheckMark} from "@/components/ui/svg/CheckMark";
import {TextH5} from "@/components/ui/typographuck/TextH5";
import {SUBSERVER} from "@/common/sub-server.constant";
import {openBitrixPopup} from "@/common/open-close-popup.function";

type dataBannerSectionType = {
  img: {
    data: {
      attributes: {
        name: string;
        url: string;
        width: number;
        height: number;
        alternativeText: string;
      }
    }
  }
  titleText: string | undefined;
  link: string;
  singleText: string;
  priceLable: string;
  textButton: string;
  bullet: [];
  setPopupData: any;
}

const Index = (
  {
    titleText,
    singleText,
    priceLable,
    textButton,
    link,
    img: {data},
    bullet,
    setPopupData
  }: dataBannerSectionType) => {
  return (
    <div className={'bannerSection'}>
      {data && <Image src={SUBSERVER + data.attributes.url} className={'bannerSection__img'} width={data.attributes.width}
              height={data.attributes.height}
              alt={data.attributes.alternativeText ? data.attributes.alternativeText : data.attributes.name || 'image'}/>}
      <Container>
        <div className={'bannerSection__content content'}>
          <div className={'content__wrapper'}>
            <div>
              <div className={'content__textWrapper'}>
                <div className={'bannerSection__text'}>
                  {titleText && <TextH1 fontWeight={''}>{titleText}</TextH1>}
                </div>
                {singleText && <div className={'bannerSection__description'}>
                    <TextH5 fontWeight={''}>{singleText}</TextH5>
                </div>}
                {textButton && <div onClick={() => link ? openBitrixPopup(link, setPopupData) : console.log('notLink')} className={'bannerSection__btn'}>
                    <Button svg={null} disabled={false} sending={false} modifier={''} color={''} colorSvg={''}>{textButton}
                    </Button>
                </div>}
              </div>
              <div className={'content__price'}>
                {priceLable &&
                    <div className={'price-label'}>
                        <div className={'price-label__bigCircle'}></div>
                        <div className={'price-label__wrapper textH3'}>
                            <span>{priceLable}</span>
                        </div>
                    </div>}
              </div>
            </div>
            <div className={'excellenceInBanner'}>
              {bullet && bullet.map(({id, text}: {id: number, text: string}) =>
                <div key={id} className={'excellenceInBanner__item'}>
                  <div className={'excellenceInBanner__border'}>
                    <div className={'excellenceInBanner__circle'}>
                      <CheckMark/>
                    </div>
                  </div>
                  <div className={'excellenceInBanner__text'}>{text}</div>
                </div>)}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
Index.defaultProps = {};

export default Index
