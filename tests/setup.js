/**
 * Test Setup File
 * Configures testing environment and global test utilities
 */

import { afterEach } from 'vitest';

// Clear localStorage after each test
afterEach(() => {
  localStorage.clear();
});

// Mock console methods to avoid cluttering test output
global.console = {
  ...console,
  error: vi.fn(),
  warn: vi.fn(),
  log: vi.fn(),
};
