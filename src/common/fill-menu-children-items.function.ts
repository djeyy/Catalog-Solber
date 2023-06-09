export const fillMenuChildrenItems = (allArray: any[], fromArray: any[]): any[] =>
  fromArray.map((item: any) => {
    const children = allArray.filter((el: any) => el?.attributes?.parent?.data?.id === item.id)

    return {
      id: item.id,
      sorting: item.attributes.sorting,
      title: item.attributes.title,
      path: `/${item.attributes.slug}`,
      items: fillMenuChildrenItems(allArray, children)
    }
  }).sort((a, b) => {
    if (a.sorting > b.sorting) {
      return 1;
    }

    if (a.sorting < b.sorting) {
      return -1;
    }

    return 0;
  })
