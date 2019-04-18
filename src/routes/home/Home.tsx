import React, { useState, useEffect, Fragment, EffectCallback } from 'react';
import Helmet from 'react-helmet';

import { IProduct, ICategory } from '../../api/types';
import Categories from '../../components/categories/Categories';
import Product from '../../components/product/Product';
import Products from '../../components/products/Products';
import Button from '../../components/button/Button';
import Spinner from '../../components/spinner/Spinner';

import './Home.scss';
import { getProducts, getProduct, getCategories, getCategory } from '../../api';

export default function Home(props: any) {
  const { initialProducts, initialProduct, initialCategories, initialCategory, location } = props;

  const [products, setProducts] = useState<IProduct[]>(initialProducts); // List of products
  const [categories, setCategories] = useState<ICategory[]>(initialCategories); // Current category
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // new products
      let resultProducts = await getProducts();

      setProducts(resultProducts.data.slice(0, 6));

      // categories
      const resultCategories = await getCategories()
      setCategories(resultCategories.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <Spinner />

  return (
    <Fragment>
      <Helmet title="Forsíða" />

      {(location.state && location.state.detail === 'order') ? (
        <p className="text-success">Pöntun var útbúin!</p>
      ) : null}

      <h2 className="mb-2">Nýjar vörur</h2>
      <Products
        products={products}
      />

      <h3 className="mt-5 mb-2">Vöruflokkarnir okkar</h3>
      <Categories categories={categories} />
    </Fragment>
  );
}
