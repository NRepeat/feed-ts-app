"use client"
import { login } from '@/app/services/authService';
import React, { FC, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  // const {store} = useContext(Context);
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const handleLogin = (email, password) => {
    dispatch(login(email, password));
  }
  return (
    <div>
      <input
        onChange={e => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder='Email'
      />
      <input
        onChange={e => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder='Пароль'
      />
      <button onClick={() => handleLogin(email, password)}>
        Логин
      </button>
      {/* <button onClick={() => registration(email, password)}>
        Регистрация
      </button> */}
    </div>
  );
};

export default (LoginForm);