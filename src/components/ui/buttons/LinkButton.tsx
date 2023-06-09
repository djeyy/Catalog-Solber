import React from 'react';
import Link from "next/link";

type Props = {
  href: string;
  name: string;
}

export const LinkButton = ({href, name}: Props) => {
  return (
    <Link href={href} className={'linkButton'}>{name}</Link>
  );
};