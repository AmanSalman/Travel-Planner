import { isValidUrl } from "../isValidUrl";

describe('isValidUrl', () => {
  test('should return true for valid URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('http://example.com')).toBe(true);
    expect(isValidUrl('https://sub.example.com')).toBe(true);
    expect(isValidUrl('https://example.com/path?query=param')).toBe(true);
  });

  test('should return false for invalid URLs', () => {
    expect(isValidUrl('invalid-url')).toBe(false);
    expect(isValidUrl('ftp://example.com')).toBe(false);
    expect(isValidUrl('http://')).toBe(false);
    expect(isValidUrl('http://example')).toBe(false);
  });

  test('should return false for email addresses', () => {
    expect(isValidUrl('rapamansalman@gmail.com')).toBe(false);
    expect(isValidUrl('a.m.salman@students.ptuk.edu.ps')).toBe(false);
  });

  test('should return false for empty strings', () => {
    expect(isValidUrl('')).toBe(false);
  });
});
