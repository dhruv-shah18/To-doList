import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import useMutateHook from './useMutateHook';
import useQueryHook from './useQueryHook';

export const useFetchHook = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authToken } = useAuth();
  const { mutate } = useMutateHook();

  // const token = localStorage.getItem('accessToken');

  const fetchData = async ({ API_URL, PAYLOAD = {}, METHOD_TYPE = 'GET' }) => {
    let token = authToken;
    try {
      setLoading(true);
      setError(null);
      let response;
      // if ( METHOD_TYPE == 'GET' ) {
      //   response = useQueryHook({
      //     url: API_URL,
      //     headers: {
      //       'Authorization': `Bearer ${token}`,
      //     },
      //   })
      // } else {
        response = await mutate({
          url: API_URL,
          method: METHOD_TYPE,
          data: PAYLOAD,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      // }
      // const response = await fetch(API_URL, {
      //   method: METHOD_TYPE,
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`,
      //   },
      //   body: METHOD_TYPE !== 'GET' && METHOD_TYPE !== 'DELETE' ? JSON.stringify(PAYLOAD) : null,
      // });
      setData(response);
      return response; // return for any further use
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};
