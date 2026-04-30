import { useState, useCallback } from 'react';
import { scanAPI } from '../utils/api';

export const useScan = () => {
  const [scans, setScans] = useState([]);
  const [currentScan, setCurrentScan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createScan = useCallback(async (githubUrl) => {
    setLoading(true);
    setError(null);
    try {
      const response = await scanAPI.createScan(githubUrl);
      setCurrentScan(response.data.scan);
      return response.data.scan;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create scan';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserScans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await scanAPI.getUserScans();
      setScans(response.data.scans);
      return response.data.scans;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch scans');
    } finally {
      setLoading(false);
    }
  }, []);

  const getScanStatus = useCallback(async (scanId) => {
    try {
      const response = await scanAPI.getScanStatus(scanId);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch scan status');
      return null;
    }
  }, []);

  const getScanById = useCallback(async (scanId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await scanAPI.getScanById(scanId);
      setCurrentScan(response.data.scan);
      return response.data.scan;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch scan');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteScan = useCallback(async (scanId) => {
    setLoading(true);
    setError(null);
    try {
      await scanAPI.deleteScan(scanId);
      setScans(scans.filter((s) => s._id !== scanId));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete scan');
      return false;
    } finally {
      setLoading(false);
    }
  }, [scans]);

  return {
    scans,
    currentScan,
    loading,
    error,
    createScan,
    getUserScans,
    getScanStatus,
    getScanById,
    deleteScan,
  };
};
