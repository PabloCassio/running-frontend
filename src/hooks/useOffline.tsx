import { useState, useEffect, useCallback } from 'react';
import { offlineStorage, initOfflineStorage } from '../utils/offlineStorage';

export interface OfflineStatus {
  isOnline: boolean;
  isOfflineStorageReady: boolean;
  lastSync: Date | null;
  pendingSyncs: number;
  storageStats: Record<string, number>;
}

export function useOffline() {
  const [status, setStatus] = useState<OfflineStatus>({
    isOnline: navigator.onLine,
    isOfflineStorageReady: false,
    lastSync: null,
    pendingSyncs: 0,
    storageStats: {}
  });

  // Initialize offline storage
  useEffect(() => {
    const initialize = async () => {
      try {
        await initOfflineStorage();
        setStatus(prev => ({
          ...prev,
          isOfflineStorageReady: true
        }));
      } catch (error) {
        console.error('Failed to initialize offline storage:', error);
      }
    };

    initialize();
  }, []);

  // Update online status
  useEffect(() => {
    const handleOnline = () => {
      setStatus(prev => ({
        ...prev,
        isOnline: true
      }));
      
      // Trigger sync when coming back online
      offlineStorage.syncWithServer().catch(console.error);
    };

    const handleOffline = () => {
      setStatus(prev => ({
        ...prev,
        isOnline: false
      }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Update pending syncs and stats periodically
  useEffect(() => {
    const updateStats = async () => {
      if (!status.isOfflineStorageReady) return;

      try {
        const [syncItems, stats] = await Promise.all([
          offlineStorage.getSyncQueueItems(),
          offlineStorage.getStats()
        ]);

        setStatus(prev => ({
          ...prev,
          pendingSyncs: syncItems.length,
          storageStats: stats
        }));
      } catch (error) {
        console.error('Failed to update offline stats:', error);
      }
    };

    updateStats();
    const interval = setInterval(updateStats, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [status.isOfflineStorageReady]);

  const syncNow = useCallback(async () => {
    if (!status.isOnline) {
      throw new Error('Cannot sync while offline');
    }

    try {
      await offlineStorage.syncWithServer();
      setStatus(prev => ({
        ...prev,
        lastSync: new Date()
      }));
    } catch (error) {
      console.error('Sync failed:', error);
      throw error;
    }
  }, [status.isOnline]);

  const clearOfflineData = useCallback(async () => {
    try {
      await offlineStorage.clearAll();
      setStatus(prev => ({
        ...prev,
        pendingSyncs: 0,
        storageStats: {}
      }));
    } catch (error) {
      console.error('Failed to clear offline data:', error);
      throw error;
    }
  }, []);

  const saveForOffline = useCallback(async <T,>(
    store: string,
    operation: 'create' | 'update' | 'delete',
    data: T
  ) => {
    if (!status.isOfflineStorageReady) {
      throw new Error('Offline storage not ready');
    }

    try {
      const id = await offlineStorage.addToSyncQueue(
        store as any,
        operation as any,
        data
      );
      
      // Update pending syncs
      setStatus(prev => ({
        ...prev,
        pendingSyncs: prev.pendingSyncs + 1
      }));

      return id;
    } catch (error) {
      console.error('Failed to save for offline:', error);
      throw error;
    }
  }, [status.isOfflineStorageReady]);

  const getOfflineData = useCallback(async <T,>(
    store: string,
    id?: string,
    indexName?: string,
    range?: IDBKeyRange
  ): Promise<T | T[]> => {
    if (!status.isOfflineStorageReady) {
      throw new Error('Offline storage not ready');
    }

    try {
      if (id) {
        const data = await offlineStorage.get(store as any, id);
        return data as T;
      } else {
        const data = await offlineStorage.getAll(store as any, indexName, range);
        return data as T[];
      }
    } catch (error) {
      console.error('Failed to get offline data:', error);
      throw error;
    }
  }, [status.isOfflineStorageReady]);

  return {
    ...status,
    syncNow,
    clearOfflineData,
    saveForOffline,
    getOfflineData,
    offlineStorage
  };
}

// Hook for specific offline operations
export function useOfflineRaces() {
  const { getOfflineData, saveForOffline, isOfflineStorageReady } = useOffline();

  const getRaces = useCallback(async (filters?: {
    status?: string;
    upcoming?: boolean;
  }) => {
    if (!isOfflineStorageReady) return [];

    try {
      if (filters?.upcoming) {
        return await getOfflineData('races', undefined, 'by_date');
      }

      if (filters?.status) {
        return await getOfflineData('races', undefined, 'by_status', IDBKeyRange.only(filters.status));
      }

      return await getOfflineData('races');
    } catch (error) {
      console.error('Failed to get offline races:', error);
      return [];
    }
  }, [getOfflineData, isOfflineStorageReady]);

  const saveRace = useCallback(async (race: any, operation: 'create' | 'update' | 'delete' = 'create') => {
    return saveForOffline('races', operation, race);
  }, [saveForOffline]);

  return {
    getRaces,
    saveRace
  };
}

export function useOfflineParticipations() {
  const { getOfflineData, saveForOffline, isOfflineStorageReady } = useOffline();

  const getParticipations = useCallback(async (filters?: {
    userId?: string;
    raceId?: string;
    status?: string;
  }) => {
    if (!isOfflineStorageReady) return [];

    try {
      if (filters?.userId) {
        return await getOfflineData('participations', undefined, 'by_user_id', IDBKeyRange.only(filters.userId));
      }

      if (filters?.raceId) {
        return await getOfflineData('participations', undefined, 'by_race_id', IDBKeyRange.only(filters.raceId));
      }

      if (filters?.status) {
        return await getOfflineData('participations', undefined, 'by_status', IDBKeyRange.only(filters.status));
      }

      return await getOfflineData('participations');
    } catch (error) {
      console.error('Failed to get offline participations:', error);
      return [];
    }
  }, [getOfflineData, isOfflineStorageReady]);

  const saveParticipation = useCallback(async (participation: any, operation: 'create' | 'update' | 'delete' = 'create') => {
    return saveForOffline('participations', operation, participation);
  }, [saveForOffline]);

  return {
    getParticipations,
    saveParticipation
  };
}

// Component for displaying offline status
export function OfflineStatusIndicator() {
  const { isOnline, pendingSyncs, isOfflineStorageReady } = useOffline();

  if (isOnline && pendingSyncs === 0) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      zIndex: 1000,
      padding: '12px 20px',
      borderRadius: '12px',
      background: isOnline ? '#4ade80' : '#ef4444',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      fontSize: '14px',
      fontWeight: 500
    }}>
      {isOnline ? (
        <>
          <span>✓</span>
          <span>Online{pendingSyncs > 0 ? ` (${pendingSyncs} pendentes)` : ''}</span>
        </>
      ) : (
        <>
          <span>⚠️</span>
          <span>Offline</span>
        </>
      )}
    </div>
  );
}