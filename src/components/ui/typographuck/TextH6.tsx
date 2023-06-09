import React from 'react';
import {Props} from '@/common/text.type';

export const TextH6 = ({children, fontWeight}: Props) => {
  return (
    <h6 className={`textH6 textH6_${fontWeight}`}>
      {children}
    </h6>
  );
};