

import { useState, useEffect } from 'react';
import { fetchTasks } from '../api';

export function useTasks(query, status, page, pageSize) {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    let ignore = false; // இந்த request பழையதாகிவிட்டால் true ஆகும்

    setLoading(true);
    setError(null);

    fetchTasks({ query: debouncedQuery, status, page, pageSize })
      .then((data) => {
        if (ignore) return;
        setTasks(data.items);
        setTotal(data.total);
      })
      .catch((err) => {
        if (ignore) return;
        setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [debouncedQuery, status, page, pageSize]);

  return { tasks, total, loading, error };
}

