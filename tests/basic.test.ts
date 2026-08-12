import { describe, it, expect } from 'vitest';
import { evaluate } from 'mathjs';

describe('Formula Evaluation', () => {
  it('should calculate basic arithmetic', () => {
    const result = evaluate('2 + 3');
    expect(result).toBe(5);
  });

  it('should calculate square root', () => {
    const result = evaluate('sqrt(16)');
    expect(result).toBe(4);
  });

  it('should handle complex expressions', () => {
    const result = evaluate('(2 + 3) * (6 - 1)');
    expect(result).toBe(25);
  });

  it('should return error for invalid expression', () => {
    expect(() => {
      evaluate('invalid + ++');
    }).toThrowError();
  });
});
