import { LocalStorageKey } from "@/types/global";
import { isBrowser } from "@/utils/helperUtils";

export const useLocalStorage = <T extends LocalStorageKey>(key: T) => {
  if (!isBrowser) {
    return {
      item: null,
      setItem: () => {
        console.log();
      },
      clearStorage: () => {
        console.log();
      },
      removeItem: () => {
        console.log();
      },
    };
  }
  const getItem = () => localStorage.getItem(key);
  const setItem = (value: string) => localStorage.setItem(key, value);
  const clearStorage = () => localStorage.clear();
  const removeItem = () => localStorage.removeItem(key);
  return {
    item: getItem(),
    setItem,
    clearStorage,
    removeItem,
  };
};
