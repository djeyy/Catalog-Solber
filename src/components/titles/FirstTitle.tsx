import React from 'react';
import {TextH1} from "@/components/ui/typographuck/TextH1";

type Props = {
  children: string;
  fontWeight: string;
}

export const FirstTitle = ({children, fontWeight}: Props) => {
  return (
    <TextH1 fontWeight={fontWeight} >{children}</TextH1>
  );
};