import React, { useState, useEffect } from 'react';

import Spinner from '../../components/spinner/Spinner';
import { IOrders } from '../../api/types';
import { getOrders } from '../../api/index';

import './Orders.scss';

export default function Orders(props: any) {
  const { history } = props;

  const [orders, setOrders] = useState<IOrders[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const result = await getOrders();

      setOrders(result.data);
      setLoading(false);
    }
    fetch();
  }, []);

  async function handleOnClick(e: any) {
    e.preventDefault();
    const id = e.currentTarget.id
    history.push(`/orders/${id}`);
  }

  if (loading) return <Spinner />

  return (
    <div className='orders'>
      <h2>Þínar pantanir</h2>
      <table className='orders__table'>
        <thead>
        <tr>
          <th>Pöntun</th>
          <th>Nafn</th>
          <th>Heimilisfang</th>
          <th>Búin til</th>
        </tr>
        </thead>
        <tbody>
          {orders.map((item, i) => {
            return (
              <tr key={i} id={`${item.id}`} onClick={handleOnClick}>
                <td>{`Pöntun #${item.id}`}</td>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.created}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}
