import React from 'react';

type Props = {
  svg: any | null;
  children: string;
  disabled: boolean;
  sending: boolean;
  modifier: string;
  color: string;
  colorSvg: string;
  [key: string]: any;
}

export const Button = ({svg, children, disabled, sending, modifier, color, colorSvg, ...props}: Props) => {
  return (
    <button {...props} disabled={disabled}  className={`button ${color} ${modifier}`}>
      {sending
        ? <div className={'lds-ellipsis'}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        : <div className={'button__content'}>
          {svg && <div className={`button__svg ${colorSvg}`}>{svg}</div>}
          {children}
        </div>
      }
    </button>
  );
};