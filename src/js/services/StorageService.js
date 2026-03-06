/**
 * StorageService
 * Handles all localStorage operations with error handling and data validation
 */

const STORAGE_KEYS = {
  STUDENTS: 'student_registry_data',
  LAST_MODIFIED: 'student_registry_last_modified',
};

class StorageService {
  /**
   * Save students to localStorage
   * @param {Array} students - Array of student objects
   * @returns {boolean} Success status
   */
  static save(students) {
    try {
      const data = JSON.stringify(students);
      localStorage.setItem(STORAGE_KEYS.STUDENTS, data);
      localStorage.setItem(
        STORAGE_KEYS.LAST_MODIFIED,
        new Date().toISOString()
      );
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  }

  /**
   * Load students from localStorage
   * @returns {Array} Array of student objects or empty array
   */
  static load() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return [];
    }
  }

  /**
   * Clear all stored data
   * @returns {boolean} Success status
   */
  static clear() {
    try {
      localStorage.removeItem(STORAGE_KEYS.STUDENTS);
      localStorage.removeItem(STORAGE_KEYS.LAST_MODIFIED);
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  /**
   * Get last modification timestamp
   * @returns {string|null} ISO timestamp or null
   */
  static getLastModified() {
    return localStorage.getItem(STORAGE_KEYS.LAST_MODIFIED);
  }

  /**
   * Check if localStorage is available
   * @returns {boolean} Availability status
   */
  static isAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
}

export default StorageService;
