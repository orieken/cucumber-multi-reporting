import { compareResponses } from './compare-responses';

describe('compareResponses', () => {
  // Test 1: Basic equality for identical objects
  it('should return true for identical flat objects', () => {
    const actual = { key1: 'value1', key2: 'value2' };
    const expected = { key1: 'value1', key2: 'value2' };
    expect(compareResponses(actual, expected)).toBe(true);
  });

  // Test 2: Check for missing keys
  it('should return false if actual object has missing keys', () => {
    const actual = { key1: 'value1' };
    const expected = { key1: 'value1', key2: 'value2' };
    expect(compareResponses(actual, expected)).toBe(false);
  });

  // Test 3: Check for extra keys
  it('should return false if actual object has extra keys', () => {
    const actual = { key1: 'value1', key2: 'value2', key3: 'value3' };
    const expected = { key1: 'value1', key2: 'value2' };
    expect(compareResponses(actual, expected)).toBe(false);
  });

  // Test 4: Nested object comparison
  it('should return true for objects with identical nested objects', () => {
    const actual = { key1: { nestedKey: 'nestedValue' } };
    const expected = { key1: { nestedKey: 'nestedValue' } };
    expect(compareResponses(actual, expected)).toBe(true);
  });

  // Test 5: Nested object mismatch
  it('should return false for objects with mismatched nested objects', () => {
    const actual = { key1: { nestedKey: 'value1' } };
    const expected = { key1: { nestedKey: 'value2' } };
    expect(compareResponses(actual, expected)).toBe(false);
  });

  // Test 6: Array of objects comparison
  it('should return true for objects with identical arrays of objects', () => {
    const actual = {
      key1: [
        { id: 1, name: 'Item1' },
        { id: 2, name: 'Item2' },
      ],
    };
    const expected = {
      key1: [
        { id: 1, name: 'Item1' },
        { id: 2, name: 'Item2' },
      ],
    };
    expect(compareResponses(actual, expected)).toBe(true);
  });

  // Test 7: Array of objects mismatch
  it('should return false for objects with mismatched arrays of objects', () => {
    const actual = {
      key1: [
        { id: 1, name: 'Item1' },
        { id: 2, name: 'Item2' },
      ],
    };
    const expected = {
      key1: [
        { id: 1, name: 'Item1' },
        { id: 3, name: 'Item3' },
      ],
    };
    expect(compareResponses(actual, expected)).toBe(false);
  });
});
