import React from 'react';
import {Button} from "@/components/ui/buttons/Button";
import {closePopUp} from "@/common/open-close-popup.function";

type Props = {
  sendError: any;
  setPopup: any;
  successText: any;
  errorText: any;
  successSubText: any;
  errorSubText: any;
}

export const SuccessPopup = ({sendError, setPopup, successText, errorText, successSubText, errorSubText}: Props) => {
  return (
    <div className={'success'}>
      <div className={`success__icon ${sendError ? 'error' : ''}`}></div>
      <div
        className={'success__title textH3 textH3_medium'}>{sendError ? errorText : successText}</div>
      <div
        className={'success__subTitle textH6'}>{sendError ? errorSubText : successSubText}</div>
      <div>
        <Button
          onClick={() => setPopup(closePopUp())}
          svg={null}
          disabled={false}
          sending={false}
          modifier={''}
          color={sendError ? 'red' : 'green'}
          colorSvg={''}>Хорошо</Button>
      </div>
    </div>
  );
};