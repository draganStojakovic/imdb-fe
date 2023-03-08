class StorageManager {
  public set(key: string, value: string | number | object) {
    const data = JSON.stringify(value);
    window.localStorage.setItem(key, data);
  }

  public get<T>(key: string): T | null {
    const data = window.localStorage.getItem(key);
    if (data) return JSON.parse(data) as T;
    return null;
  }

  public exists(key: string) {
    const data = window.localStorage.getItem(key);
    if (data) return true;
    return false;
  }

  public clear(key: string) {
    window.localStorage.removeItem(key);
  }
}

export const storageManager = new StorageManager();
