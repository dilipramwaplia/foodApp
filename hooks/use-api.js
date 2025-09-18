'use client';

/**
 * Custom hook for API state management - Single Responsibility Principle
 * @param {Function} apiCall - API function to call
 * @param {Array} dependencies - Dependencies array
 * @returns {Object} - Data and loading state
 */

import { useState, useEffect } from 'react';

export function useApi(apiCall, dependencies = []) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await apiCall();
        
        if (response.success) {
          setData(response.data);
        } else {
          setError(response.message || 'Failed to fetch data');
        }
      } catch (err) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, isLoading, error };
}