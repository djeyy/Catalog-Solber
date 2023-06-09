import React from 'react';
import {Props} from '@/common/text.type';

export const TextH4 = ({children, fontWeight}: Props) => {
  return (
    <h4 className={`textH4 textH4_${fontWeight}`}>
      {children}
    </h4>
  );
};