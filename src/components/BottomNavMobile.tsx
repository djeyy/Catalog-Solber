import React from 'react';
import {PriceSvg} from '@/components/ui/svg/PriceSvg';
import {TruckSvg} from '@/components/ui/svg/TruckSvg';
import {PesokSvg} from "@/components/ui/svg/PesokSvg";
import {ShebenSvg} from "@/components/ui/svg/ShebenSvg";
import {TextParagraph} from "@/components/ui/typographuck/TextParagraph";
import Link from "next/link";

export const navLink = {
  'Щебень': {
    link: '/sheben',
    svg: <ShebenSvg/>,
    active: false
  },
  'Песок': {
    link: '/pesok',
    svg: <PesokSvg/>,
    active: false
  },
  'Цены': {
    link: '/czeny',
    svg: <PriceSvg/>,
    active: false
  },
  'Доставка': {
    link: '/dostavka',
    svg: <TruckSvg/>,
    active: false
  }
}

export const BottomNavMobile = ({setIsActive}: { setIsActive: React.Dispatch<boolean>;}) => {
  const navClick = (value: string) => {
    for (const [name, content] of Object.entries(navLink)) {
      content.active = name === value
    }
  }

  return (
    <div className={'bottomNavMobile'}>
      {Object.entries(navLink).map(([name, {link, svg, active}]) =>
        <Link key={name} href={link} className={active ? 'navLink active' : 'navLink'} onClick={() => {
          navClick(name)
          setIsActive(false)
        }}>
          <div className={'navLink__svg'}>
            {svg}
          </div>
          <div className={'navLink__text'}>
            <TextParagraph size={'textSmall'} fontWeight={''}>{name}</TextParagraph>
          </div>
        </Link>
        )
      }
    </div>
  );
};