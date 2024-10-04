/* eslint-disable @typescript-eslint/no-unused-vars */

interface IStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
}

// Helper function to add seconds to a date
export const addSecondsToDate = (date: Date, seconds: number) =>
  new Date(date.getTime() + seconds * 1000);

// Storage with methods wrapped in try/catch
export const createSafeStorage = <TStorage extends IStorage>(
  storage: TStorage
) => ({
  getItem(key: string) {
    try {
      return storage.getItem(key);
    } catch (_error) {
      return null;
    }
  },
  setItem(key: string, value: string) {
    try {
      storage.setItem(key, value);
    } catch (error) {
      // meh
    }
  },
});
