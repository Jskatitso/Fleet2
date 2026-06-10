import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'rider' | 'customer'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const savedToken = await SecureStore.getItemAsync('fleet_token');
        const savedUser = await SecureStore.getItemAsync('fleet_user');
        const savedUserType = await SecureStore.getItemAsync('fleet_user_type');
        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
          setUserType(savedUserType);
        }
      } catch (error) {
        console.log('Session load error:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSession();
  }, []);

  const login = async (newToken, userData, type) => {
    try {
      await SecureStore.setItemAsync('fleet_token', newToken);
      await SecureStore.setItemAsync('fleet_user', JSON.stringify(userData));
      await SecureStore.setItemAsync('fleet_user_type', type);
      setToken(newToken);
      setUser(userData);
      setUserType(type);
    } catch (error) {
      console.log('Login save error:', error);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('fleet_token');
      await SecureStore.deleteItemAsync('fleet_user');
      await SecureStore.deleteItemAsync('fleet_user_type');
    } catch (error) {
      console.log('Logout error:', error);
    } finally {
      setToken(null);
      setUser(null);
      setUserType(null);
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, userType, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);