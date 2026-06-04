// ============================================================
// tests/calculator.test.js
// Unit tests for Olivia Nneka Anigbogu — SEN 482 Calculator
// Covers: evaluate(), isPrime(), formatResult()
// ============================================================

import { evaluate, isPrime, formatResult } from '../assets/js/calculator.js';

// ────────────────────────────────────────────────────────────
// evaluate() — arithmetic expression evaluator
// ────────────────────────────────────────────────────────────

describe('evaluate()', () => {

  // Basic operations
  describe('addition', () => {
    test('adds two positive integers',       () => expect(evaluate('2+3')).toBe(5));
    test('adds negative and positive',       () => expect(evaluate('-1+4')).toBe(3));
    test('adds decimals',                    () => expect(evaluate('0.1+0.2')).toBeCloseTo(0.3));
  });

  describe('subtraction', () => {
    test('subtracts two integers',           () => expect(evaluate('10-4')).toBe(6));
    test('result can be negative',           () => expect(evaluate('3-9')).toBe(-6));
    test('subtracts decimals',               () => expect(evaluate('5.5-2.2')).toBeCloseTo(3.3));
  });

  describe('multiplication', () => {
    test('multiplies two integers',          () => expect(evaluate('6*7')).toBe(42));
    test('multiplies by zero',               () => expect(evaluate('99*0')).toBe(0));
    test('multiplies negative numbers',      () => expect(evaluate('-3*-4')).toBe(12));
    test('multiplies decimals',              () => expect(evaluate('2.5*4')).toBe(10));
  });

  describe('division', () => {
    test('divides two integers evenly',      () => expect(evaluate('20/4')).toBe(5));
    test('returns decimal for non-even',     () => expect(evaluate('7/2')).toBe(3.5));
    test('divides by decimal',               () => expect(evaluate('9/0.5')).toBe(18));
    test('division by zero throws an error',  () => expect(() => evaluate('5/0')).toThrow('Invalid result'));
  });

  describe('operator precedence', () => {
    test('multiplication before addition',   () => expect(evaluate('2+3*4')).toBe(14));
    test('division before subtraction',      () => expect(evaluate('10-6/2')).toBe(7));
    test('chain of operations',              () => expect(evaluate('2*3+4*5')).toBe(26));
  });

  describe('error handling', () => {
    test('throws on empty string',           () => expect(() => evaluate('')).toThrow());
    test('throws on letters',               () => expect(() => evaluate('abc')).toThrow());
    test('throws on undefined input',        () => expect(() => evaluate(undefined)).toThrow());
    test('throws on incomplete expression',  () => expect(() => evaluate('5+')).toThrow());
  });

});

// ────────────────────────────────────────────────────────────
// isPrime() — prime number checker (Olivia's unique feature)
// ────────────────────────────────────────────────────────────

describe('isPrime()', () => {

  describe('known primes — should return true', () => {
    test('2  is prime (smallest prime)',      () => expect(isPrime(2)).toBe(true));
    test('3  is prime',                      () => expect(isPrime(3)).toBe(true));
    test('5  is prime',                      () => expect(isPrime(5)).toBe(true));
    test('7  is prime',                      () => expect(isPrime(7)).toBe(true));
    test('11 is prime',                      () => expect(isPrime(11)).toBe(true));
    test('13 is prime',                      () => expect(isPrime(13)).toBe(true));
    test('17 is prime',                      () => expect(isPrime(17)).toBe(true));
    test('97 is prime',                      () => expect(isPrime(97)).toBe(true));
  });

  describe('known non-primes — should return false', () => {
    test('0  is not prime',                  () => expect(isPrime(0)).toBe(false));
    test('1  is not prime',                  () => expect(isPrime(1)).toBe(false));
    test('4  is not prime (2×2)',            () => expect(isPrime(4)).toBe(false));
    test('6  is not prime (2×3)',            () => expect(isPrime(6)).toBe(false));
    test('9  is not prime (3×3)',            () => expect(isPrime(9)).toBe(false));
    test('25 is not prime (5×5)',            () => expect(isPrime(25)).toBe(false));
    test('100 is not prime',                 () => expect(isPrime(100)).toBe(false));
  });

  describe('edge cases — should return false', () => {
    test('negative number',                  () => expect(isPrime(-7)).toBe(false));
    test('decimal number',                   () => expect(isPrime(7.5)).toBe(false));
    test('zero',                             () => expect(isPrime(0)).toBe(false));
    test('NaN',                              () => expect(isPrime(NaN)).toBe(false));
  });

});

// ────────────────────────────────────────────────────────────
// formatResult() — display formatting
// ────────────────────────────────────────────────────────────

describe('formatResult()', () => {

  test('integer stays as integer string',    () => expect(formatResult(42)).toBe('42'));
  test('trims trailing zeros',               () => expect(formatResult(1.500)).toBe('1.5'));
  test('handles zero',                       () => expect(formatResult(0)).toBe('0'));
  test('handles negative number',            () => expect(formatResult(-5)).toBe('-5'));
  test('returns Error for Infinity',         () => expect(formatResult(Infinity)).toBe('Error'));
  test('returns Error for NaN',              () => expect(formatResult(NaN)).toBe('Error'));
  test('caps floating point noise',          () => {
    const result = formatResult(0.1 + 0.2);
    expect(result).toBe('0.3');
  });

});