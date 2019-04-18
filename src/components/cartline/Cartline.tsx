import React, { useState, useEffect } from 'react';
import { getProduct, updateCartline, deleteCartline } from '../../api';
import { IOrderline } from '../../api/types';

import './Cartline.scss';
import Input from '../input/NumberInput';

interface Props {
  lineInit: IOrderline
}

export default function Cartline(props: Props) {
  const { lineInit } = props;
  const [product, setProduct] = useState();
  const [error, setError] = useState();
  const [line, setLine] = useState(lineInit);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [])

  async function fetchProduct() {
    console.info(line.productid);
    const p = await getProduct(line.productid);
    setProduct(p.data);
  }

  async function submit(e: any) {
    e.preventDefault();
    const quantity = parseInt(e.target[0].value, 10);
    const response = await updateCartline(line.id, quantity);
    const { status } = response;
    if (status) {
      setLine(response.data);
      setError(false);
    }
    else setError(true);
  }

  async function del(e: any) {
    e.preventDefault();
    const response = await deleteCartline(line.id);
    if (response.ok) setDeleted(true);
    else setError(true);
  }

  if (deleted) return null;

  return (
    <div className="col-12 row cartline mb-3">
      {(!product) ? (
        <p>Hleður...</p>
      ) : (
        <>

          <img className="col-3" src={product.image} />

          <div className="col-6">
            <p className="cartline__name m-0">{product.name}</p>
            <p>Verð: {product.price} kr.</p>
            {(typeof error === 'undefined') ? (null) : (
              <>
                {error ? (
                  <p className="text-danger m-0">Villa!</p>
                ) : (
                  <p className="text-success m-0">Vörumagn uppfært!</p>
                )}
              </>
            )}
          </div>

          <div className="col-3 d-flex flex-column">
            <form className="col-12 row flex-row align-items-center haed" onSubmit={submit}>
              <p className="col-3 m-0">Fjöldi:</p>
              <div className="col-4">
                <Input defaultValue={line.quantity} />
              </div>
              <button className="col-5 btn btn-outline-primary cartline__update">
                <p>Uppfæra</p>
              </button>
            </form>
            <p className="col-12 m-0 font-weight-bold haed">Samtals: {product.price * line.quantity} kr.</p>
            <div className="col-12">
              <button className="col-6 m-auto btn btn-outline-danger" onClick={del}>
                Fjarlægja
              </button>
            </div>
          </div>

        </>
      )}
    </div>
  );
}
