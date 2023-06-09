export type BreadCrumbsType = {
  id: number;
  attributes: {
    slug: string
    title: string;
    parent?: {
      data: {
        id: number;
      }
    }
  }
}
