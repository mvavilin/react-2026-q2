import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from '@utils/localStorage';

describe('localStorage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getStorageItem', () => {
    test('should return empty string when key does not exist', () => {
      const result = getStorageItem('nonexistent');

      expect(result).toBe('');
    });

    test('should return stored value when key exists', () => {
      localStorage.setItem('testKey', 'testValue');

      const result = getStorageItem('testKey');

      expect(result).toBe('testValue');
    });

    test('should return empty string when value is empty string', () => {
      localStorage.setItem('emptyKey', '');

      const result = getStorageItem('emptyKey');

      expect(result).toBe('');
    });

    test('should handle special characters in stored value', () => {
      const specialValue = '!@#$%^&*()_+{}[]|:;"<>,.?/~`';
      localStorage.setItem('specialKey', specialValue);

      const result = getStorageItem('specialKey');

      expect(result).toBe(specialValue);
    });
  });

  describe('setStorageItem', () => {
    test('should store value in localStorage', () => {
      setStorageItem('newKey', 'newValue');

      expect(localStorage.getItem('newKey')).toBe('newValue');
    });

    test('should overwrite existing value', () => {
      localStorage.setItem('existingKey', 'oldValue');

      setStorageItem('existingKey', 'newValue');

      expect(localStorage.getItem('existingKey')).toBe('newValue');
    });

    test('should store empty string value', () => {
      setStorageItem('emptyKey', '');

      expect(localStorage.getItem('emptyKey')).toBe('');
    });
  });

  describe('removeStorageItem', () => {
    test('should remove item from localStorage', () => {
      localStorage.setItem('removableKey', 'someValue');

      expect(localStorage.getItem('removableKey')).toBe('someValue');

      removeStorageItem('removableKey');

      expect(localStorage.getItem('removableKey')).toBeNull();
    });

    test('should not throw when removing non-existent key', () => {
      expect(() => {
        removeStorageItem('nonexistent');
      }).not.toThrow();
    });
  });
});
