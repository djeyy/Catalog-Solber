import React from 'react';

type Props = {
  title: string;
  description: string;
}

export const FaqItem = ({title, description}: Props) => {

  return (
    <div
      onClick={(e)=> {e.currentTarget.classList.toggle('active')}}
      className={'faqItem'}
      itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
    >
      <div className={'faqItem__title'}>
        <h4 className={'textH4'} itemProp="name">{title}</h4>
        <div className={'faqItem__icon'}></div>
      </div>
      <div className={'faqItem__list'}>
        <div className={'faqItem__subTitle'} itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
          <div itemProp="text" dangerouslySetInnerHTML={{__html: description}} />
        </div>
      </div>
    </div>
  );
};
