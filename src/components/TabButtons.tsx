import React from 'react';

export const TabButtons = ({stateTabs, setStateTabs}: any) => {
  return (
    <div className={'tabButtons'}>
      {stateTabs.map(({id, all, tabText, active}: any) =>
        <div key={id}
             onClick={() => setStateTabs(stateTabs.map((tab: any) => ({...tab, active: tab.id === id})))}
             className={`tabButtons__item ${active && 'active'}`}>
          {tabText}
        </div>)}
    </div>
  );
};