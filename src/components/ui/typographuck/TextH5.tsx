import React from 'react';
import {Props} from '@/common/text.type';

export const TextH5 = ({children, fontWeight, ...props}: Props) => {
  return (
    <h5 {...props} className={`textH5 textH5_${fontWeight}`}>
      {children}
    </h5>
  );
};