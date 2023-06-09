import React from 'react';

type Props = {
  title: string | null | undefined;
}

export const SecondTitle = ({title}: Props) => {
  return (
    <div className={'secondTitle'}>
      <h3 className={`textH2 `}>
        {title}
      </h3>
    </div>
  );
};