import React, {useEffect, useState} from 'react';
import {useMediaQuery} from "react-responsive";
import {ThirdTitle} from "@/components/titles/ThirdTitle";
import {SecondTitle} from "@/components/titles/SecondTitle";
import Container from "@/components/Container";
import Image from "next/image";
import {SUBSERVER} from "@/common/sub-server.constant";
import {Button} from "@/components/ui/buttons/Button";
import Section from "@/components/sections/section/Section";
import Link from "next/link";

type Props = {
  theme: string;
  hTitleMain: {h3Title: string; h2Title: string;}
  hTitleFooter: {h3Title: string; h2Title: string;}
  contentMain: string;
  contentFooter: string;
  buttonLinkMain: {link: string | null; popUp: boolean; text: string}
  GroupBulletIcon: {
    id: number;
    title: string;
    icon: {data: {attributes: {name: string; url: string; alternativeText: string | null; width: number; height: number;}}}
  }[];
  img: {data: {attributes: {name: string; url: string; alternativeText: string | null; width: number; height: number;}}}
}

const Index = ({
                 theme,
                 hTitleFooter,
                 hTitleMain,
                 contentMain,
                 contentFooter,
                 buttonLinkMain,
                 GroupBulletIcon,
                 img: {data}}: Props) => {
  const isMobile = useMediaQuery({maxWidth: 887});
  const [mobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    setMobile(isMobile)
  }, [isMobile])

  return (
    <Section colorBack={theme}>
      <div className={'usageAdvantagesSection'}>
        <Container>
          <div className={'usageAdvantagesSection__wrapper'}>
            <div className={'usageAdvantagesSection__left'}>
              <div className={'contentMain'}>
                <div className={'contentMain__titles'}>
                  {hTitleMain?.h3Title && <ThirdTitle nameSection={hTitleMain?.h3Title}/>}
                  {hTitleMain?.h2Title && <SecondTitle title={hTitleMain?.h2Title}/>}
                </div>
                <div className={'contentMain__content'}>
                  <div dangerouslySetInnerHTML={{__html: contentMain}} />
                </div>
                <Link href={buttonLinkMain.link ? `/about/news/${buttonLinkMain.link}` : `#slug`} className={'contentMain__button'}>
                  <Button svg={null} disabled={false} sending={false} modifier={''} color={''} colorSvg={''}>
                    {buttonLinkMain?.text}
                  </Button>
                </Link>
              </div>
              <div className={'contentFooter'}>
                <div className={'contentFooter__titles'}>
                  <ThirdTitle nameSection={hTitleFooter?.h3Title}/>
                  <SecondTitle title={hTitleFooter?.h2Title}/>
                </div>
                <div className={'contentFooter__content'}>
                  <div dangerouslySetInnerHTML={{__html: contentFooter}} />
                </div>
              </div>
            </div>
            {!mobile &&
                <div className={'usageAdvantagesSection__right'}>
                  <div className={'bannerTabs'}>
                    <div className={'circles'}>
                      {GroupBulletIcon.map(({id, title, icon: {data}}) =>
                        <div key={id} className={'groupBulletIcon'}>
                          <div className={'groupBulletIcon__image'}>
                            { data && <Image src={SUBSERVER + data.attributes.url} className={'groupBulletIcon__img'}
                                    width={data.attributes.width} height={data.attributes.height}
                                    alt={data.attributes.alternativeText ? data.attributes.alternativeText : data.attributes.name || 'image'}/>}
                          </div>
                          <div className={'groupBulletIcon__title'}>{title}</div>
                        </div>
                      )}
                        <div className={'circles__first'}>
                            <div className={'circles__second'}>
                                <div className={'circles__banner'}>
                                  {data && <Image src={SUBSERVER + data.attributes.url} className={'circles__image'}
                                          width={data.attributes.width} height={data.attributes.height}
                                          alt={data.attributes.alternativeText ? data.attributes.alternativeText : data.attributes.name || 'image'}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>
            }
          </div>
        </Container>
      </div>
    </Section>
  );
};

Index.defaultProps = {};

export default Index;