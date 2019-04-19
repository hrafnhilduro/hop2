import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { registerUser } from '../../api/index';
import { IError } from '../../api/types';
import { checkField } from '../../utils/utils';
import Button from '../../components/button/Button';
import './Register.scss';

export default function Register(props: any) {
  const { history } = props;
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<IError[]>([]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const data = {
      'username': user,
      'password': password,
      'email': email,
    }

    const result = await registerUser(data);

    if (result.status) history.push('/login'); // Register successful, redirect to '/login'
    if (!result.status) setError(result.data); // Display errors if status is not ok
  }

  const userFieldClass = classNames({
    'register--form__field': true,
    'register--form__field--invalid': checkField(error, 'username'),
  })

  const passwordFieldClass = classNames({
    'register--form__field': true,
    'register--form__field--invalid': checkField(error, 'password'),
  })

  const emailFieldClass = classNames({
    'register--form__field': true,
    'register--form__field--invalid': checkField(error, 'email'),
  })

  return (
    <div className='register'>
      <h2>Nýskráning</h2>
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
      <form className='register--form' onSubmit={handleSubmit}>
        <div className={userFieldClass}>
          <label htmlFor='user'>Notendanafn:</label>
          <input type='text' name='user' value={user} onChange={e => setUser(e.target.value)}/>
        </div>
        <div className={passwordFieldClass}>
          <label htmlFor='password'>Lykilorð:</label>
          <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <div className={emailFieldClass}>
          <label htmlFor='email'>Netfang:</label>
          <input type='text' name='email' value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
        <Button>Nýskrá</Button>
      </form>
      <Link className='register--link' to="/login">Innskráning</Link>
    </div>
  )
}
