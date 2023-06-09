import React from 'react';
import {Props} from '@/common/text.type';

export const TextH1 = ({children, fontWeight}: Props) => {
  return (
    <h1 className={`textH1 textH1_${fontWeight}`}>
      {children}
    </h1>
  );
};