import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const useFetchHook = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authToken, isAuthenticated } = useAuth();
  // const token = localStorage.getItem('accessToken');

  const fetchData = async ({ API_URL, PAYLOAD = {}, METHOD_TYPE = 'GET' }) => {
    let token = authToken;
    console.log('token', authToken, isAuthenticated);
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL, {
        method: METHOD_TYPE,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },

        body: METHOD_TYPE !== 'GET' && METHOD_TYPE !== 'DELETE' ? JSON.stringify(PAYLOAD) : null,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result; // return for any further use
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};
