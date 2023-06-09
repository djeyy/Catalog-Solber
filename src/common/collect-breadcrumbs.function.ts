import {BreadCrumbsType} from "@/common/bread-crumbs.type";

export const collectBreadcrumbs = (items: BreadCrumbsType[], pageData: BreadCrumbsType): BreadCrumbsType[] | null  => {
    if(!items) {
        return null;
    }

    let currentCrumbs: BreadCrumbsType | undefined = items.find(el => el.attributes.slug === pageData?.attributes?.slug);

    if(!currentCrumbs) {
        return null;
    }
    const bc: BreadCrumbsType[] = [];
    bc.push({...currentCrumbs, });

    let i= 10;
    let isHaveParent = !!currentCrumbs?.attributes.parent?.data?.id;

    while (isHaveParent && i > 0) {
        i--;
        currentCrumbs = items.find((el )=> el.id === currentCrumbs?.attributes.parent?.data.id );
        if(!currentCrumbs) {
            return null;
        }

        bc.unshift({...currentCrumbs});
        isHaveParent = !!currentCrumbs?.attributes.parent?.data?.id;
    }

    if(bc[bc.length -1]?.attributes?.slug === 'index') {
        return null;
    }

    return bc
}
