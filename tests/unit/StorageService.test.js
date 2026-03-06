/**
 * StorageService Tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import StorageService from '../../src/js/services/StorageService.js';

describe('StorageService', () => {
  const mockStudents = [
    { id: 1, name: 'John Doe', age: 20, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 22, email: 'jane@example.com' },
  ];

  beforeEach(() => {
    localStorage.clear();
  });

  describe('save', () => {
    it('should save students to localStorage', () => {
      const result = StorageService.save(mockStudents);

      expect(result).toBe(true);
      const saved = localStorage.getItem('student_registry_data');
      expect(saved).toBeDefined();
      expect(JSON.parse(saved)).toEqual(mockStudents);
    });

    it('should save last modified timestamp', () => {
      StorageService.save(mockStudents);

      const timestamp = localStorage.getItem('student_registry_last_modified');
      expect(timestamp).toBeDefined();
      expect(new Date(timestamp).toString()).not.toBe('Invalid Date');
    });

    it('should return true on successful save', () => {
      const result = StorageService.save(mockStudents);
      expect(result).toBe(true);
    });
  });

  describe('load', () => {
    it('should load students from localStorage', () => {
      localStorage.setItem(
        'student_registry_data',
        JSON.stringify(mockStudents)
      );

      const loaded = StorageService.load();
      expect(loaded).toEqual(mockStudents);
    });

    it('should return empty array when no data exists', () => {
      const loaded = StorageService.load();
      expect(loaded).toEqual([]);
    });

    it('should return empty array on corrupted data', () => {
      localStorage.setItem('student_registry_data', 'invalid json');

      const loaded = StorageService.load();
      expect(loaded).toEqual([]);
    });
  });

  describe('clear', () => {
    it('should clear all stored data', () => {
      StorageService.save(mockStudents);

      const result = StorageService.clear();

      expect(result).toBe(true);
      expect(localStorage.getItem('student_registry_data')).toBeNull();
      expect(localStorage.getItem('student_registry_last_modified')).toBeNull();
    });
  });

  describe('getLastModified', () => {
    it('should return last modified timestamp', () => {
      StorageService.save(mockStudents);

      const timestamp = StorageService.getLastModified();
      expect(timestamp).toBeDefined();
      expect(typeof timestamp).toBe('string');
    });

    it('should return null when no timestamp exists', () => {
      const timestamp = StorageService.getLastModified();
      expect(timestamp).toBeNull();
    });
  });

  describe('isAvailable', () => {
    it('should return true when localStorage is available', () => {
      const available = StorageService.isAvailable();
      expect(available).toBe(true);
    });
  });
});
