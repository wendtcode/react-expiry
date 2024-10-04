/* eslint-disable @typescript-eslint/no-unused-vars */

export const getDays = (days: number) => days * 60 * 60 * 24;

// Helper function to add seconds to a date
export const addSecondsToDate = (date: Date, seconds: number) =>
  new Date(date.getTime() + seconds * 1000);

// Storage with methods wrapped in try/catch
export const createSafeStorage = <
  TStorage extends {
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
  }
>(
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
