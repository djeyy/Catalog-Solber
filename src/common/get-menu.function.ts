
export const getMenuFunction = (catalog: any[], fillMenuChildrenItems: any) => {
  if (!catalog) {
    return fillMenuChildrenItems([], [])
  }
  const findRootCatalog = catalog.filter((el: any) => !el?.attributes?.parent?.data?.id);

  return fillMenuChildrenItems(catalog, findRootCatalog);
}