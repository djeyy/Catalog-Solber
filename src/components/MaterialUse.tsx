import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/buttons/Button";
import Image from "next/image";
import {TabButtons} from "@/components/TabButtons";
import {useMediaQuery} from "react-responsive";
import {SUBSERVER} from "@/common/sub-server.constant";
import Link from "next/link";
import {ThirdTitle} from "@/components/titles/ThirdTitle";
import {SecondTitle} from "@/components/titles/SecondTitle";

type Props = {
  h2Title: string | null;
  h3Title: string | null;
  materialItems: {}[]
}

type TabsProps = {
  active: boolean;
  textButton: string;
  linkButton: string;
  name: string;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  textGroup: [];
}

export const MaterialUse = ({h2Title, h3Title, materialItems}: Props) => {

  const isMobile = useMediaQuery({maxWidth: 887});
  const [stateTabs, setStateTabs] = useState<any>([])
  const [textGroup, setTextGroup] = useState<any>([])
  const [textButton, setTextButton] = useState<string>('')
  const [linkButton, setLinkButton] = useState<string>('')
  const [image, setImage] = useState<{
    name: string;
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
  }>({name: '', url: '', alternativeText: '', width: 5, height: 5})
  const [responsive, setResponsive] = useState<any>(<></>)

  useEffect(() => {
    const tabs = [];

    // @ts-ignore
    for (const {id, tabText, textButton, linkButton, textGroup, active, content, img: {data}} of materialItems) {
      tabs.push({
        id,
        tabText,
        textButton,
        linkButton,
        textGroup,
        active,
        content,
        name: data?.attributes?.name,
        url: data?.attributes?.url,
        alternativeText: data?.attributes?.alternativeText,
        width: data?.attributes?.width,
        height: data?.attributes?.height
      })
    }

    setStateTabs(tabs)
  }, [materialItems])

  useEffect(() => {
    stateTabs.forEach(({active, textButton, linkButton, textGroup, name, url, alternativeText, width, height}: TabsProps) => {

      if (active) {
        setTextButton(textButton)
        setLinkButton(linkButton)
        setImage({name, url, alternativeText, width, height})
        setTextGroup(textGroup)
      }
    })
  }, [stateTabs, setStateTabs, textGroup])

  useEffect(() => {
    setResponsive(!isMobile ? <div className={'imageBox'}>
      <div className={'linkButtons'}>
        {textGroup.map(({id, slug, text}: {id: number, slug: string, text: string}) => slug ?
          <Link key={id} className={'linkButtons__item'} href={`${slug}`}>
              {text}
            </Link>
            : <div className={'linkButtons__item'} key={id} >
              {text}
            </div>
        )}
      </div>
      <div className={'imageBox__image'}>
        <div className={'imageBox__firstCircle'}></div>
        <div className={'imageBox__secondCircle'}></div>
        {image && <Image src={SUBSERVER + image?.url} className={'imageBox__img'} width={image?.width} height={image?.height}
                alt={image?.alternativeText ? image.alternativeText : image.name || 'error'}/>}
      </div>
    </div> : <></>)
  }, [isMobile, image, setImage, textGroup])

  return (
    <div className={'materialUse'}>
      <div className={'materialUse__left'}>
        <div className={'materialUse__titles'}>
          <ThirdTitle nameSection={h3Title}/>
          <SecondTitle title={h2Title}/>
        </div>
        <div className={'tabs'}>
          <TabButtons stateTabs={stateTabs} setStateTabs={setStateTabs}/>
        </div>
        {stateTabs.map(({id, active, content}: any) => <div key={id} className={`materialUse__text ${active && 'active'}`}>
          <div dangerouslySetInnerHTML={{__html: content}} />
        </div>)}
        <div className={'materialUse__btn'}>
          <Link href={linkButton || '#'}>
            <Button
              svg={null}
              disabled={false}
              sending={false}
              modifier={''}
              color={''}
              colorSvg={''}
            >
              {textButton}
            </Button>
          </Link>
        </div>
      </div>
      <div className={'materialUse__right'}>
        {responsive}
      </div>
    </div>
  );
};
