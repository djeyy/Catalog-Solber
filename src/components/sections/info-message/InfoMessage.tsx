import React from 'react';
import ButtonTransparent from "@/components/ui/buttons/ButtonTransparent";
import {Button} from "@/components/ui/buttons/Button";
import Container from "@/components/Container";
import Image from "next/image";
import {SUBSERVER} from "@/common/sub-server.constant";
import {PhoneSvg} from "@/components/ui/svg/PhoneSvg";

type Props = {
  buttonDown: any;
  buttonForm: any;
  content: string
}

export const InfoMessage = ({buttonDown, buttonForm, content}: Props) => {
  return (
    <div className={'infoMessage'}>
      <Container>
        <div className={'infoMessage__description'}>
          <div dangerouslySetInnerHTML={{__html: content}} />
        </div>
        <div className={'infoMessage__buttonsBox'}>
          <div className={'infoMessage__links'}>
            {buttonDown && buttonDown.map((item: any) =>
              <div key={item?.id} className={'infoMessage__link'}>
                <div className={'infoMessage__svg'}>
                  {item?.icon?.data?.length &&
                      <Image src={SUBSERVER + item.icon?.data[0].attributes?.url} className={'infoMessage__img'}
                         width={item.icon?.data[0].attributes.width} height={item.icon?.data[0].attributes.height}
                         alt={item.icon?.data[0].attributes?.alternativeText ? item.icon?.data[0].attributes.alternativeText : item.icon?.data[0].attributes.name || 'icon'}
                      />}
                </div>
                <a href={SUBSERVER + item?.file?.data?.attributes?.url} download className={'infoMessage__text textH6'}>
                  {item?.text}
                </a>
              </div>
            )}
          </div>
          <div className={'infoMessage__buttons'}>
            {buttonForm && buttonForm.map((item: any) =>
              <div key={item?.id} className={'infoMessage__button'}>
                {item?.orangeButton
                  ? <Button svg={null} disabled={false} sending={false} modifier={''} color={''} colorSvg={''}>
                    {item?.text}
                  </Button>
                  : <a href={`tel:${item?.text.replace(' ', '')}`}>
                    <ButtonTransparent svg={<PhoneSvg/>} text={item?.text} colorButton={''}/>
                  </a>
                }
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};