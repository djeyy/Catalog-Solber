import React from 'react';
import {TextH1} from "@/components/ui/typographuck/TextH1";
import Container from "@/components/Container";
import {TextH5} from "@/components/ui/typographuck/TextH5";
import DownloadLink from "@/components/ui/DownloadLink";

type Props = {
  buttonDownload: any;
  forCouriers: string;
  mainOffice: string
  parking: string;
  phones: string;
  requisites: string;
  workingHours: string;
}

const Index = ({ buttonDownload,
                 forCouriers,
                 mainOffice,
                 parking,
                 phones,
                 requisites,
                 workingHours}: Props) => {

  const ContactsData = [
    {
       items: [
         {
            title: 'Главный офис',
            content: mainOffice,
            file: null,
            fileText: null
          },
         {
        title: 'Время работы',
        content: workingHours,
        file: null,
        fileText: null
      },
         {
        title: 'Телефоны',
        content: phones,
        file: null,
        fileText: null
      }
      ]
    },
    {
       items: [
         {
            title: 'Реквизиты',
            content: requisites,
            file: buttonDownload,
            fileText: buttonDownload?.text
          }
      ]
    },
    {
      items: [
        {
          title: 'Курьерам',
          content: forCouriers,
          file: null,
          fileText: null
        },
        {
          title: 'Парковка',
          content: parking,
          file: null,
          fileText: null
        }
      ]
    },
  ]

  return (
    <div className={'contactsSection'}>
      <Container>
        <TextH1 fontWeight={''}>Контакты</TextH1>
        <div className={'content'}>
          {ContactsData.map((item: any, index:number) =>
            <div key={index} className={'content__box'}>
              {item?.items.map((el: any, index: number) =>
                <div key={index} className={'content__item'}>
                  <div className={'content__title'}>
                    <h2 className={`textH4 textH4_bold`}>{el?.title}</h2>
                  </div>
                  <div className={'content__subTitle'}>
                    <TextH5 fontWeight={''}><div dangerouslySetInnerHTML={{__html: el?.content}} /></TextH5>
                  </div>
                  {el.file &&
                      <div><DownloadLink file={el?.file} svg={el?.file} text={el?.fileText}/></div>
                  }
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

Index.defaultProps = {};

export default Index;