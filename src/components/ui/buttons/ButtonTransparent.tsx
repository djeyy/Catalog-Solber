import React from 'react';

type Props = {
  svg: JSX.Element | null;
  text: any;
  colorButton: string;
  [key: string]: any
}

export default function ButtonTransparent({svg, text, colorButton, ...props}: Props) {
  return (
    <button {...props} className={`buttonTransparent ${colorButton}`}>
      {svg && <div className={'buttonTransparent__svg'}>{svg}</div>}
      <div className={'buttonTransparent__text'}>{text}</div>
    </button>
  );
};