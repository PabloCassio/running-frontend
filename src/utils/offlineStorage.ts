import { Race, User, RaceParticipation, RaceResult } from '../types';

const DB_NAME = 'maratona-offline-db';
const DB_VERSION = 1;

// Store names
export enum StoreName {
  RACES = 'races',
  USERS = 'users',
  PARTICIPATIONS = 'participations',
  RESULTS = 'results',
  SYNC_QUEUE = 'sync_queue',
  SETTINGS = 'settings'
}

// Sync operation types
export enum SyncOperation {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete'
}

// Sync queue item
export interface SyncQueueItem {
  id: string;
  store: StoreName;
  operation: SyncOperation;
  data: any;
  timestamp: number;
  retryCount: number;
  lastError?: string;
}

// Database schema
interface DBSchema {
  [StoreName.RACES]: Race;
  [StoreName.USERS]: User;
  [StoreName.PARTICIPATIONS]: RaceParticipation;
  [StoreName.RESULTS]: RaceResult;
  [StoreName.SYNC_QUEUE]: SyncQueueItem;
  [StoreName.SETTINGS]: {
    id: string;
    value: any;
  };
}

class OfflineStorage {
  private db: IDBDatabase | null = null;
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized && this.db) {
      return;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('Failed to open IndexedDB:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        this.initialized = true;
        console.log('IndexedDB initialized successfully');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create stores if they don't exist
        if (!db.objectStoreNames.contains(StoreName.RACES)) {
          const raceStore = db.createObjectStore(StoreName.RACES, { keyPath: 'id' });
          raceStore.createIndex('by_date', 'date', { unique: false });
          raceStore.createIndex('by_status', 'status', { unique: false });
        }

        if (!db.objectStoreNames.contains(StoreName.USERS)) {
          const userStore = db.createObjectStore(StoreName.USERS, { keyPath: 'id' });
          userStore.createIndex('by_email', 'email', { unique: true });
        }

        if (!db.objectStoreNames.contains(StoreName.PARTICIPATIONS)) {
          const participationStore = db.createObjectStore(StoreName.PARTICIPATIONS, { keyPath: 'id' });
          participationStore.createIndex('by_race_id', 'raceId', { unique: false });
          participationStore.createIndex('by_user_id', 'userId', { unique: false });
          participationStore.createIndex('by_status', 'status', { unique: false });
        }

        if (!db.objectStoreNames.contains(StoreName.RESULTS)) {
          const resultStore = db.createObjectStore(StoreName.RESULTS, { keyPath: 'id' });
          resultStore.createIndex('by_race_id', 'raceId', { unique: false });
          resultStore.createIndex('by_user_id', 'userId', { unique: false });
        }

        if (!db.objectStoreNames.contains(StoreName.SYNC_QUEUE)) {
          const syncStore = db.createObjectStore(StoreName.SYNC_QUEUE, { keyPath: 'id' });
          syncStore.createIndex('by_timestamp', 'timestamp', { unique: false });
          syncStore.createIndex('by_retry_count', 'retryCount', { unique: false });
        }

        if (!db.objectStoreNames.contains(StoreName.SETTINGS)) {
          const settingsStore = db.createObjectStore(StoreName.SETTINGS, { keyPath: 'id' });
        }
      };
    });
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.initialized || !this.db) {
      await this.init();
    }
  }

  // Generic CRUD operations
  async add<T extends keyof DBSchema>(
    storeName: T,
    item: DBSchema[T]
  ): Promise<string> {
    await this.ensureInitialized();
    
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(item);

      request.onsuccess = () => {
        resolve(request.result as string);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async get<T extends keyof DBSchema>(
    storeName: T,
    id: string
  ): Promise<DBSchema[T] | null> {
    await this.ensureInitialized();
    
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async getAll<T extends keyof DBSchema>(
    storeName: T,
    indexName?: string,
    range?: IDBKeyRange
  ): Promise<DBSchema[T][]> {
    await this.ensureInitialized();
    
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const target = indexName ? store.index(indexName) : store;
      const request = target.getAll(range);

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async update<T extends keyof DBSchema>(
    storeName: T,
    item: DBSchema[T]
  ): Promise<void> {
    await this.ensureInitialized();
    
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(item);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async delete<T extends keyof DBSchema>(
    storeName: T,
    id: string
  ): Promise<void> {
    await this.ensureInitialized();
    
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  // Sync queue operations
  async addToSyncQueue(
    store: StoreName,
    operation: SyncOperation,
    data: any
  ): Promise<string> {
    const syncItem: SyncQueueItem = {
      id: `sync_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      store,
      operation,
      data,
      timestamp: Date.now(),
      retryCount: 0
    };

    return this.add(StoreName.SYNC_QUEUE, syncItem);
  }

  async getSyncQueueItems(limit = 50): Promise<SyncQueueItem[]> {
    return this.getAll(
      StoreName.SYNC_QUEUE,
      'by_timestamp',
      IDBKeyRange.upperBound(Date.now())
    ).then(items => items.slice(0, limit));
  }

  async removeFromSyncQueue(id: string): Promise<void> {
    return this.delete(StoreName.SYNC_QUEUE, id);
  }

  async updateSyncQueueItem(item: SyncQueueItem): Promise<void> {
    return this.update(StoreName.SYNC_QUEUE, item);
  }

  // Race-specific operations
  async getRacesByStatus(status: string): Promise<Race[]> {
    return this.getAll(StoreName.RACES, 'by_status', IDBKeyRange.only(status));
  }

  async getUpcomingRaces(): Promise<Race[]> {
    const now = new Date().toISOString();
    return this.getAll(StoreName.RACES, 'by_date', IDBKeyRange.lowerBound(now))
      .then(races => races.filter(race => race.status === 'scheduled'));
  }

  async getUserParticipations(userId: string): Promise<RaceParticipation[]> {
    return this.getAll(
      StoreName.PARTICIPATIONS,
      'by_user_id',
      IDBKeyRange.only(userId)
    );
  }

  async getRaceParticipations(raceId: string): Promise<RaceParticipation[]> {
    return this.getAll(
      StoreName.PARTICIPATIONS,
      'by_race_id',
      IDBKeyRange.only(raceId)
    );
  }

  // Settings operations
  async getSetting<T>(id: string): Promise<T | null> {
    const setting = await this.get(StoreName.SETTINGS, id);
    return setting ? (setting as any).value : null;
  }

  async setSetting<T>(id: string, value: T): Promise<void> {
    await this.update(StoreName.SETTINGS, { id, value });
  }

  // Offline detection and sync
  async isOnline(): Promise<boolean> {
    return navigator.onLine;
  }

  async syncWithServer(): Promise<void> {
    if (!await this.isOnline()) {
      console.log('Offline - skipping sync');
      return;
    }

    const items = await this.getSyncQueueItems();
    
    for (const item of items) {
      try {
        // Here you would implement the actual API calls
        // For now, we'll just simulate successful sync
        console.log(`Syncing ${item.operation} on ${item.store}:`, item.data);
        
        // Remove from queue after successful sync
        await this.removeFromSyncQueue(item.id);
      } catch (error) {
        console.error('Sync failed:', error);
        item.retryCount += 1;
        item.lastError = (error as Error).message;
        await this.updateSyncQueueItem(item);
        
        if (item.retryCount > 3) {
          console.warn(`Giving up on sync item ${item.id} after 3 retries`);
          await this.removeFromSyncQueue(item.id);
        }
      }
    }
  }

  // Clear all data (for testing/logout)
  async clearAll(): Promise<void> {
    await this.ensureInitialized();
    
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction([
        StoreName.RACES,
        StoreName.USERS,
        StoreName.PARTICIPATIONS,
        StoreName.RESULTS,
        StoreName.SYNC_QUEUE,
        StoreName.SETTINGS
      ], 'readwrite');

      let completed = 0;
      const totalStores = 6;

      const checkCompletion = () => {
        completed++;
        if (completed === totalStores) {
          resolve();
        }
      };

      transaction.onerror = () => {
        reject(transaction.error);
      };

      // Clear each store
      [StoreName.RACES, StoreName.USERS, StoreName.PARTICIPATIONS, 
       StoreName.RESULTS, StoreName.SYNC_QUEUE, StoreName.SETTINGS]
        .forEach(storeName => {
          const store = transaction.objectStore(storeName);
          const request = store.clear();
          
          request.onsuccess = checkCompletion;
          request.onerror = () => {
            console.error(`Failed to clear ${storeName}:`, request.error);
            checkCompletion();
          };
        });
    });
  }

  // Database statistics
  async getStats(): Promise<Record<string, number>> {
    await this.ensureInitialized();
    
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const stats: Record<string, number> = {};
      const storeNames = [
        StoreName.RACES,
        StoreName.USERS,
        StoreName.PARTICIPATIONS,
        StoreName.RESULTS,
        StoreName.SYNC_QUEUE,
        StoreName.SETTINGS
      ];

      const transaction = this.db.transaction(storeNames, 'readonly');
      let completed = 0;

      storeNames.forEach(storeName => {
        const store = transaction.objectStore(storeName);
        const request = store.count();

        request.onsuccess = () => {
          stats[storeName] = request.result;
          completed++;
          
          if (completed === storeNames.length) {
            resolve(stats);
          }
        };

        request.onerror = () => {
          stats[storeName] = 0;
          completed++;
          
          if (completed === storeNames.length) {
            resolve(stats);
          }
        };
      });
    });
  }
}

// Export singleton instance
export const offlineStorage = new OfflineStorage();

// Helper function to initialize offline storage
export async function initOfflineStorage(): Promise<void> {
  try {
    await offlineStorage.init();
    console.log('Offline storage initialized');
    
    // Start periodic sync if online
    if (navigator.onLine) {
      setInterval(() => {
        offlineStorage.syncWithServer().catch(console.error);
      }, 30000); // Sync every 30 seconds
    }
    
    // Listen for online/offline events
    window.addEventListener('online', () => {
      console.log('Back online - starting sync');
      offlineStorage.syncWithServer().catch(console.error);
    });
    
    window.addEventListener('offline', () => {
      console.log('Offline - queuing operations for later sync');
    });
  } catch (error) {
    console.error('Failed to initialize offline storage:', error);
  }
}