import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [rider, setRider] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const loadSession = async () => {
      try {
        const savedToken = await SecureStore.getItemAsync('rider_token');
        const savedRider = await SecureStore.getItemAsync('rider_data');
        if (savedToken) {
          setToken(savedToken);
          setRider(JSON.parse(savedRider));
        }
      } catch (error) {
        console.log('Session load error:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSession();
  }, []);

  const login = async (newToken, riderData) => {
    await SecureStore.setItemAsync('rider_token', newToken);
    await SecureStore.setItemAsync('rider_data', JSON.stringify(riderData));
    setToken(newToken);
    setRider(riderData);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('rider_token');
    await SecureStore.deleteItemAsync('rider_data');
    setToken(null);
    setRider(null);
  };

  return (
    <AuthContext.Provider value={{ token, rider, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);