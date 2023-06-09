export const recursiveCatalogLinks = (currentCategory: any, catalog: any[]): string => {
  if(!currentCategory?.attributes?.parent?.data?.id) {
    return currentCategory.attributes.slug;
  }
  const parentCategory = catalog.find(({id}: any) => id === currentCategory?.attributes?.parent?.data?.id);
  return !parentCategory ? currentCategory.attributes.slug : recursiveCatalogLinks(parentCategory, catalog) + '/' + currentCategory.attributes.slug;
}

export const makeProductLink = (product: any, catalog: any[]): string => {
  const categoryId = product?.attributes?.category?.data?.id;

  if (!categoryId) {
    return '/'
  }

  let category = catalog.find(({id}: any) => id === categoryId);

  let path = category.attributes.slug + '/' + product.id + '-' + product?.attributes?.slug

  let isEnd = false;
  while (!isEnd) {
    if (!category?.attributes?.parent?.data?.id) {
      isEnd = true;
      break;
    }
    category = catalog.find(({id}: any) => id === category?.attributes?.parent?.data?.id);

    if (!category) {
      isEnd = true;
      break;
    }

    path = category.attributes.slug + '/' + path;
  }

  return path;
}

