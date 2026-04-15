import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';

const useProducts = (params = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProducts(params)
      .then(data => {
        setProducts(data.products);
        setTotal(data.total);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsKey]);

  return { products, loading, error, total };
};

export default useProducts;
