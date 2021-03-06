import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { checkField } from '../../utils/utils';
import { IError } from '../../api/types';
import { loginUser } from '../../api/index';
import Button from '../../components/button/Button';

import './Login.scss';

export default function Login(props: any) {
  const {history, setUser, setIsUser, setIsAdmin, location } = props;

  // Fields
  const [user, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Errors
  const [error, setError] = useState<IError[]>([]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const data = {
      'username': user,
      'password': password,
    }

    const result = await loginUser(data);

    if (result.isOk) {
          setUser(result.data);
          setIsUser(true);
          setIsAdmin(result.data.admin);
          localStorage.setItem('jwt', result.data.token);
          history.push('/');
        }
        if (!result.isOk) setError(result.data); // Display errors if status is not ok
      }


  const userFieldClass = classNames({
    'login--form__field': true,
    'login--form__field--invalid': checkField(error, 'username'),
  })

  const passwordFieldClass = classNames({
    'login--form__field': true,
    'login--form__field--invalid': checkField(error, 'password'),
  })

  return (
    <div className='login'>

      {(location.state && location.state.detail === 'cart') ? (
        <p className="text-info">Skráðu þig inn til þess að nálgast körfuna þína:</p>
      ) : null}

      <h2>Innskráning</h2>
      { error.length > 0 &&
        <ul>
          {error.map((item, i) => {
            return (
              item.errors.map((err) => {
                return (
                  <li key={i}>{err}</li>
                )
              })
            )
          })}
        </ul>
      }
      <form className='login--form' onSubmit={handleSubmit}>
        <div className={userFieldClass}>
          <label htmlFor='user'>Notendanafn:</label>
          <input type='text' name='user' value={user} onChange={e => setUsername(e.target.value)}/>
        </div>
        <div className={passwordFieldClass}>
          <label htmlFor='password'>Lykilorð:</label>
          <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <Button>Skrá inn</Button>
      </form>
      <Link className='login--link' to="/register">Nýskráning</Link>
    </div>
  )
}
