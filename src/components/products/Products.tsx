import React, { useState, useEffect } from 'react';

import { IProduct, ICategory } from '../../api/types';
import { getProducts, getCategory } from '../../api/index';

import './Products.scss';
import ProductContainer from './ProductContainer';

interface Props {
  products: IProduct[],
  update?: any,
}

export default function Products(props: Props) {

  const { products, update } = props;
  return (
    <div className="products">
      {/* <h2 className="products--title">{'Meira úr ' + category.name}</h2> */}
      <div className='col-12 d-flex flex-wrap products--grid'>

        <>
          {products.map((item: any, i: number) => {
            return <ProductContainer key={i} product={item} update={update} />
          })}
        </>

      </div>
    </div>
  );
}
