import React, {useState} from 'react';
import Section from "@/components/sections/section/Section";
import {ThirdTitle} from "@/components/titles/ThirdTitle";
import {SecondTitle} from "@/components/titles/SecondTitle";
import Container from "@/components/Container";
import {FaqItem} from "@/components/FaqItem";
import ButtonTransparent from "@/components/ui/buttons/ButtonTransparent";
import {openBitrixPopup} from "@/common/open-close-popup.function";

type Props = {
  theme: string;
  hTitle: {
    h2Title: string | null;
    h3Title: string | null;
  };
  SectionFaq: []
  buttonLink: {
    link: string;
    popUp: boolean;
    text: string;
  }
  setPopupData: any;
}

export const Index = ({
                        theme,
                        hTitle,
                        SectionFaq,
                        buttonLink: {link, text, popUp},
                        setPopupData
                      }: Props) => {
  const [isButton, setIsButton] = useState(true);

  return (
    <Section colorBack={theme}>
      <Container>
        <div className={'faqSection'} itemScope itemType="https://schema.org/FAQPage">
          {hTitle?.h3Title && <ThirdTitle nameSection={hTitle?.h3Title}/>}
          {hTitle?.h2Title && <SecondTitle title={hTitle?.h2Title}/>}
          <div className={'faqSection__content'} >
            {SectionFaq && SectionFaq
              .map(({id, title, text}: {id: number, title: string, text: string}) =>
                <FaqItem
                  key={id}
                  title={title}
                  description={text}/>)}
          </div>
          {isButton && <div className={'faqSection__btn'}>
              <div className={'faqSection__button'}>
                  <ButtonTransparent onClick={() => link ? openBitrixPopup(link, setPopupData) : console.log('notLink')} svg={null} text={text} colorButton={''}/>
              </div>
          </div>}
        </div>
      </Container>
    </Section>
  );
};

Index.defaultProps = {};

export default Index;
