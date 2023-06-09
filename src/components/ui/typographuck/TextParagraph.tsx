import React from 'react';

type Props = {
  children: string;
  size: string;
  fontWeight: string;
}

export const TextParagraph = ({children, size, fontWeight}: Props) => {
  return (
    <p className={`${size} ${size}_${fontWeight}`}>
      {children}
    </p>
  );
};