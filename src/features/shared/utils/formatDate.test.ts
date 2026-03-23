import {formatDate} from './formatDate';

describe('formatDate', () => {
  it('formats a date string', () => {
    expect(formatDate('2026-03-23')).toBe('March 23, 2026');
  });

  it('formats a Date object', () => {
    expect(formatDate(new Date(2026, 2, 23))).toBe('March 23, 2026');
  });

  it('formats midnight correctly', () => {
    expect(formatDate('2026-01-01T00:00:00.000Z')).toBe('January 1, 2026');
  });

  it('formats year boundaries', () => {
    expect(formatDate('2025-12-31')).toBe('December 31, 2025');
    expect(formatDate('2026-01-01')).toBe('January 1, 2026');
  });

  it('formats different months', () => {
    expect(formatDate('2026-06-15')).toBe('June 15, 2026');
    expect(formatDate('2026-11-02')).toBe('November 2, 2026');
  });

  it('formats ISO string with time component', () => {
    expect(formatDate('2026-07-04T14:30:00Z')).toBe('July 4, 2026');
  });
});
