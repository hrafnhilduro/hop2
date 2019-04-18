import React, { useState, useEffect, Fragment } from 'react';
import Helmet from 'react-helmet';

import { IProduct, ICategory, IAuth } from '../../api/types';
import Product from '../../components/product/Product';
import Products from '../../components/products/Products';
import Button from '../../components/button/Button';
import Spinner from '../../components/spinner/Spinner';

import './Product.scss';
import { getProductsByCategoryId, getProduct, getCategory, } from '../../api';

export default function Home(props: IAuth) {
  const { id } = props.match.params;
  const { user, isUser, isAdmin, authLoading } = props;

  const [product, setProduct] = useState<IProduct>({} as IProduct); // Currently showcased product
  const [products, setProducts] = useState<IProduct[]>(); // List of products
  const [loading, setLoading] = useState(true);
  const [partialLoading, setPartialLoading] = useState(false);

  useEffect(() => {
    fetchData(id);
  }, []);

  async function fetchData(id: number) {
    window.scrollTo(0, 0);
    const resultProduct = await getProduct(id);
    setProduct(resultProduct.data);
    const resultProducts = await getProductsByCategoryId(resultProduct.data.categoryid);
    setProducts(resultProducts.data);
    setLoading(false);
    setPartialLoading(false);
  }

  function update(id: number) {
    setPartialLoading(true);
    fetchData(id);
  }

  if (loading) return <Spinner />

  return (
    <Fragment>
      <Helmet title={product.name} />

      {(partialLoading) ? (
        <>
        <div className="productDetails productDetails__blur">
          <Product
            product={product || {} as IProduct}
            loading={loading}
            user={user}
            isUser={isUser}
          />
        </div>
        <Spinner />
        </>
      ) : (
       <div className="productDetails">
        <Product
          product={product || {} as IProduct}
          loading={loading}
          user={user}
          isUser={isUser}
        />
      </div>
      )}

      <h2 className="mb-5 mt-5 pt-5">Meira úr {product.category.name}</h2>
      <Products
        products={products || []}
        update={update}
      />

      <Button>asd</Button>
    </Fragment>
  );
}
