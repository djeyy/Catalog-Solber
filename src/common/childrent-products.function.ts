import {getFetch} from "@/common/get-common-server";

export const childrenProducts = (catalog: any[], slug: string, categoriesId: number[] = []) => {
  let currentCategory: any = catalog.find((el: any) => el.attributes.slug === slug);
  if (!currentCategory) {
    return [];
  }
  categoriesId.push(currentCategory.id);
  const children = catalog.filter((el: any) => el?.attributes?.parent?.data?.id === currentCategory.id);
  if (children?.length) {
    for (const c of children) {
      childrenProducts(catalog, c.attributes.slug, categoriesId)
    }
  }

  return categoriesId
}

export const findByCategory = async (catalog: any[], slug: string): Promise<any[]> => {


  const products: any[] = []

  const categoriesId = childrenProducts(catalog, slug);

  const filters: string[] = [];

  categoriesId.forEach((id, index) => filters.push(`filters[category][id][$in][${index}]=${id}`))

  const responseProducts = await getFetch(`/api/products?${filters.join('&')}&populate[0]=featureProduct,img,price,seo,category,blocks,price.button`)


  const {data} = await responseProducts.json()
  products.push(...data)

  return products
}
