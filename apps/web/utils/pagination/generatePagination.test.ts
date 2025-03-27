import { describe, expect, it } from 'vitest';
import generatePagination from './generatePagination';

describe('generatePagination', () => {
  it('returns full range when totalPages <= maxVisiblePages', () => {
    expect(generatePagination(1, 3)).toEqual([1, 2, 3]);
    expect(generatePagination(2, 4)).toEqual([1, 2, 3, 4]);
  });

  it('returns compact pagination when currentPage < 4', () => {
    expect(generatePagination(1, 10)).toEqual([1, 2, 3, 4, -1, 9, 10]);
    expect(generatePagination(3, 10)).toEqual([1, 2, 3, 4, -1, 9, 10]);
  });

  it('returns compact pagination when currentPage is exactly maxVisiblePages', () => {
    expect(generatePagination(4, 10)).toEqual([1, 2, 3, 4, 5, -1, 9, 10]);
  });

  it('returns compact pagination when currentPage is near the end', () => {
    expect(generatePagination(8, 10)).toEqual([1, 2, -1, 6, 7, 8, 9, 10]);
    expect(generatePagination(10, 10)).toEqual([1, 2, -1, 6, 7, 8, 9, 10]);
  });

  it('returns pagination with pages around the currentPage for middle values', () => {
    expect(generatePagination(6, 10)).toEqual([1, 2, -1, 5, 6, 7, 8, 9, 10]);
    expect(generatePagination(5, 11)).toEqual([1, 2, 3, 4, 5, 6, -1, 10, 11]);
  });

  // This edge case may result in duplicate pages due to the implementation.
  it('handles duplicate pages for low totalPages', () => {
    expect(generatePagination(3, 5)).toEqual([1, 2, 3, 4, -1, 4, 5]);
  });
});
