/**
 * ValidationService Tests
 */

import { describe, it, expect } from 'vitest';
import ValidationService from '../../src/js/services/ValidationService.js';

describe('ValidationService', () => {
  describe('validateName', () => {
    it('should validate correct names', () => {
      const result = ValidationService.validateName('John Doe');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should reject empty names', () => {
      const result = ValidationService.validateName('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Name is required');
    });

    it('should reject names shorter than 2 characters', () => {
      const result = ValidationService.validateName('A');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Name must be at least 2 characters');
    });

    it('should reject names longer than 100 characters', () => {
      const longName = 'A'.repeat(101);
      const result = ValidationService.validateName(longName);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Name must be less than 100 characters');
    });

    it('should reject names with invalid characters', () => {
      const result = ValidationService.validateName('John123');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('letters');
    });

    it('should accept names with hyphens and apostrophes', () => {
      const result = ValidationService.validateName("Mary-Jane O'Connor");
      expect(result.isValid).toBe(true);
    });
  });

  describe('validateAge', () => {
    it('should validate correct ages', () => {
      const result = ValidationService.validateAge(25);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should accept age as string', () => {
      const result = ValidationService.validateAge('25');
      expect(result.isValid).toBe(true);
    });

    it('should reject empty age', () => {
      const result = ValidationService.validateAge('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Age is required');
    });

    it('should reject non-numeric age', () => {
      const result = ValidationService.validateAge('abc');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Age must be a valid number');
    });

    it('should reject decimal ages', () => {
      const result = ValidationService.validateAge('25.5');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Age must be a whole number');
    });

    it('should reject age below 1', () => {
      const result = ValidationService.validateAge(0);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Age must be between 1 and 150');
    });

    it('should reject age above 150', () => {
      const result = ValidationService.validateAge(151);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Age must be between 1 and 150');
    });
  });

  describe('validateEmail', () => {
    it('should validate correct emails', () => {
      const emails = [
        'test@example.com',
        'john.doe@company.co.uk',
        'user+tag@domain.org',
      ];

      emails.forEach((email) => {
        const result = ValidationService.validateEmail(email);
        expect(result.isValid).toBe(true);
        expect(result.error).toBeNull();
      });
    });

    it('should reject empty email', () => {
      const result = ValidationService.validateEmail('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Email is required');
    });

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'notanemail',
        '@example.com',
        'user@',
        'user @example.com',
        'user@domain',
      ];

      invalidEmails.forEach((email) => {
        const result = ValidationService.validateEmail(email);
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Please enter a valid email address');
      });
    });

    it('should reject email longer than 254 characters', () => {
      const longEmail = 'a'.repeat(250) + '@example.com';
      const result = ValidationService.validateEmail(longEmail);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Email must be less than 254 characters');
    });
  });

  describe('validateStudent', () => {
    it('should validate complete student object', () => {
      const student = {
        name: 'John Doe',
        age: 25,
        email: 'john@example.com',
      };

      const result = ValidationService.validateStudent(student);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('should return all validation errors', () => {
      const student = {
        name: '',
        age: 'invalid',
        email: 'notanemail',
      };

      const result = ValidationService.validateStudent(student);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveProperty('name');
      expect(result.errors).toHaveProperty('age');
      expect(result.errors).toHaveProperty('email');
    });
  });

  describe('sanitize', () => {
    it('should trim whitespace', () => {
      const result = ValidationService.sanitize('  test  ');
      expect(result).toBe('test');
    });

    it('should remove angle brackets', () => {
      const result = ValidationService.sanitize('<script>alert()</script>');
      expect(result).toBe('scriptalert()/script');
    });

    it('should return empty string for non-string input', () => {
      expect(ValidationService.sanitize(null)).toBe('');
      expect(ValidationService.sanitize(undefined)).toBe('');
      expect(ValidationService.sanitize(123)).toBe('');
    });
  });
});
