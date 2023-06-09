import React from 'react';
import {ButtonClose} from "@/components/ui/buttons/ButtonClose";
import {closePopUp} from "@/common/open-close-popup.function";

type Props = {
  setPopup: React.Dispatch<boolean>;
  popup: boolean;
  title: string;
  content: any  ;
}

export const Popup = ({setPopup, popup, title, content}: Props) => {

  return (
    <div className={`popup ${popup ? 'active' : ''}`}>
      <div onClick={() => setPopup(closePopUp())} className={'popup__background'} ></div>
      <div className={'popup__wrapper'}>
        <div className={'popup__titles'}>
          <div className={'popup__title textH4'}>{title}</div>
          <div onClick={() => setPopup(closePopUp())} className={'popup__btnClose'}><ButtonClose/></div>
        </div>
        <div className={'popup__content'}>{content}</div>
      </div>
    </div>
  );
};
