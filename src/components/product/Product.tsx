import React from 'react';

import { IProduct, ICategory, IUser } from '../../api/types';

import './Product.scss';
import Cart from './AddToCart';

interface Props {
  product: IProduct,
  loading: Boolean,
  user: IUser,
  isUser: boolean,
}

export default function Product(props: Props) {
  const { product, loading, user, isUser } = props;

  return (
    <div className="col-12 product d-flex flex-column flex-md-row">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <img className="col-12 col-md-6 product__img" src={product.image} alt={product.name}/>
          <div className="col-12 col-md-6 product__info">
            <h2>{product.name}</h2>

            <div className="product__info--item col-12 p-0">
              <div className="col-6 p-0">
                <p>{'Flokkur: ' + product.category.name}</p>
                <p>{'Verð: ' + product.price + ' kr.'}</p>
              </div>
            </div>

            {isUser ? (
              <Cart productid={product.id} />
            ) : null}

            <div className="product__info--item">
              <p>{product.description}</p>
            </div>

          </div>
        </>
      )}
    </div>
  );
}
