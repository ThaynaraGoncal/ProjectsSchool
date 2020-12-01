import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

const AuthContext = createContext();

export const ContextAuth = ({ children }) => {
  const [logado, setLogado] = useState(false);
  const [user, setUser] = useState({});
  const [infoLogin, setInfoLogin] = useState('');



  useEffect(() => {
    console.log('caiu no useEffect')
    AsyncStorage.getItem("Dadosuser").then((res) => {
      console.log('res do then', res)
      if (res) {
        setUser(JSON.parse(res));
        setLogado(true)
        //console.log('JSON.parse(res)', JSON.parse(res))
        return user;
      }
    }).catch((err) => {
      console.log(err)
    });
  }, []);

  // const logoff = async (navigate) => {
  //   console.log('veio para o logoff')
  //   await AsyncStorage.clear();
  //   setUser({});
  //   setLogado(false);
  //   navigate('ContaHome');
  // }

  const login = async (email, password) => {
    //console.log('Email ', email)
    //console.log('password ', password)

    if (email && password) {
      const userStorage = await AsyncStorage.getItem("Dadosuser");
      //console.log('userStorage', userStorage)

      if (userStorage) {
        console.log('existe userStorage', userStorage)
        setUser(JSON.parse(userStorage));
        setLogado(true);
        return user;
      }

      api.get(`/usuario?email=${email}&password=${password}`).then((res) => {
        console.log('data', res.data);

        if (res.data?.info) {
          setInfoLogin(res.data?.info);
          return res.data?.info;
        }

        if (res.data) {
          //console.log('setItem LocalStorage')
          AsyncStorage.setItem("Dadosuser", JSON.stringify(res.data.user));
          //AsyncStorage.setItem("name", JSON.stringify(res.data.user.apelido));
          setLogado(true);
          setUser(res.data);
        }
      }).catch((error) => {
        console.log(error);
      });
    }

  }

  return (
    <AuthContext.Provider value={{ user, setUser, logado, setLogado, login, infoLogin }}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthContext;