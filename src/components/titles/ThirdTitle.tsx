import React from 'react';

type Props = {
  nameSection: string | null;
}

export const ThirdTitle = ({nameSection}:Props) => {
  return (
    <div className={'thirdTitle'}>
      <h2 className={`textH6`}>
        {nameSection}
      </h2>
    </div>
  );
};