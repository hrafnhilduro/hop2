import React, { useState } from 'react';

import Spinner from '../../components/spinner/Spinner';

import './Logout.scss';

export default function Logout(props: any) {
  const {history, setUser, setIsUser, setIsAdmin } = props;
  const [loading, setLoading] = useState(true);

  async function logout() {
    // Reset values
    setUser(null);
    setIsUser(false);
    setIsAdmin(false);

    localStorage.removeItem('jwt'); // Remove jwt from locals
    history.push('/'); // Redirect
  }

  logout();

  return (
    <div className='logout'>
      {loading && <Spinner />}
    </div>
  )
}
