import React from 'react';

type Props = {
  title: string | null | undefined;
  text: string | null | undefined;
  size: string;
}

export const ProductSpecs = ({title, text, size}: Props) => {
  return (
    <div className={`productSpecs content__item ${size}`}>
      <div className={'productSpecs__name'}>{title}</div>
      <div className={'productSpecs__description'}>{text}</div>
    </div>
  );
};