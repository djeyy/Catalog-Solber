import React, {useEffect, useState} from 'react';
import ButtonTransparent from "@/components/ui/buttons/ButtonTransparent";
import Image from "next/image";
import {useMediaQuery} from "react-responsive";
import Container from "@/components/Container";
import Link from "next/link";

export const Section404 = () => {
  const isMobile = useMediaQuery({maxWidth: 887});
  const [image, setImage] = useState<any>()

  useEffect(() => {
    setImage(isMobile
      ? <Image className={'section404__img'} src={'/images/405.png'} width={757} height={287} alt={'404'} />
      : <Image className={'section404__img'} src={'/images/404.png'} width={757} height={287} alt={'404'} />)
  }, [isMobile])

  return (
    <div className={'section404'}>
      <Container>
        <div className={'section404__content'}>
          <div className={'section404__image'}>
            {image}
          </div>
          <div className={'section404__text'}>Страница, которую вы пытаетесь посетить не существует</div>
          <Link href={'/'} className={'section404__btn'}>
            <ButtonTransparent svg={null} text={'Вернуться на главную'} colorButton={''}/>
          </Link>
        </div>
      </Container>
    </div>
  );
};
