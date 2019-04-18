import React, { useState, useEffect } from 'react';
import { getProductsByCategoryId, getProductCount } from '../../api';
import { IProduct } from '../../api/types';
import Products from '../../components/products/Products';

import './Category.scss';
import Spinner from '../../components/spinner/Spinner';
import Search from '../../components/search/Search';

export default function Category(props: any) {
  const { id } = props.match.params;

  const [products, setProducts] = useState<IProduct[]>([] as IProduct[]);
  const [currPage, setCurrPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [currCount, setCurrCount] = useState(0);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [partialLoading, setPartialLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchData(id);
  }, []);

  async function fetchData(id: number, query: string = '') {
    setLoading(true);
    const p = await getProductsByCategoryId(id, 0, query);
    const count = await getProductCount(id);
    console.info(count)
    setProducts(p.data);
    setTotalCount(count);
    setCurrCount(p.data.length);
    setLoading(false);
  }

  async function appendProducts(page: number) {
    setPartialLoading(true);

    const currProducts = products;
    let p = await getProductsByCategoryId(id, page, query);
    currProducts.push(...p.data);
    setProducts(currProducts);
    setCurrPage(currPage + 1);
    setCurrCount(currProducts.length);

    setPartialLoading(false);
  }

  async function search(q: string) {
    setError(false);
    try {
      setQuery(q);
      await fetchData(id, q);
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? <Spinner /> : null}
      <div className={loading ? 'category category__blur' : 'category'}>
        <h1 className="text-center">{products[0] ? products[0].name : null}</h1>
        <Search search={search} />

        {(error) ? (
          <h2 className="text-center">Engar niðurstöður</h2>
        ) : (
          <Products products={products} />
        )}

        {!loading ? (
        <div className="col-12 d-flex flex-column align-items-center justify-content-center">
          <p>Sýni {currCount} af {totalCount} vörum</p>
          {(currCount < totalCount) ? (
            <button className="btn btn-outline-primary" disabled={partialLoading} onClick={() => appendProducts(currPage + 1)}>
              Hlaða inn fleiri vörum
            </button>
          ) : null}
        </div>
        ) : null}

        {(partialLoading) ? <Spinner /> : null}

      </div>
    </>
  )
}
