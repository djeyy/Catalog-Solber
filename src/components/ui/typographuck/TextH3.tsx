import React from 'react';
import {Props} from '@/common/text.type';

export const TextH3 = ({children, fontWeight}: Props) => {
  return (
    <h3 className={`textH3 textH3_${fontWeight}`}>
      {children}
    </h3>
  );
};