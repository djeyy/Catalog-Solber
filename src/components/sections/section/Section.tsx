import React from 'react';

type Props = {
  children: any;
  colorBack: string;
  [key: string]: any
}

const Section = ({colorBack, children, ...props}: Props) => {

  return (
    <section {...props} className={`section ${colorBack}`}>
      {children}
    </section>
  );
};

export default Section;