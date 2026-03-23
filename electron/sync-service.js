const { net } = require('electron');
const syncDao = require('../database/dao/sync');

// In production, these should be loaded from env vars or store settings
const CLOUD_API_URL = process.env.CLOUD_API_URL || 'http://localhost:8000';
const SYNC_API_KEY = process.env.SYNC_API_KEY || 'pos_dev_secret_key';

let isSyncing = false;
let lastSyncTime = null;

async function triggerSync() {
  if (isSyncing) return { success: false, error: 'Sync already in progress' };

  try {
    isSyncing = true;
    
    const { payload, totalUnsynced } = syncDao.getUnsyncedData();

    if (totalUnsynced === 0) {
      isSyncing = false;
      return { success: true, message: 'Already up to date', pushed: 0 };
    }

    console.log(`[SyncService] Starting push for ${totalUnsynced} records...`);

    // Use Electron's native net module instead of Axios to avoid dependency bloat
    const response = await new Promise((resolve, reject) => {
      const request = net.request({
        method: 'POST',
        url: `${CLOUD_API_URL}/api/sync/push`,
      });

      request.setHeader('Content-Type', 'application/json');
      request.setHeader('x-api-key', SYNC_API_KEY);

      let responseData = '';

      request.on('response', (res) => {
        res.on('data', (chunk) => { responseData += chunk; });
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ statusCode: res.statusCode, data: JSON.parse(responseData) });
          } else {
            reject(new Error(`Server responded with ${res.statusCode}: ${responseData}`));
          }
        });
      });

      request.on('error', (error) => reject(error));
      
      request.write(JSON.stringify(payload));
      request.end();
    });

    if (response.data.success) {
      // Mark as synced locally
      syncDao.markAsSynced(payload);
      lastSyncTime = new Date().toISOString();
      console.log(`[SyncService] Successfully pushed and marked ${totalUnsynced} records.`);
      isSyncing = false;
      return { success: true, pushed: totalUnsynced };
    } else {
      throw new Error(response.data.error || 'Server rejected payload');
    }
  } catch (error) {
    console.error('[SyncService] Sync failed:', error);
    isSyncing = false;
    return { success: false, error: error.message };
  }
}

function getSyncStatus() {
  const localStatus = syncDao.getSyncStatus();
  return {
    pending: localStatus.pending,
    lastSync: lastSyncTime,
    isSyncing
  };
}

module.exports = {
  triggerSync,
  getSyncStatus
};
