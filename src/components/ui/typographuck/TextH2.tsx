import React from 'react';
import {Props} from '@/common/text.type';

export const TextH2 = ({children, fontWeight}: Props) => {
  return (
    <h2 className={`textH2 textH2_${fontWeight}`}>
      {children}
    </h2>
  );
};