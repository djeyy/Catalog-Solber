import {useEffect, useState} from "react";
import {getCommonServerData, getFetch} from "@/common/get-common-server";

const searchProducts = async (input: string) => {
  const response = await getFetch(`/api/products?filters[title][$containsi]=${input}`)
  const {data} = await response.json();
  return data;
}

const searchCache: {
  [searchInput: string]: {
    dateTime: number;
    results: any[];
  }
} = {}

const TestSearchPage = ({catalog}: any) => {

  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState();

  useEffect(() => {

    if (!searchInput) {
      return;
    }

    // @ts-ignore
    const foundCategories = catalog.filter((el: any) => el?.attributes?.title.toLowerCase().includes(searchInput?.toLowerCase()));

    const result = foundCategories.map((el: any) => ({id: el.id, title: el.attributes.title}));

    if (searchCache[searchInput]) {
      result.unshift(...searchCache[searchInput].results.map((el: any) => ({id: el.id, title: el.attributes.title})))
      setSearchResults(result);
      return;
    }

    searchProducts(searchInput).then((data: any[]) => {
      result.unshift(...data.map((el: any) => ({id: el.id, title: el.attributes.title})))
      searchCache[searchInput] = {
        dateTime: +(new Date()),
        results: data
      }
      setSearchResults(result);
    })

  }, [searchInput]);

  return (<div>
    <p><input type={'text'} onInput={({target: {value}}: any) => setSearchInput(value)}/></p>
    <div>
      {searchResults.map((el: any, index) =>
        <div key={index}>{el.id} =&gt; {el.title}</div>
      )}
    </div>
  </div>)
}

export const getServerSideProps = async (context: any) => {

  try {
    context.query['slug'] = ['index'];

    let pageData: any = null;

    let [pageName] = context.query.slug.reverse();
    let isCatalog = false;
    let isProduct = false;

    const {layoutData, catalog, pages} = await getCommonServerData();

    return {props: {pageData, layoutData, catalog, pages, products: [], isCatalog, isProduct}}
  } catch (error) {
    console.log('##################')
    console.log(error)
    console.log('##################')
    return {
      props: {pageData: null},
    };
  }
};

export default TestSearchPage;
