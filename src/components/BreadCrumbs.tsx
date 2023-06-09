import React from 'react';
import {BreadCrumbsType} from "@/common/bread-crumbs.type";
import Container from "@/components/Container";
import Link from "next/link";
import {collectBreadcrumbs} from "@/common/collect-breadcrumbs.function";

interface BreadcrumbsProps {
  items: BreadCrumbsType[];
  pageData: BreadCrumbsType
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items , pageData}) => {

  const bc = collectBreadcrumbs(items, pageData);

  if(!bc) {
    return null;
  }

  bc.unshift({id: -1, attributes: {slug: '', title: 'Главная'}})

  const paths: string[] = [];

  return (
    <nav className={'breadCrumbs'}>
      <Container>
        <ul className="breadCrumbs__list" itemScope itemType="https://schema.org/BreadcrumbList">
          {bc.map((item, index) => {
            paths.push(item?.attributes?.slug || '');
            return (
              <li key={item.id} className="breadCrumb" itemProp="itemListElement" itemScope
                  itemType="https://schema.org/ListItem"
              >
                {index === (bc.length - 1) ? (
                  <>
                    <span className={'breadCrumbs__crumb'} itemProp="name">{item?.attributes?.title}</span>
                    <meta itemProp="position" content="0"/>
                  </>
                ) : (
                  <>
                    <Link className={'breadCrumbs__link'} href={paths.join('/')} itemProp="item">
                      <span itemProp="name">{item?.attributes?.title}</span>
                    </Link>
                    <meta itemProp="position" content={String(item.id)}/>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
};
